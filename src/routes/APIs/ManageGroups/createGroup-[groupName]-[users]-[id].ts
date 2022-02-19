import Database, { DBGroups } from '../../../Lib/DatabaseConnector';

export async function get({ params }) {
	let { groupName } = params;
	let { users } = params;
	let { id } = params;

	let DB = new Database(DBGroups.Groups);

	await DB.createGroup(groupName, users, id);

	return {
		body: {
			message: 'good',
			status: 200
		}
	};
}
