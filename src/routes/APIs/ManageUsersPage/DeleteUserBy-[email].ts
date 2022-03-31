// Author(s): Nate Fabian, Lane Wilkerson
// Last Modified: 02/24/2022
// Purpose: Receives user email through an API call from manageUsersPage and deletes the user from Firebase Auth
import {credential, initializeApp} from 'firebase-admin';
import * as data from '../../../../firebase-adminlink.json';
import {getAuth} from 'firebase-admin/auth';

try {
	initializeApp({
		//@ts-ignore ignore the typing on data its a json file
		credential: credential.cert(data),
		databaseURL: "https://seniorprojectokhackers-default-rtdb.firebaseio.com"
	})
} catch (error) {
	console.log("Firebase already connected");
}

export async function get({ params }) {
    let {email} = params;

	let user = await getAuth().getUserByEmail(email);

	getAuth().deleteUser(user.uid);

    return {
		body: {
			data: "A ok",
            status: 200
		}
	};
}