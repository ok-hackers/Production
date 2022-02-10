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
			<a href="/User"><h3>SVC Hack Labs</h3></a>
			<a href="/User/userSettings" id='userSettings'> user settings page </a>
			<button on:click={SignOut} class="button button--raised" id="sign-out" name="signout">
				Sign Out
			</button>
		</div>
		<!-- <div>
			Logged in as: {Auth.currentUser.email}
		</div> -->
	</div>
</header>

<style>
	h3 {
		margin-left: 5px;
		margin-bottom: 5px;
		color: black;
		font-weight:400 !important;
	}
	#userSettings {
		justify-content: right;
		margin-left:auto;
		margin-right: 20px;
	}
	#sign-out {
		justify-content: right;
		margin-right: 30px;
	}
	a {
		text-decoration: none;
	}
	.topBar, .top {
		height: 60px;
		margin: auto;
	}
</style>
