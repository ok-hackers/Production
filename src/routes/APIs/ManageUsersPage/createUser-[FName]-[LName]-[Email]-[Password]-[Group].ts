/*
    Author: Nate Fabian
    Date: 2/15/22
    Purpose: API to create user in authentication via firebase
*/

import Database, { UserMetaData, DBGroups } from '../../../Lib/DatabaseConnector';

import { credential, initializeApp } from 'firebase-admin';
import * as data from '../../../../firebase-adminlink.json';
import { getAuth } from 'firebase-admin/auth';

try {
	initializeApp({
		//@ts-ignore ignore the typing on data its a json file
		credential: credential.cert(data),
		databaseURL: 'https://seniorprojectokhackers-default-rtdb.firebaseio.com'
	});
} catch (error) {
	console.log('firebase already connected');
}

export async function get({ params }) {
	//#region initialize fields
	let { FName, LName, Email, Password, Group } = params;

	let groupArray = [Group];

	let newUser: UserMetaData = {
		fname: FName,
		lname: LName,
		email: Email,
		password: Password,
		group: groupArray
	};
	//#endregion

	//#region update firebase
	try {
		//#region Update authentication Database
		let newUserAuth = await getAuth().createUser({
			email: newUser.email,
			emailVerified: false,
			password: `${newUser.password}`,
			displayName: `${newUser.fname} ${newUser.lname}`,
			disabled: false
		});
		//#endregion
		//#region Update realtime Database
		let DB = await new Database(DBGroups.Users);
		DB.createUser(newUser);
		//#endregion
	} catch (error) {
		return {
			body: {
				data: 'Database not avilable',
				status: 500
			}
		};
	}

	return {
		body: {
			data: 'User Created',
			status: 200
		}
	};
	//#endregion
}
