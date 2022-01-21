import Database, {DBStatus} from "../Lib/DatabaseConnector";

describe("Test Backend Database connection", ()=>{
    test('Database Connection', (done)=>{
        try {
            let DB = new Database();

            //console.log(DB.data);
            console.log(DB.status == DBStatus.ready);

            done();
        } catch (error){
            done(error)
        }
    });
});