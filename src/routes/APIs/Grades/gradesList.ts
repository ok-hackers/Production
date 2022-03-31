/*
// Written by: Jake Swick
// This file is a rest API to get all of the user grade data and post it back to the browser
*/

import Database, {DBGroups} from "../../../Lib/DatabaseConnector";

export async function get() {
    let db = new Database(DBGroups.Users);

    return {
        body: {
            data: await db.data,
            status: 200
        }
    }
}