<script>
    export let SignedInUser;
</script>

<!-- Header section containing title -->
<header class="grey">
	<div class="topBar">
		<div class="top">
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
	.topBar {
		max-width: 1024px;
		margin: auto;
	}	
	h3 {
		color: green;
	}
</style>
