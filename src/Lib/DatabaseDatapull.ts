import { getDatabase, ref, child, get, Database } from 'firebase/database';
import database from "../Lib/DatabaseConnector";


export async function databaseGetCall() {
    let users
    try {
    let userpulldatabase = new database();
    users = await userpulldatabase.getUsernames();
    console.log(users);
    } catch (databasecollectionerror){
        console.log(databasecollectionerror);
    }
    return users;
}