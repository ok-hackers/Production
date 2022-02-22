import Database, {DBGroups} from "../../../Lib/DatabaseConnector"
import { getDatabase, ref, set } from "firebase/database";


export async function get({ params }) {
    let {newUser} = params;
    let {userEmail} = params;
    let {currentUser} = params;
    let {auth} = params;
    

    let ReturnOBJ = DatabaseUpdate(newUser, userEmail, currentUser);
    return ReturnOBJ;
}

async function DatabaseUpdate(newUser: string, userEmail: string, currentUser: string) {
    let db = new Database(DBGroups.Users);
    let DatabaseData = await db.data;
    let arrayNames = Object.keys(DatabaseData);
    let namematch = arrayNames.findIndex((name)=>{
        return name == currentUser;
    });

    let activeUser = DatabaseData[currentUser];
    console.log(currentUser)
    
    let firstname = newUser.split(" ")[0];
    let lastname = newUser.split(" ")[1];
    let email = userEmail;

    activeUser.fname = firstname;
    activeUser.lname = lastname;
    activeUser.email = email;

    if (namematch >= 0) {
        set(ref(db.database, 'users/' + currentUser), activeUser)
        return {
            body: {
                data: "nameChanged"
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