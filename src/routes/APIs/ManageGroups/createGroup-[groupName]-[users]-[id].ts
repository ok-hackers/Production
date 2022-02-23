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
