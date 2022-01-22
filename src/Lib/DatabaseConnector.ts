import {initializeApp} from 'firebase/app';
import {getFirestore, collection, getDocs} from 'firebase/firestore/lite'


const firebaseConfig = {
    apiKey: "AIzaSyAcQ8U9QmlK-Kdb94SPW1qdP8Kqu829GhE",
    authDomain: "seniorprojectokhackers.firebaseapp.com",
    databaseURL: "https://seniorprojectokhackers-default-rtdb.firebaseio.com/",
    projectId: "seniorprojectokhackers",
    storageBucket: "seniorprojectokhackers.appspot.com",
    messagingSenderId: "102482778593",
    appId: "1:102482778593:web:e77c7482eaeb592884daa0",
    measurementId: "G-194TR6QGXY"
}

const App = initializeApp(firebaseConfig);
const db = getFirestore(App);

export enum DBStatus {
    connecting = "connecting",
    ready = "ready",
    error = "error"
}

export enum DBGroups {
    Admin = "Admin",
    Users = "Users",
    Groups = "Groups",
    Labs = "Labs"
}

export default class Database {
    public status:string;
    public data;

    constructor(DBGroup?: DBGroups) {
        this.status = DBStatus.connecting;
        //no group decided on return whole DB
        if (DBGroup == null) {
            this.data = collection(db, "admin");
            this.status = DBStatus.ready;
        }
        //group decided return group
        else {
            this.data = collection(db, DBGroup);

            this.status = DBStatus.ready;
        }
    }

    async getUsernames(){
        const usercollection = collection(db, 'seniorprojectokhackers-default-rtdb/users/jsecrist');

        console.log(await getDocs(usercollection));

        //const usersnapshot = await getDocs(usercollection);
        //const userslist = usersnapshot.docs.map(doc => doc.data());
        //console.log(userslist);
        //return userslist;

        return null;
    }
}