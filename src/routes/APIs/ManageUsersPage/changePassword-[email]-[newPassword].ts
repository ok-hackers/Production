// Author(s): Lane Wilkerson
// Last Modified: 03/26/2022
// Purpose: Receives email and password through API call from manageUsersPage and uses them to update user's Firebase Auth password
import {credential, initializeApp} from 'firebase-admin';
import * as data from '../../../../firebase-adminlink.json';
import {getAuth} from 'firebase-admin/auth';

try {
	initializeApp({
		credential: credential.cert(data),
		databaseURL: "https://seniorprojectokhackers-default-rtdb.firebaseio.com"
	})
} catch (error) {
	console.log("firebase already connected");
}

//Gets the email and password that is passed from manageUsersPage and updates the users password
export async function get({ params }) {
    let{email} = params
    let {newPassword} = params;

    let user = await getAuth().getUserByEmail(email);

    if (newPassword != null) {
      getAuth().updateUser(user.uid, {
          password: newPassword,
        })
          .then(function(userRecord) {
            console.log("Successfully updated user", userRecord.toJSON());
          })
          .catch(function(error) {
            console.log("Error updating user:", error);
          });
    }
    return {
      body: {
        data: "A ok",
        status: 200
      }
	  };
}