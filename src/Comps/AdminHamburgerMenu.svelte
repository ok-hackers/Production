<script lang="ts">
	let HamburgerExspanded = false;

	function exspandHamburger() {
		HamburgerExspanded = !HamburgerExspanded;
	}

	function logOut() {
		//TODO
		//waiting on auth branch to be done and make auth avilable
	}
</script>

<div id="HamburgerContainer" class:expand={HamburgerExspanded} aria-label="HamburgerMenu">
	<div class="HamburgerButton">
		<!-- svelte-ignore a11y-invalid-attribute -->
		<a href="" on:click={exspandHamburger} aria-label="ExpandHamburgerMenu">
			<img src="/MaterialDesignIcons/menu.svg" alt="HamburgerMenu" />
			<p>Collapse Menu</p>
		</a>
	</div>
	<div class="HamburgerButton">
		<a href="/Admin/CreateLab" aria-label="Create/Edit Labs">
			<img src="/MaterialDesignIcons/menu.svg" alt="Create/Edit Lab" />
			<p>Create/Edit Lab</p>
		</a>
	</div>
	<div class="HamburgerButton">
		<a href="/Admin/EvaluateLabs" aria-label="Evaluate Labs">
			<img src="/MaterialDesignIcons/menu.svg" alt="Evaluate Labs" />
			<p>Evaluate Labs</p>
		</a>
	</div>
	<div class="HamburgerButton">
		<a href="/Admin/ManageGroup" aria-label="Manage Groups">
			<img src="/MaterialDesignIcons/menu.svg" alt="Manage Groups" />
			<p>Manage Groups</p>
		</a>
	</div>
	<div class="HamburgerButton">
		<a href="/Admin/ManageUsers" aria-label="Manage Users">
			<img src="/MaterialDesignIcons/menu.svg" alt="Manage Users" />
			<p>Manage Users</p>
		</a>
	</div>
	<div class="HamburgerButton logOut" onclick={logOut}>
		<!-- svelte-ignore a11y-invalid-attribute -->
		<a href="" on:click={logOut} aria-label="">
			<img src="/MaterialDesignIcons/menu.svg" alt="Logout" />
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
	}

	.expand {
		overflow-x: visible !important;
		width: max-content !important;
	}

	.HamburgerButton > a {
		cursor: pointer;
		display: flex;
	}

	.HamburgerButton > a > img {
		width: 3em;
		height: 3em;
	}

	.HamburgerButton > a > p {
		align-self: center;
		margin: 0 0.5em;
	}

	.logOut {
		margin-top: auto;
	}
</style>
