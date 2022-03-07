/*
    Author: Nate Fabian
    Date: 2/12/22
    Purpose: Rest API to get all of the lab meta data and post it back to the browser
*/

import Database, {DBGroups} from "../../../Lib/DatabaseConnector";

export async function get() {
    let db = new Database(DBGroups.Labs);

    return {
        body: {
            data: await db.data,
            status: 200
        }
    }
}