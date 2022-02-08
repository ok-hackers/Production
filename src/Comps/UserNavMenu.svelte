<script>
	import { goto } from '$app/navigation';

	import { signOut } from 'firebase/auth';
	export let Auth;

	function SignOut() {
		signOut(Auth);
		goto('/login');
	}
</script>

<!-- Header section containing title -->
<header class="grey">
	<div class="topBar">
		<div class="top">
			<a href="/User"><h3>SVC HackLabs</h3></a>
			<button on:click={SignOut} class="button button--raised" id="sign-out" name="signout">
				Sign Out
			</button>
		</div>
		<div>
			Logged in as: {Auth.currentUser.email}
		</div>
	</div>
</header>

<style>
	a {
		text-decoration: none;
	}
	.topBar {
		margin: auto;
	}
	h3 {
		color: green;
	}
	#sign-out {
		display: block;
		margin-left: auto;
		margin-right: 0;
	}
	a {
		text-decoration: none;
	}
	.topBar {
		max-width: 1024px;
		margin: auto;
	}
</style>
