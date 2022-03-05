//API for the remove of a group from user objects

//author: Josh Secrist

//02-22-22

//pulls in Database objects and functions from the DatabaseConnector file and firebase

import Database, { DBGroups } from '../../../Lib/DatabaseConnector';
import { ref, set } from 'firebase/database';
import { group } from 'console';

export async function get({ params }) {
	DBGroups.Groups;

	let { groupName } = params;

	let DB = new Database(DBGroups.Users);
	let DB2 = new Database(DBGroups.Groups);
	await DB.data;
	await DB2.data;

	if (DB.data == null) {
		return {
			body: {
				data: 'Cannot connect to firebase',
				status: 500
			}
		};
	}

	if (DB2.data == null) {
		return {
			body: {
				data: 'Cannot connect to firebase',
				status: 500
			}
		};
	}
	//console.log(groupName);
	let groupID = 0;
	groupID = (await DB2.data)[groupName].id;
	//console.log(groupID);
	let arrayOfUsernames = Object.keys(await DB.data);
	let arrayOfUserObjects: Array<any> = [];
	for (let i = 0; i < arrayOfUsernames.length; i++) {
		arrayOfUserObjects.push((await DB.data)[arrayOfUsernames[i]]);
	}
	try {
		for (let i = 0; i < arrayOfUserObjects.length; i++) {
			let userData = arrayOfUserObjects[i];
			//console.log(groupID);
			//let index = userData.group.indexOf(groupID);
			for (let j = 0; j < userData.group.length; j++) {
				//console.log(userData.group[j]);
				if (userData.group[j] == groupID) {
					userData.group.splice(j, 1);
					set(ref(DB.database, 'users/' + arrayOfUsernames[i]), userData);
				}
			}
		}
	} catch (error) {
		return {
			body: {
				message: 'group does not exist',
				status: 502
			}
		};
	}

	let returnObj = {
		body: {
			data: await DB.data,
			status: 200
		}
	};

	return returnObj;
}
