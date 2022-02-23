import Database, { DBGroups } from '../../../Lib/DatabaseConnector';
import { ref, set } from 'firebase/database';

export async function get({ params }) {
	DBGroups.Groups;

	let { groupID } = params;

	let DB = new Database(DBGroups.Users);
	await DB.data;

	if (DB.data == null) {
		return {
			body: {
				data: 'Cannot connect to firebase',
				status: 500
			}
		};
	}

	let arrayOfUsernames = Object.keys(await DB.data);
	let arrayOfUserObjects: Array<any> = [];
	for (let i = 0; i < arrayOfUsernames.length; i++) {
		arrayOfUserObjects.push((await DB.data)[arrayOfUsernames[i]]);
	}
	try {
		for (let i = 0; i < arrayOfUserObjects.length; i++) {
			let userData = arrayOfUserObjects[i];
			groupID = parseInt(groupID, 10);
			let index = userData.group.indexOf(groupID);
			userData.group.splice(index, 1);
			set(ref(DB.database, 'users/' + arrayOfUsernames[i]), userData);
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
			data: DB.data,
			status: 200
		}
	};

	return returnObj;
}
