import Database, {DBStatus, DBGroups} from "../Lib/DatabaseConnector";

describe("Test Backend Database connection", ()=>{
    test('Database Connection', (done)=>{
        try {
            let DB = new Database(DBGroups.Users);

            expect(DB.data).resolves.toBeDefined();

            done();
        } catch (error){
            done(error)
        }
    });
});