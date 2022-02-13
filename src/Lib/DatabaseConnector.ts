import firebase, { initializeApp, deleteApp } from 'firebase/app';
//import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { getDatabase, get, child, ref, goOffline, set } from 'firebase/database';

const firebaseConfig = {
	apiKey: 'AIzaSyAcQ8U9QmlK-Kdb94SPW1qdP8Kqu829GhE',
	authDomain: 'seniorprojectokhackers.firebaseapp.com',
	databaseURL: 'https://seniorprojectokhackers-default-rtdb.firebaseio.com/',
	projectId: 'seniorprojectokhackers',
	storageBucket: 'seniorprojectokhackers.appspot.com',
	messagingSenderId: '102482778593',
	appId: '1:102482778593:web:e77c7482eaeb592884daa0',
	measurementId: 'G-194TR6QGXY'
};

export const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);

export enum DBStatus {
	connecting = 'connecting',
	ready = 'ready',
	error = 'error'
}

export enum DBGroups {
	Admin = 'admin',
	Users = 'users',
	Groups = 'groups',
	Labs = 'labs'
}

export default class Database {
	public status: string;
	public database = db;
	public data;

	constructor(DBGroup: DBGroups) {
		this.status = DBStatus.connecting;
		//no group decided on return whole DB

		this.data = new Promise(async (resolve, reject) => {
			let SnapShot;
			try {
				SnapShot = await get(child(ref(db), DBGroup));
			} catch (DatabaseSnapshotError) {
				reject(DatabaseSnapshotError);
			}

			if (SnapShot.exists()) {
				this.status = DBStatus.ready;
				resolve(SnapShot.val());
			} else {
				this.status = DBStatus.error;
				reject('no data avilable');
			}

			//saftey reject
			reject('snapshot has failed');
		});
	}

	async deleteGroup(groupName) {
		//make db data catch here from nates branch
		console.log(await this.data);

		set(ref(this.database, 'groups/' + groupName), {});
	}
}
