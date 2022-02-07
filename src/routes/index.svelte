<script>
	import { goto } from '$app/navigation';

	import { initializeApp } from 'firebase/app';
	import { getAuth } from 'firebase/auth';

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

	let app = initializeApp(firebaseConfig);
	let auth = getAuth(app);

	function myBoy() {
		goto('/login');
	}
</script>

<div>
	<a href="/login" id="login1">Login?</a>
	<button on:click={myBoy} id="login2">Hello</button>
</div>

<style></style>
