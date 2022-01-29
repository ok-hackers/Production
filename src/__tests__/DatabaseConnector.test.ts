import Database, {DBStatus, DBGroups} from "../Lib/DatabaseConnector";

describe("Test Backend Database connection", ()=>{
    test('Database Connection Users', (done)=>{
        try {
            let DB = new Database(DBGroups.Users);
            expect(DB.data).resolves.toBeDefined();

            done();
        } catch (error){
            done(error)
        }
    });
    test('Database Connection Admin', (done)=>{
        try {
            let DB = new Database(DBGroups.Admin);

            expect(DB.data).resolves.toBeDefined();

            done();
        } catch (error){
            done(error)
        }
    });
    test('Database Connection Groups', (done)=>{
        try {
            let DB = new Database(DBGroups.Groups);

            expect(DB.data).resolves.toBeDefined();

            done();
        } catch (error){
            done(error)
        }
    });
    test('Database Connection Labs', (done)=>{
        try {
            let DB = new Database(DBGroups.Labs);

            expect(DB.data).resolves.toBeDefined();

            done();
        } catch (error){
            done(error)
        }
    });
});
