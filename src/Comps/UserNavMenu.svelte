<script>
    export let SignedInUser;
</script>

<!-- Header section containing title -->
<header class="mdl-layout__header mdl-color-text--white mdl-color--grey-700">
	<div class="mdl-cell mdl-cell--12-col mdl-cell--12-col-tablet mdl-grid">
		<div
			class="mdl-layout__header-row mdl-cell mdl-cell--12-col mdl-cell--12-col-tablet mdl-cell--8-col-desktop"
		>
			<a href="/"><h3>SVC HackLabs</h3></a>
		</div>
        <div>
            Logged in as: {SignedInUser}
        </div>
	</div>
</header>

<style>
	a {
		text-decoration: none;
	}
	.mdl-layout__header-row {
		padding: 0;
	}
	h3 {
		color: white;
	}
</style>
