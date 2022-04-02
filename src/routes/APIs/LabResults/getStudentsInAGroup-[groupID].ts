//API for the pulling of users in a group

//author: Josh Secrist

//03-26-22

//pulls in Database objects and functions from the DatabaseConnector file
import Database, { DBGroups } from '../../../Lib/DatabaseConnector';

export async function get({ params }) {
	let { groupID } = params;
	let usersInTheGroup: Array<any> = [];

	let usersDB = await new Database(DBGroups.Users);
	await usersDB.data;
	if (usersDB.data == null) {
		return {
			body: {
				data: 'Cannot connect to firebase',
				status: 500
			}
		};
	}

	let arrayOfUsernames = Object.keys(await usersDB.data);
	let arrayOfUserObjects: Array<any> = [];
	for (let i = 0; i < arrayOfUsernames.length; i++) {
		arrayOfUserObjects.push((await usersDB.data)[arrayOfUsernames[i]]);
	}

	usersInTheGroup = await usersDB.usersOfAGroup(groupID, arrayOfUserObjects);

	return {
		body: {
			data: await usersInTheGroup,
			status: 200
		}
	};
}
