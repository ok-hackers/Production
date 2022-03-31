<!--
    Author: Josh Secrist
    Date: 2/22/22
    Manage groups page with scripts, collect information to display, search bar, and display pop-ups. Not finished
-->
<script lang="ts">
	//calls API to delete group form DB
	//takes in groupName as string
	//no returns
	async function deleteGroup(groupName) {
		let response2 = await fetch(`/APIs/ManageGroups/removeGroupFromUsers-${groupName}`);
		let response = await fetch(`/APIs/ManageGroups/deleteGroup-${groupName}`);
		console.log(await response2.json());
		setTimeout(getGroups, 100);
		deleteGroupPopup(groupName);
	}

	function addUsersPopup() {
		getUsersNotInGroup(groupName);
		showPopupAdd = !showPopupAdd;
	}

	function closeAddUsersPopup() {
		showPopupAdd = !showPopupAdd;
		usersNotInTheGroup = [];
	}

	//displays pop-up for the creating of a group
	//no inputs or outputs
	function createGroupPopup() {
		//change to be pop-up when working on create group page
		groupName = '';
		showPopupCreate = !showPopupCreate;
	}

	//displays pop-up for the deletion of a group
	//takes in name of the group to display
	//returns nothing
	function deleteGroupPopup(nameOfGroup) {
		groupName = nameOfGroup;
		showPopupDelete = !showPopupDelete;
	}

	//displays pop-up for the managing of a group
	//takes in groupname as string
	//returns nothing
	function manageGroupsPopup(nameOfGroup) {
		getUsersInGroup(nameOfGroup);
		//console.log(usersInTheGroup);
		groupName = nameOfGroup;
		showPopupManage = !showPopupManage;
	}

	//calls API to fetch all groups from the DB
	//no inputs or outputs
	async function getGroups() {
		let response = await fetch('/APIs/ManageGroups/getGroups');
		let data = await response.json();
		if (data.status == 200) {
			groups = Object.keys(data.data);
			for (let i = 0; i < groups.length; i++) {
				groupObjects.push(data.data[groups[i]]);
			}
		} else {
			window.alert('Firebase unreachable');
		}
	}

	async function closeManagePopup() {
		showPopupManage = !showPopupManage;
		usersInTheGroup = [];
	}

	async function getUsersInGroup(groupToCheck) {
		let groupToCheckID = 0;
		for (let i = 0; i < groupObjects.length; i++) {
			if (groups[i] == groupToCheck) {
				groupToCheckID = groupObjects[i].id;
			}
		}
		console.log(allUsers);
		for (let i = 0; i < allUsers.length; i++) {
			for (let j = 0; j < allUsers[i].group.length; j++) {
				if (allUsers[i].group[j] == groupToCheckID) {
					usersInTheGroup.push(userlist[i]);
				}
			}
		}
		usersInTheGroup = usersInTheGroup;
	}

	async function getUsersNotInGroup(groupToCheck) {
		let groupToCheckID = 0;
		for (let i = 0; i < groupObjects.length; i++) {
			if (groups[i] == groupToCheck) {
				groupToCheckID = groupObjects[i].id;
			}
		}
		for (let i = 0; i < allUsers.length; i++) {
			if (allUsers[i].group.indexOf(groupToCheckID) == -1) {
				usersNotInTheGroup.push(userlist[i]);
			}
		}
		usersNotInTheGroup = usersNotInTheGroup;
	}

	//search bar function
	//no inputs
	//returns 1 if found, 0 if not
	function searchfunc() {
		groups = groups.sort((element1: string, element2: string) => {
			if (element1.toLowerCase().includes(searchQuery.toLowerCase())) {
				return -1;
			} else if (element2.toLowerCase().includes(searchQuery.toLowerCase())) {
				return 1;
			} else {
				return 0;
			}
		});
	}

	//calls API to create a group after checking user checkbox fields and generating the ID
	//takes in groupname as a string and users as an array
	//outputs nothing
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
				addedUsers[j] = userlist[i];
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
					//console.log(`the comparison worked ${allUsers[i]}`);
					let response2 = await fetch(`/APIs/ManageGroups/updateUserGroups-${userlist[i]}-${id}`);
					await response2.status;
				}
			}
		}
		createGroupPopup();
		//location.reload();
	}

	async function addUsersToGroup() {
		let checkedUser = [];
		let groupID = 0;
		for (let i = 0; i < usersNotInTheGroup.length; i++) {
			let tempele = document.getElementById('userCheckboxa' + i) as HTMLInputElement;
			if (tempele.checked) {
				checkedUser[i] = true;
			} else {
				checkedUser[i] = false;
			}
		}
		let j = 0;
		for (let i = 0; i < checkedUser.length; i++) {
			if (checkedUser[i] == true) {
				addedUsers[j] = userlist[i];
				j++;
			}
		}
		for (let i = 0; i < groupObjects.length; i++) {
			if (groups[i] == groupName) {
				groupID = groupObjects[i].id;
			}
		}

		for (let i = 0; i < userlist.length; i++) {
			for (let k = 0; k < addedUsers.length; k++) {
				if (userlist[i] == addedUsers[k]) {
					let response2 = await fetch(
						`/APIs/ManageGroups/updateUserGroups-${userlist[i]}-${groupID}`
					);
					await response2.status;
				}
			}
		}

		closeAddUsersPopup();
	}

	async function removeUserFromGroup(userInTheGroup) {
		let response = await fetch(
			`/APIs/ManageGroups/removeUserFromGroup-${userInTheGroup}-${groupName}`
		);
		console.log('removed the user from the group');
	}

	//calls API to fetch all users from the DB
	//no inputs or outputs
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

	let groupObjects: Array<any> = [];
	let allUsers: Array<any> = [];
	let searchQuery = null;
	let groups: Array<any> = null;
	let groupName = null;
	let userlist: Array<any> = null;
	let usersInTheGroup: Array<any> = [];
	let usersNotInTheGroup: Array<any> = [];
	let addedUsers = ['testuser'];
	let showPopupManage = false;
	let showPopupCreate = false;
	let showPopupDelete = false;
	let showPopupAdd = false;
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
		<div>
			<div class="popuptext" id="popupcreate" class:show={showPopupCreate}>
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
			<div class="popuptext" id="popupmanage" class:show={showPopupManage}>
				<div class="popupTextGrid">
					<button class="closeButton" id="xButtonm" on:click={closeManagePopup}>x</button>
					<div>
						<input id="groupNamem" aria-label="Groupname" bind:value={groupName} />
					</div>
					<form>
						<div class="userContainer">
							{#if usersInTheGroup != null}
								{#each usersInTheGroup as theUser, i}
									<div class="userList">
										<span>
											{theUser}
											<button
												class="dbutton"
												id="removeButton{i}"
												on:click={() => {
													removeUserFromGroup(theUser);
												}}>REMOVE</button
											>
										</span>
									</div>
								{/each}
							{/if}
						</div>
					</form>
					<dv>
						<button class="createButton" id="addUserManageButton" on:click={addUsersPopup}
							>ADD USERS</button
						>
					</dv>
				</div>
			</div>
			<div class="popuptext" id="popupadd" class:show={showPopupAdd}>
				<div class="popupTextGrid">
					<button class="closeButton" id="xButtona" on:click={closeAddUsersPopup}>x</button>
					<div>
						<input id="groupNamea" aria-label="Groupname" bind:value={groupName} />
					</div>
					<form>
						<div class="userContainer">
							{#if usersNotInTheGroup != null}
								{#each usersNotInTheGroup as theUser, i}
									<div class="userList">
										<input type="checkbox" id="userCheckboxa{i}" name="user{i}" />
										<label for="user{i}">{theUser}</label>
									</div>
								{/each}
							{/if}
						</div>
						<button class="createButton" id="addUsersButton" on:click={addUsersToGroup}
							>Add Selected Users</button
						>
					</form>
				</div>
			</div>
			<div class="popuptext" id="popupdelete" class:show={showPopupDelete}>
				Are you sure?
				<dv />
				<div class="buttondiv">
					<button
						class="yesbutton"
						id="deletegroupsurebutton"
						on:click={() => {
							deleteGroup(groupName);
						}}>YES</button
					>
					<button class="cancelbutton" id="cancelButton" on:click={deleteGroupPopup}>CANCEL</button>
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
									deleteGroupPopup(group);
								}}
								aria-label="Delete Group">Delete</button
							>
							<button
								id="manageButton{i}"
								type="button"
								class="mbutton"
								on:click={() => {
									manageGroupsPopup(group);
								}}
								aria-label="Manage Group Button">Edit</button
							></span
						>
					</div>
				{/each}
			{/if}
		</div>
	</div>
</div>

<style>
	.buttondiv {
		position: relative;
	}

	.cancelbutton {
		background-color: white;
		color: black;
		border-radius: 5px;
	}
	.yesbutton {
		background-color: red;
		color: white;
		border-radius: 5px;
	}

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

	/* the container for the pop-up text/divs */
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
	/* The actual popup text and div styling */
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
