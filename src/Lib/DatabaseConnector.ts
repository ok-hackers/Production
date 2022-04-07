//for the create groups pop-up

//author: Everyone?

//01-24-22

//imports a bunch of firebase commands adn objects types, don't worry about it
import firebase, { initializeApp, deleteApp } from 'firebase/app';
//import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { getDatabase, get, child, ref, goOffline, set, update } from 'firebase/database';
import crypto from 'crypto';
import { readFileSync, writeFileSync } from 'fs';
import {LabAnswer} from '../Lib/LabAnswer'


const firebaseConfig = {
	apiKey: 'AIzaSyAcQ8U9QmlK-Kdb94SPW1qdP8Kqu829GhE',
	authDomain: 'seniorprojectokhackers.firebaseapp.com',
	databaseURL: 'https://seniorprojectokhackers-default-rtdb.firebaseio.com/',
	projectId: 'seniorprojectokhackers',
	storageBucket: 'seniorprojectokhackers.appspot.com',
	messagingSenderId: '102482778593',
	appId: '1:102482778593:web:e77c7482eaeb592884daa0',
	measurementId: 'G-194TR6QGXY'
};

export const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);

export enum DBStatus {
	connecting = 'connecting',
	ready = 'ready',
	error = 'error'
}

export enum DBGroups {
	Admin = 'admin',
	Users = 'users',
	Groups = 'groups',
	Labs = 'labs'
}

export interface LabMetaData {
	Name: string;
	DueDate: Date;
	Description: string;
}

export interface UserMetaData {
	fname: string;
	lname: string;
	email: string;
	password: string;
	group: Array<Number>;
}

export default class Database {
	public status: string;
	public database = db;
	public data;
	public currentDataSet: DBGroups;

	constructor(DBGroup: DBGroups) {
		this.status = DBStatus.connecting;
		this.data = new Promise(async (resolve, reject) => {
			let SnapShot;
			this.currentDataSet = DBGroup;
			try {
				SnapShot = await get(child(ref(db), DBGroup));
			} catch (DatabaseSnapshotError) {
				reject(DatabaseSnapshotError);
			}

			if (SnapShot.exists()) {
				this.status = DBStatus.ready;
				resolve(SnapShot.val());
			} else {
				this.status = DBStatus.error;
				reject('no data avilable');
			}

			//saftey reject
			reject('snapshot has failed');
		});
	}

	updateDatabaseData(DBGroup: DBGroups) {
		this.status = DBStatus.connecting;
		this.data = new Promise(async (resolve, reject) => {
			let SnapShot;
			try {
				SnapShot = await get(child(ref(db), DBGroup));
			} catch (DatabaseSnapshotError) {
				reject(DatabaseSnapshotError);
			}

			if (SnapShot.exists()) {
				this.status = DBStatus.ready;
				resolve(SnapShot.val());
			} else {
				this.status = DBStatus.error;
				reject('no data avilable');
			}

			//saftey reject
			reject('snapshot has failed');
		});
	}

	//author: Josh Secrist
	//intakes a string of the group name
	//deletes the group in the database with that name
	//returns nothing
	async deleteGroup(groupName) {
		if (this.currentDataSet != DBGroups.Groups) {
			console.log('updating database to get labs');
			this.updateDatabaseData(DBGroups.Groups);
		}
		set(ref(this.database, 'groups/' + groupName), {});
	}

	//author: Josh Secrist
	//intakes a string of group name, array of users to add to the group, and the int of the ID
	//creates a group in the database
	//returns nothing
	async createGroup(groupName, users: Array<any>, idnum) {
		let id2 = parseInt(idnum, 10);
		set(ref(this.database, 'groups/' + groupName), {
			id: id2,
			name: groupName
		});
	}

	async deleteUser(userName) {
		set(ref(this.database, 'users/' + userName), {});
	}

	//author:Josh Secrist
	//intakes int of a group's ID and array of users
	//grabs list of userObjects possessing the group
	//returns list of user objects
	async usersOfAGroup(groupID, users: Array<any>) {
		let studentsInTheGroup: Array<any> = [];
		for (let i = 0; i < users.length; i++) {
			for (let j = 0; j < users[i].group.length; j++) {
				if (users[i].group[j] == groupID) {
					studentsInTheGroup.push(users[i]);
				}
			}
		}
		return studentsInTheGroup;
	}

