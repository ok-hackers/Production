<script>
	import { goto } from '$app/navigation';

	function createGroupPopup() {
		goto('/Admin');
		//change to be pop-up when working on create group page
	}

	function deleteGroup() {
		//delete the group
		//execute order 66
	}

	function manageGroups() {
		//manage the group
		//it's a popup dummy
	}

	let groups = null;

	async function getGroups() {
		let response = await fetch('/APIs/ManageGroups/getGroups');
		let data = await response.json();
		groups = Object.keys(data.data);
	}

	getGroups();
</script>

<div class="container">
	<button id="creat_group_button" class="bigBoiButton" on:click={createGroupPopup}
		>Create Group</button
	>
	<div>
		{#if groups != null}
			{#each groups as group}
				<div class="groupdiv">
					<span class="groupspan"
						>{group}
						<button type="button" class="dbutton" on:click={deleteGroup} aria-label="Delete Group"
							>Delete</button
						>
						<button
							type="button"
							class="mbutton"
							on:click={manageGroups}
							aria-label="Manage Group Button">Manage</button
						></span
					>
				</div>
			{/each}
		{/if}
	</div>
</div>

<style>
	.bigBoiButton {
		color: white;
		background-color: var(--button-color);
		border-radius: 10px;
		min-height: 45px;
		margin: 0 auto;
		margin-bottom: 10px;
	}

	.container {
		width: auto;
		text-align: center;
	}
	.dbutton {
		color: white;
		background-color: red;
		border-radius: 5px;
		margin-left: 1700px;
	}
	.mbutton {
		color: black;
		background-color: white;
		border-radius: 5px;
		margin-left: 5px;
	}
	.groupdiv {
		background-color: var(--box-color);
		margin-bottom: 5px;
		border-radius: 5px;
		min-height: 35px;
		text-align: center;
		margin-left: 5px;
		margin-right: 5px;
		padding-top: 12px;
	}
	.groupspan {
		color: var(--text-color);
		font-weight: 800;
		font-size: 10pt;
	}
</style>
