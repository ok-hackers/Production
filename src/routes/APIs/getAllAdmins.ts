import Database, {DBGroups} from '../../Lib/DatabaseConnector'

export async function get({params}) {
	let db = new Database(DBGroups.Admin);

	return {
		status: 200,
		body: {
			data: await db.data,
			status: 200
		}
	}
}