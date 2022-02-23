/* 
	Author: Nate Fabian
	Date: 2/20/2022
	Purpose: Delete user from authentication part of firebase
*/

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
	console.log("firebase already connected");
}

export async function get({ params }) {
    let {email} = params;

    console.log(email)

	let user = await getAuth().getUserByEmail(email);

	console.log(user);

	getAuth().deleteUser(user.uid);

    return {
		body: {
			data: "A ok",
            status: 200
		}
	};
}