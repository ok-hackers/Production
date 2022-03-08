import Database, {DBGroups} from '../../../Lib/DatabaseConnector';


export async function get({ params }) {
	let { labName } = params;

	let db = new Database(DBGroups.Labs);

	let labData;

	try {
		labData = await db.getLabDocumentationData(labName);
	} catch (erorr) {
		return {
			body: {
				data: "Lab can not be found",
				status: 500
			}
		}
	}

	return {
		body: {
			data: labData,
			status: 200
		}
	}
}