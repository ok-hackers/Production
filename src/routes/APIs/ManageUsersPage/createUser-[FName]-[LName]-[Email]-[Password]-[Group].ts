import Database, {UserMetaData, DBGroups} from "../../../Lib/DatabaseConnector";

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
	//#region initialize fields
    let {FName, LName, Email, Password, Group} = params;

	let groupArray = [Group]

	let newUser: UserMetaData = {
		FName,
		LName,
		Email,
		Password,
		group: groupArray
	}
	//#endregion
	
	//#region update firebase
	try {
		//#region Update authentication Database
		let newUserAuth = await getAuth().createUser({
			email: newUser.Email,
			emailVerified: false,
			password: `${newUser.Password}`,
			displayName: `${newUser.FName} ${newUser.LName}`,
			disabled: false
		})
		//#endregion
		//#region Update realtime Database
		let DB = await new Database(DBGroups.Users);
		DB.createUser(newUser);
		//#endregion
	}
	catch (error) {
		return {
			body: {
				data: "Database not avilable",
				status: 500
			}
		}
	}


	return {
		body: {
			data: "User Created",
			status: 200
		}
	};
	//#endregion
}