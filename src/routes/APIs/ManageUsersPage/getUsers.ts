//return JSON over rest api

import Database, {DBGroups} from '../../../Lib/DatabaseConnector'

export async function get({ params }) {
    //console.log("This backend file is running on the server");

    DBGroups.Users

    let DB = new Database(DBGroups.Users)
    DB.data
    console.log(await DB.data)

    let returnObj = {
        body:{
            data:await DB.data,
        
        }
        
    }
    
    

	return returnObj;
}