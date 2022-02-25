//for the create groups pop-up

//author: Everyone?

//01-24-22

//imports a bunch of firebase commands adn objects types, don't worry about it

import type { any } from 'cypress/types/bluebird';
import firebase, { initializeApp, deleteApp } from 'firebase/app';
//import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { getDatabase, get, child, ref, goOffline, set } from 'firebase/database';

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
	FName: string;
	LName: string;
	Email: string;
	Password: string;
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

	async updateLabMetaData(labMetaData: LabMetaData) {
		if (this.currentDataSet != DBGroups.Labs) {
			console.log('updating database to get labs');
			this.updateDatabaseData(DBGroups.Labs);
		}

		await this.data;

		let listOfLabs = Object.keys(this.data);

		console.log('create new lab');
		set(ref(this.database, '/labs/' + labMetaData.Name), labMetaData);
	}

	async deleteLab(labName) {
		set(ref(this.database, 'labs/' + labName), {});
	}

	async createUser(userMetaData: UserMetaData) {
		//remove their password from the realtime half of the database
		userMetaData.Password = null;
		let cleanEmail = userMetaData.Email.replace(/[\.\#\$\[\]]/g,'')
		set(ref(this.database, 'users/' + cleanEmail.split('@')[0]), userMetaData)
	}
}
