import { initializeApp } from 'firebase/app';
//import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { getDatabase, get, child, ref } from 'firebase/database';

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

const App = initializeApp(firebaseConfig);
const db = getDatabase(App);

export enum DBStatus {
	connecting = 'connecting',
	ready = 'ready',
	error = 'error'
}

export enum DBGroups {
	Admin = 'Admin',
	Users = 'Users',
	Groups = 'Groups',
	Labs = 'Labs'
}

export default class Database {
	public status: string;
    public database = db;
	public data;

	constructor(DBGroup?: DBGroups) {
		this.status = DBStatus.connecting;
		//no group decided on return whole DB
        if (DBGroup == null) {
            get(child(ref(db), 'users')).then((snapshot)=>{
                if (snapshot.exists()) {
                    console.log(snapshot.val());
                } else {
                    console.log("no data avilable");
                }
            }).catch((DatabaseSnapshotError)=>{
                console.error(DatabaseSnapshotError);
            });
        } else {
            get(child(ref(db), DBGroup)).then((snapshot)=>{
                if (snapshot.exists()) {
                    console.log(snapshot.val());
                } else {
                    console.log("no data avilable");
                }
            }).catch((DatabaseSnapshotError)=>{
                console.error(DatabaseSnapshotError);
            });
        }
	}

	async getUsernames() {

	}
}
