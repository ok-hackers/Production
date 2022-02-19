import Database, {DBGroups} from '../../../Lib/DatabaseConnector'
import { remove, ref } from 'firebase/database'

export async function get({ params }) {

    let {UserName} = params;
    let returnObj = {
        body:{
            data:`${UserName} was Deleted`
            }
    }

    let DB = new Database(DBGroups.Users);

	DB.deleteUser(UserName);
    
    

	return returnObj;
}
// need to use a slug. reference LearnYourNumbers > [slug.ts]
//    let {slug} = params; 
//    let {UserName} = params;
