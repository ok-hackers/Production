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
			<a href="/User/userSettings" class="svg" id="userSettings">
				<object id = "userSettings" aria-label="User Settings Button" data="/static/userSettings.svg" type="image/svg+xml">
				  <img src="userSettings.png" alt="userSettingsButton" />
				</object>
			</a>
			<a href="/login" class="svg" id="userLogout" on:click={SignOut}>
				<object id = "userLogout" aria-label="Log Out Button" data="/static/userLogout.svg" type="image/svg+xml">
				  <img src="userLogout.png" alt="logoutButton" />
				</object>
			</a>
			<!-- <button on:click={SignOut} class="button button--raised" id="sign-out" name="signout">
				Sign Out
			</button> -->
		</div>
	</div>
</header>

<style>
	#userLogout {
		height: 45px;
		justify-content: right;
		margin-right: 10px;
	}
	#userSettings {
		height: 45px;
		justify-content: right;
		margin-left:auto;
		margin-right: 10px;
	}
	h3 {
		margin-left: 5px;
		margin-bottom: 5px;
		color: black;
		font-weight:400 !important;
	}
	a {
		text-decoration: none;
	}
	.topBar, .top {
		height: 60px;
		margin: auto;
	}
</style>
