<!--
    Author: Nate Fabian
    Date: 1/31/22
    Purpose: Layout file to be applied to all pages under /User
-->

<script lang="ts">
	import nav from '../../Comps/UserNavMenu.svelte';
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
	
	if (auth.currentUser == null) {
		goto('/login');
	}
</script>

<div>
	<svelte:component this={nav} Auth={auth} />
	<slot><!-- optional fallback --></slot>

	<!--
		https://svelte.dev/tutorial/slot-fallbacks
		A component can specify fallbacks for any slots that are left empty, by putting content inside the <slot> element:

		<div class="box">
			<slot>
				<em>no content was provided</em>
			</slot>
		</div>

		We can now create instances of <Box> without any children:

		<Box>
			<h2>Hello!</h2>
			<p>This is a box. It can contain anything.</p>
		</Box>

		<Box/>
	-->
</div>
