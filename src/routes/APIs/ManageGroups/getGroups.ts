import Database, { DBGroups } from '../../../Lib/DatabaseConnector';

export async function get({ params }) {
	DBGroups.Groups;

	let DB = new Database(DBGroups.Groups);
	DB.data;
	console.log(await DB.data);

	let returnObj = {
		body: {
			data: await DB.data
		}
	};

	return returnObj;
}
