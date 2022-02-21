import {credential, initializeApp} from 'firebase-admin';
import * as data from '../../../../FirebaseServiceAccount/seniorprojectokhackers-firebase-adminsdk-2n5ba-062b20a04a.json';
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
    //console.log("This backend file is running on the server");
    let {email} = params;

	//throws error if user is not defined
	let user = await getAuth().getUserByEmail(email);

	console.log(user);

	getAuth().deleteUser(user.uid);

    return {
		body: {
			data: "A ok"
		}
	};
}