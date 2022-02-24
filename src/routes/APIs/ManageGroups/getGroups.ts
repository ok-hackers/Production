//API for the gathering of groups

//author: Josh Secrist

//02-08-22

//pulls in Database objects and functions from the DatabaseConnector file

import Database, { DBGroups } from '../../../Lib/DatabaseConnector';

export async function get({ params }) {
	DBGroups.Groups;

	let DB = new Database(DBGroups.Groups);
	await DB.data;
	if (await DB.data == null) {
		return {
			body: {
				data: 'No data group available',
				status: 402
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
