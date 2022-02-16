import Database, {DBGroups} from "../../../Lib/DatabaseConnector";

export async function get() {
    let db = new Database(DBGroups.Labs);

    return {
        body: {
            data: await db.data
        }
    }
}