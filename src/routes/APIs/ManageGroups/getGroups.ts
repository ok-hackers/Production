import Database, { DBGroups } from '../../../Lib/DatabaseConnector';

export async function get({ params }) {
	DBGroups.Groups;

	let DB = new Database(DBGroups.Groups);
	DB.data;
	console.log(await DB.data);
	if (DB.data == null) {
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
