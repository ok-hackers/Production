// Written by Jake Swick 
// 
// This page is an API file that can be referenced to pull all of the users out of the database
// to be displayed on a page. This is used in ManageUsersPage.svelte

//return JSON over rest api

import Database, {DBGroups} from '../../../Lib/DatabaseConnector' //Importing the database groups from the DB connector file 

export async function get({ params }) { //function to get the users

    DBGroups.Users //pulling the group called Users from DatabaseConnector

    let DB = new Database(DBGroups.Users) //new variable called DB will use Users called above.
    DB.data

    // If there are no users in the Database, it will return nothing and say
    // No data group available. This gives a status code 402, meaning there
    // is no data to display
    if (DB.data == null) { 
		return {
			body: {
				data: 'No data group available',
                status: 402
			}
		}
	}

    // returnObj, a declared variable, will be given the DB.data, which is
    // where the user data is stored. This is only run if there are users stored
    // in the Database. Status 200 means it was successful.
    let returnObj = {
        body:{
            data:await DB.data,
            status: 200
        }
        
    }
	return returnObj;
}