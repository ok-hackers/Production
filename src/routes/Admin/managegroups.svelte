<!--
    Author: Josh Secrist
    Date: 2/22/22
    Manage groups page with scripts, collect information to display, search bar, and display pop-ups. Not finished
-->
<script lang="ts">
	async function deleteGroup(groupName) {
		let response = await fetch(`/APIs/ManageGroups/deleteGroup-${groupName}`);
		setTimeout(getGroups, 100);
	}

	function createGroupPopup() {
		//change to be pop-up when working on create group page
		showPopupcreate = !showPopupcreate;
	}
	function manageGroups(groupName) {
		//manage the group
		//it's a popup dummy
		showPopupmanage = !showPopupmanage;
	}

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
	async function createGroup(groupName: String, users) {
		let checkedUser = [];
		for (let i = 0; i < userlist.length; i++) {
			let tempele = document.getElementById('userCheckbox' + i) as HTMLInputElement;
			if (tempele.checked) {
				checkedUser[i] = true;
			} else {
				checkedUser[i] = false;
			}
		}
		let j = 0;
		for (let i = 0; i < checkedUser.length; i++) {
			if (checkedUser[i] == true) {
				addedUsers[j] = users[i];
				j++;
			}
		}
		let code1 = groupName.charCodeAt(0);
		let code2 = groupName.charCodeAt(1);
		let code3 = groupName.charCodeAt(2);
		let id = code1 + code2 + code3;
		let response = await fetch(`/APIs/ManageGroups/createGroup-${groupName}-${addedUsers}-${id}`);
		for (let i = 0; i < userlist.length; i++) {
			for (let j = 0; j < addedUsers.length; j++) {
				if (userlist[i] == addedUsers[j]) {
					console.log(`the comparison worked ${allUsers[i]}`);
					let response2 = await fetch(`/APIs/ManageGroups/updateUserGroups-${userlist[i]}-${id}`);
					console.log(await response2.status);
				}
			}
		}
		let response2 = await fetch(`/APIs/ManageGroups/removeGroupFromUsers-${id}`);
		createGroupPopup();
	}

	async function getUsers() {
		let response = await fetch('/APIs/ManageUsersPage/getUsers');
		let data = await response.json();
		if (data.status == 200) {
			userlist = Object.keys(data.data);
			for (let i = 0; i < userlist.length; i++) {
				allUsers.push(data.data[userlist[i]]);
			}
		} else {
			console.log('No users available');
		}
	}

	let allUsers: Array<any> = [];
	let searchQuery = null;
	let groups: Array<any> = null;
	let groupName = null;
	let userlist: Array<any> = null;
	let addedUsers = ['testuser'];
	let showPopupmanage = false;
	let showPopupcreate = false;
	getGroups();
	getUsers();
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
					<button class="closeButton" id="xButton" on:click={createGroupPopup}>x</button>
					<div>
						<input
							id="groupName"
							placeholder="Group Name Here"
							aria-label="Groupname"
							bind:value={groupName}
						/>
					</div>
					<form>
						<div class="userContainer">
							{#if userlist != null}
								{#each userlist as theUser, i}
									<div class="userList">
										<input type="checkbox" id="userCheckbox{i}" name="user{i}" />
										<label for="user{i}">{theUser}</label>
									</div>
								{/each}
							{/if}
						</div>
					</form>
					<dv>
						<button
							class="createButton"
							id="creategroupbuttonpopup"
							on:click={() => {
								createGroup(groupName, userlist);
							}}>Create Group</button
						>
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
		margin-left: 80vh;
		margin-right: 10vh;
	}
	.mbutton {
		color: black;
		background-color: white;
		border-radius: 5px;
		margin-right: 10vh;
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
		position: absolute;
		top: 0vh;
		right: 0vh;
	}
	.groupdiv {
		background-color: var(--box-color);
		margin-bottom: 5px;
		border-radius: 5px;
		min-height: 35px;
		text-align: center;
		margin-left: 25vh;
		margin-right: 25vh;
		padding-top: 12px;
		text-align: left;
		padding-left: 2vh;
	}
	.groupspan {
		color: var(--text-color);
		font-weight: 800;
		font-size: 14pt;
	}
	.searchbar {
		text-align: right;
		margin-right: 25vh;
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
		position: relative;
	}
	.popuptext input {
		border-radius: 4px;
		padding: 5px;
	}
	.show {
		display: block !important;
		-webkit-animation: fadeIn 1s;
		animation: fadeIn 1s;
	}
	.userContainer {
		background-color: white;
		text-align: left;
	}
	.userList {
		background-color: white;
		padding-right: 10vh;
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
