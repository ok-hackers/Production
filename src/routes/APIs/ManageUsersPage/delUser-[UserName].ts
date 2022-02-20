import Database, {DBGroups} from '../../../Lib/DatabaseConnector'
import { remove, ref } from 'firebase/database'

export async function get({ params }) {

    let {UserName} = params;

    let DB = new Database(DBGroups.Users);

	await DB.deleteUser(UserName);

	return {
		body: {
			data:`${UserName} was Deleted`,
			status: 200
		}
	};
}
