import Database, { DBGroups } from '../../../Lib/DatabaseConnector';
import { remove, ref } from 'firebase/database';

export async function get({ params }) {
	let { labName } = params;

	let DB = new Database(DBGroups.Labs);

	await DB.deleteLab(labName);

	return {
		body: {
			message: 'good',
			status: 200
		}
	};
}