	async updateLabMetaData(labMetaData: LabMetaData) {
		if (this.currentDataSet != DBGroups.Labs) {
			console.log('updating database to get labs');
			this.updateDatabaseData(DBGroups.Labs);
		}

		await this.data;

		let listOfLabs = Object.keys(this.data);

		let oldData = (await this.data)[labMetaData.Name];
		if (oldData == undefined) {
			oldData = {};
		}

		oldData.Name = labMetaData.Name;
		if (labMetaData.DueDate != undefined) {
			oldData.DueDate = labMetaData.DueDate;
		} else {
			oldData.DueDate = '2022-07-07';
		}
		if (labMetaData.Description != undefined) {
			oldData.Description = labMetaData.Description;
		} else {
			oldData.Description = ' ';
		}
		oldData.Published = 0;

		set(ref(this.database, '/labs/' + labMetaData.Name), oldData);
	}

	async updateLabDocumentationData(formData: FormData) {
		if (this.currentDataSet != DBGroups.Labs) {
			console.log('updating database to get labs');
			this.updateDatabaseData(DBGroups.Labs);
		}

		let labName = formData.get('Lab Name');
		let info = formData.get('LabDocumentation');

		let cleanedInfo = processImages(info);

		set(ref(this.database, 'labs/' + labName + '/DocumentData'), cleanedInfo);
	}

	async getLabDocumentationData(labName: string) {
		if (this.currentDataSet != DBGroups.Labs) {
			console.log('updating database to get labs');
			this.updateDatabaseData(DBGroups.Labs);
		}

		//get data for current lab
		let labData = (await this.data)[labName];

		//unprocess the image storage to send back to the browser
		let unprocessedData;
		if (labData != undefined) {
			if (labData.DocumentData != undefined) {
				unprocessedData = deprocessImages(labData);
			} else {
				unprocessedData = (await this.data)[labName];
			}
		} else {
			throw new Error('Lab not defined');
		}

		return unprocessedData;
	}

	async deleteLab(labName) {
		set(ref(this.database, 'labs/' + labName), {});
	}

	async createUser(userMetaData: UserMetaData) {
		//remove their password from the realtime half of the database
		userMetaData.password = null;
		let cleanEmail = userMetaData.email.replace(/[\.\#\$\[\]]/g, '');
		set(ref(this.database, 'users/' + cleanEmail.split('@')[0]), userMetaData);
	}

	async submitLabAnswer(lab: string, userName: string, correctlyAnswered: number, totalQuestions: number, labID: number, answersArray: Array<any>) {
		let date = new Date();

		let dataObj = {
			correct: correctlyAnswered,
			lab_id: labID,
			total: totalQuestions,
			dateCompleted: `${date.toTimeString()}`,
			answersArray
		}
		set(ref(this.database, `users/${userName}/grades/${lab}`), dataObj);
	}
}

//Take a lab documentation data object and replace the images with references to their filenames
function processImages(data: any): Object {
	let parsedData = JSON.parse(data);

	//for each box in this form
	for (let i = 0; i < parsedData.length; i++) {
		//for each data quill object array
		for (let j = 0; j < parsedData[i].data.ops.length; j++) {
			if (Object.keys(parsedData[i].data.ops[j].insert)[0] == 'image') {
				let hashName = crypto
					.createHash('sha256')
					.update(parsedData[i].data.ops[j].insert.image)
					.digest('base64');
				hashName = hashName.replace(/[\<\>\:\"\/\\\|\?\*]/, '-');

				writeFileSync(`ImageFiles/${hashName}.OKH`, parsedData[i].data.ops[j].insert.image);

				parsedData[i].data.ops[j].insert.image = hashName;
			}
		}
	}

	return parsedData;
}

//take lab documentation data from firebase and replace image names with images avilable on server
function deprocessImages(data: any): Object {
	//for each box in this form
	for (let i = 0; i < data.DocumentData.length; i++) {
		//for each data quill object array
		for (let j = 0; j < data.DocumentData[i].data.ops.length; j++) {
			if (Object.keys(data.DocumentData[i].data.ops[j].insert)[0] == 'image') {
				try {
					let imageBuffer = readFileSync(
						`ImageFiles/${data.DocumentData[i].data.ops[j].insert.image}.OKH`
					);
					let imageData = imageBuffer.toString();

					data.DocumentData[i].data.ops[j].insert.image = imageData;
				} catch (error) {
					data.DocumentData[i].data.ops[j].insert = 'Image file not found on server';
				}
			}
		}
	}

	return data;
}

function getScores() {
	
}
