import Database, { DBGroups } from '../../../Lib/DatabaseConnector';

//gets lab data from DB
export async function get({ params }) {
	DBGroups.Labs;

	let DB = new Database(DBGroups.Labs);
	DB.data;
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