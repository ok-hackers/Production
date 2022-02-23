import Database, { DBGroups } from '../../../Lib/DatabaseConnector';
import { ref, set } from 'firebase/database';

export async function get({ params }) {
	DBGroups.Groups;

	let { userToUpdate, groupID } = params;

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

	for (let i = 0; i < arrayOfUserObjects.length; i++) {
		if (arrayOfUsernames[i] == userToUpdate) {
			let userData = arrayOfUserObjects[i];
			groupID = parseInt(groupID, 10);
			userData.group.push(groupID);
			set(ref(DB.database, 'users/' + arrayOfUsernames[i]), userData);
		}
	}

	let returnObj = {
		body: {
			data: DB.data,
			status: 200
		}
	};

	return returnObj;
}
