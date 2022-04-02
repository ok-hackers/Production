<script lang="ts">
	import { afterNavigate, goto } from '$app/navigation';

	export let authSession;
	import {signOut} from 'firebase/auth';

	let HamburgerExspanded = false;

	function exspandHamburger() {
		HamburgerExspanded = !HamburgerExspanded;
	}

	async function logOut() {
		await signOut(authSession)
		await goto('/login');
	}


	afterNavigate(()=>{
		HamburgerExspanded = false;
	})
</script>

<div id="HamburgerContainer" class:expand={HamburgerExspanded} aria-label="HamburgerMenu">
	<div class="HamburgerButton HamburgerCollapse">
		<!-- svelte-ignore a11y-invalid-attribute -->
		<a href="" on:click={exspandHamburger} aria-label="ExpandHamburgerMenu">
			<img src="/MaterialDesignIcons/menu.svg" alt="HamburgerMenu" />
			<p id="CollapseMenuText">Collapse Menu</p>
		</a>
	</div>
	<div class="HamburgerButton">
		<a href="/Admin/labs" aria-label="Create/Edit Labs">
			<img src="/MaterialDesignIcons/Create-Edit-Lab.svg" alt="Create/Edit Lab" />
			<p>Create/Edit Lab</p>
		</a>
	</div>
	<div class="HamburgerButton">
		<a href="/Admin/evaluate" aria-label="Evaluate Labs">
			<img src="/MaterialDesignIcons/Evaluate.svg" alt="Evaluate Labs" />
			<p>Evaluate Labs</p>
		</a>
	</div>
	<div class="HamburgerButton">
		<a href="/Admin/managegroups" aria-label="Manage Groups">
			<img src="/MaterialDesignIcons/Manage-Groups.svg" alt="Manage Groups" />
			<p>Manage Groups</p>
		</a>
	</div>
	<div class="HamburgerButton">
		<a href="/Admin/manageUsersPage" aria-label="Manage Users">
			<img src="/MaterialDesignIcons/Manage-Users.svg" alt="Manage Users" />
			<p>Manage Users</p>
		</a>
	</div>
	<div class="HamburgerButton logOut" onclick={logOut}>
		<!-- svelte-ignore a11y-invalid-attribute -->
		<a href="" on:click={logOut} aria-label="">
			<img src="/MaterialDesignIcons/Logout.svg" alt="Logout" />
			<p>Logout</p>
		</a>
	</div>
</div>

<style>
	#HamburgerContainer {
		position: absolute;
		background-color: green;
		top: 0;
		bottom: 0;
		left: 0;
		width: 3em;
		overflow-x: hidden;
		display: flex;
		flex-direction: column;
		z-index: 9999;
	}

	.expand {
		overflow-x: visible !important;
		width: max-content !important;
	}

	.HamburgerButton > a {
		cursor: pointer;
		display: flex;
		text-decoration: none;
	}

	.HamburgerButton > a > img {
		width: 3em;
		height: 3em;
	}

	.HamburgerButton > a > p {
		align-self: center;
		margin: 0 0.5em;
		color: white;
		font-weight: bold;
	}

	.logOut {
		margin-top: auto;
	}
</style>
