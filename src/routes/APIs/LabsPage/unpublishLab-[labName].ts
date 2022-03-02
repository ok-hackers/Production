import Database, {DBGroups} from "../../../Lib/DatabaseConnector"
import { getDatabase, ref, set } from "firebase/database";

export async function get({ params }) {
	let { labName } = params;

    let ReturnOBJ = DatabaseUpdate(labName);
    return ReturnOBJ;
}

async function DatabaseUpdate(labName: string) {
    let db = new Database(DBGroups.Labs);
    let DatabaseData = await db.data;
    let arrayNames = Object.keys(DatabaseData);
    let namematch = arrayNames.findIndex((name)=>{
        return name == labName;
    });

    let activeLab = DatabaseData[labName];

    activeLab.Published = 0;

    if (namematch >= 0) {
        set(ref(db.database, 'labs/' + labName), activeLab)
        return {
            body: {
                message: "Lab Updated", 
                status: 200
            }
        }
    }
    else{
        return {
            body: {
              data: 404  
            }
        }
    }
}
