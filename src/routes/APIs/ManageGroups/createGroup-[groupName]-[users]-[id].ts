//API for the creation of a group

//author: Josh Secrist

//02-22-22

//pulls in Database objects and functions from the DatabaseConnector file

import Database, { DBGroups } from '../../../Lib/DatabaseConnector';

export async function get({ params }) {
	let { groupName } = params;
	let { users } = params;
	let { id } = params;

	let DB = await new Database(DBGroups.Groups);
	if (DB == null) {
		return {
			body: {
				message: 'firebase connection unavailable',
				status: 500
			}
		};
	}
	await DB.createGroup(groupName, users, id);

	return {
		body: {
			message: 'good',
			status: 200
		}
	};
}
