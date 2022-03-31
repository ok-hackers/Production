import Database, {DBGroups} from '../../../Lib/DatabaseConnector'

export async function post({ request }) {
	let body = await request.formData();

	let db = new Database(DBGroups.Labs);

	await db.updateLabDocumentationData(body);

	return {
		body: {
			data: "data recived",
			status: 200
		}
	}
}