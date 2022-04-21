<script lang="ts">
	import { goto } from "$app/navigation";

	setTimeout(()=>{
		goto("/User/availableLabs");
	}, 500)
</script>

<svelte:head>
	<title>SVC HackLabs Login Page</title>
</svelte:head>

<p>Please Hold</p>

<style>
	p {
		width: max-content;
		margin-left: auto;
		margin-right: auto;
	}
</style>
