<script lang="ts">
	import { goto } from '$app/navigation';
	import { element } from 'svelte/internal';

	function createGroupPopup() {
		//change to be pop-up when working on create group page
		showPopupcreate = !showPopupcreate;
	}

	async function deleteGroup(groupName) {
		let response = await fetch(`/APIs/ManageGroups/deleteGroup-${groupName}`);
		setTimeout(getGroups, 100);
	}

	let showPopupmanage = false;
	let showPopupcreate = false;

	function manageGroups(groupName) {
		//manage the group
		//it's a popup dummy
		showPopupmanage = !showPopupmanage;
	}

	let searchQuery = null;
	let groups: Array<any> = null;

	async function getGroups() {
		let response = await fetch('/APIs/ManageGroups/getGroups');
		let data = await response.json();
		if (data.status == 200) {
			groups = Object.keys(data.data);
		} else {
			console.log('no groups available');
			//change the page to say something
		}
	}

	function searchfunc() {
		groups = groups.sort((element1: string, element2: string) => {
			if (element1.includes(searchQuery)) {
				return -1;
			} else if (element2.includes(searchQuery)) {
				return 1;
			} else {
				return 0;
			}
		});
	}

	getGroups();

	let groupName = null;
</script>

<div class="container">
	<h2 class="searchbar">
		<input
			id="search_bar"
			placeholder="Type Here to Search"
			aria-label="Search Bar"
			bind:value={searchQuery}
			on:change={searchfunc}
		/>
	</h2>
	<button id="create_group_button" class="bigBoiButton" on:click={createGroupPopup}
		>Create Group</button
	>

	<div>
		<div class="popuptext" id="popupmanage" class:show={showPopupmanage}>
			<div class="popupTextGrid">
				<div>
					<input
						id=" "
						type="password"
						placeholder="Current Password"
						aria-label="Password Field"
					/>
				</div>
			</div>
		</div>

		<div>
			<div class="popuptext" id="popupcreate" class:show={showPopupcreate}>
				<div class="popupTextGrid">
					<button class="closeButton" on:click={createGroupPopup}>x</button>
					<div>
						<input
							id="groupName"
							placeholder="Group Name Here"
							aria-label="Groupname"
							bind:value={groupName}
						/>
					</div>
					<div class="userContainer">Users go Here</div>
					<dv>
						<button class="createButton" id="creategroupbuttonpopup">Create Group</button>
					</dv>
				</div>
			</div>
			{#if groups != null}
				{#each groups as group, i}
					<div class="groupdiv">
						<span id="group{i}" class="groupspan">
							<span class="groupName{i}">
								{group}
							</span>
							<button
								id="deleteButton{i}"
								type="button"
								class="dbutton"
								on:click={() => {
									deleteGroup(group);
								}}
								aria-label="Delete Group">Delete</button
							>
							<button
								id="manageButton{i}"
								type="button"
								class="mbutton"
								on:click={() => {
									manageGroups(group);
								}}
								aria-label="Manage Group Button">Manage</button
							></span
						>
					</div>
				{/each}
			{/if}
		</div>
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

	.createButton {
		color: black;
		background-color: white;
		border-radius: 5px;
	}
	.closeButton {
		color: red;
		background-color: var(--popup-color);
		border: none;
		font-size: 15pt;
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
	.searchbar {
		text-align: right;
		padding-right: 5px;
	}

	.popup {
		position: relative;
		display: inline-block;
		cursor: pointer;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
		width: 100%;
	}

	/* The actual popup */
	.popuptext {
		display: none;
		background-color: var(--popup-color);
		color: var(--text-color);
		text-align: center;
		border-radius: 6px;
		padding: 1em;
		width: max-content;
		margin: 0 auto;
	}

	.popuptext input {
		border-radius: 4px;
		padding: 5px;
	}

	.popupTextGrid {
		display: block;
		padding: 10px;
	}

	.show {
		display: block !important;
		-webkit-animation: fadeIn 1s;
		animation: fadeIn 1s;
	}

	.userContainer {
		background-color: white;
	}

	@-webkit-keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
</style>
