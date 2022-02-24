//API for the deletion of a group

//author: Josh Secrist

//02-08-22

//pulls in Database objects and functions from the DatabaseConnector file, as well as firebase

import Database, { DBGroups } from '../../../Lib/DatabaseConnector';
import { remove, ref } from 'firebase/database';

export async function get({ params }) {
	let { groupName } = params;

	let DB = new Database(DBGroups.Groups);

	await DB.deleteGroup(groupName);

	return {
		body: {
			message: 'good',
			status: 200
		}
	};
}
