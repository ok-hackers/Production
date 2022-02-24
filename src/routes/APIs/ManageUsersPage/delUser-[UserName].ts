// Written by Jake Swick 
// 
// This page is an API file that can be referenced to delete a specific user from the database.
// This is going to delete the specified user (when you click Delete User on the ManageUsersPage) from the database.
// This is used in ManageUsersPage.svelte.

import Database, {DBGroups} from '../../../Lib/DatabaseConnector' //Importing the database groups from the DB connector file 
import { remove, ref } from 'firebase/database' //imports firebase database removal and refernce

export async function get({ params }) {  //function to get the users

    let {UserName} = params; //Set the UserName (specified in DatabaseConnector) to params
    let DB = new Database(DBGroups.Users);  //new variable called DB will use Users called above.
	
	await DB.deleteUser(UserName); //will wait for the UserName. Onc eit gets it, it will go on to the return statement below.
	
	// return will delete the specified username from the databse. Status 200 means it was successful.
	return {
		body: {
			data:`${UserName} was Deleted`,
			status: 200
		}
	};
}
