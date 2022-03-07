//API for the remove of a group from a single user

//author: Josh Secrist

//03-04-22

//pulls in Database objects and functions from the DatabaseConnector file and firebase

import Database, { DBGroups } from '../../../Lib/DatabaseConnector';
import { ref, set } from 'firebase/database';

export async function get({ params }) {
	//DBGroups.Groups;

	let { user } = params;
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

	console.log('starting the removal');
	let groupID = 0;
	groupID = (await DB2.data)[groupName].id;
	let arrayOfUsernames = Object.keys(await DB.data);
	let arrayOfUserObjects: Array<any> = [];
	for (let i = 0; i < arrayOfUsernames.length; i++) {
		arrayOfUserObjects.push((await DB.data)[arrayOfUsernames[i]]);
	}
	console.log('made the array of user objects');
	console.log(user);
	console.log(arrayOfUserObjects);
	try {
		for (let i = 0; i < arrayOfUserObjects.length; i++) {
			if (arrayOfUsernames[i] == user) {
				let userData = arrayOfUserObjects[i];
				for (let j = 0; j < userData.group.length; j++) {
					if (userData.group[j] == groupID) {
						userData.group.splice(j, 1);
						set(ref(DB.database, 'users/' + arrayOfUsernames[i]), userData);
					}
				}
			}
		}
	} catch (error) {
		return {
			body: {
				message: 'user or group does not exist',
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
