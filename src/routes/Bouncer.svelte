<!--
    Author: Nate Fabian
    Date: 1/31/22
    Purpose: Bouncer page to decide if you are a user or admin and move you to the correct page
-->

<script lang="ts">
	import {goto} from '$app/navigation';
	import { initializeApp, FirebaseApp } from 'firebase/app';
	import { Auth, getAuth } from 'firebase/auth';

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

	//global scope the firebase apps
	let app: FirebaseApp;
	let auth: Auth;

	app = initializeApp(firebaseConfig);
	auth = getAuth(app);

	const refresh = window.location.href; 

    auth.onAuthStateChanged(function(user) {
		if (user) {
			goto(refresh)
			console.log(refresh)
		}
	});
	
	let user = 'not logged in';
	
	if (auth.currentUser == null) {
      goto('/login');
    }

	user = auth.currentUser.email;

	console.log(auth.currentUser.email);
</script>

<div>
	<div>Where would you like to go?</div>
	<div>you will not see this once bouncer is complete</div>
    <div>You are logged in as {user}</div>
    <div>
        <a id="NavigateAdmin" href="/Admin">Admin</a>|<a id="NaviagateUser" href="/User">User</a>
    </div>
</div>
