import Database, {DBGroups} from '../../../Lib/DatabaseConnector';


export async function get({ params }) {
	let { labName } = params;

	let db = new Database(DBGroups.Labs);

	let labData = await db.getLabDocumentationData(labName);

	return {
		body: {
			data: labData,
			status: 200
		}
	}
}