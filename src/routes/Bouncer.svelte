<!--
    Author: Nate Fabian
    Date: 1/31/22
    Purpose: Bouncer page to decide if you are a user or admin and move you to the correct page
-->
<script lang="ts">
	import { goto } from '$app/navigation';
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

	//set to true to disable bouncer auto routing users
	let OVERRIDEAUTOLOGIN = false;

	//global scope the firebase apps
	let app: FirebaseApp;
	let auth: Auth;

	let AdminsArray = [];
	let isAnAdmin = false;

	app = initializeApp(firebaseConfig);
	auth = getAuth(app);

	const refresh = window.location.href;

	auth.onAuthStateChanged(function (user) {
		if (user) {
			goto(refresh);
			console.log(refresh);
		}
	});

	let user = 'not logged in';

	if (auth.currentUser == null) {
		goto('/login');
	}

	user = auth.currentUser.email;

	async function getAllAdmins() {
		let response = await fetch(`/APIs/getAllAdmins`);
		let json = await response.json();

		let adminNames = Object.keys(json.data);

		adminNames.forEach((admin) => {
			AdminsArray.push({
				...json.data[admin],
				name: admin
			});
		});

		AdminsArray = AdminsArray;

		AdminsArray.forEach((admin) => {
			console.log(admin);
			if (admin.email == user) {
				isAnAdmin = true;
			}
		});

		DirectToPage();
	}

	function DirectToPage() {
		if (!OVERRIDEAUTOLOGIN) {
			if (isAnAdmin) {
				goto('/Admin');
			} else {
				goto('/User');
			}
		}
	}

	getAllAdmins();
</script>

<div class="section"><div>Please Hold</div></div>

<style>
	.section {
		display: grid;
		justify-content: center;
		align-content: center;
	}
</style>
