<!-- 
Author(s): Jake Swick, Lane Wilkerson
Date Created: 02/10/2022
Last Modified: 03/23/2022 
Purpose: Displays all users in the DB and allows the admin to either delete or edit any user
-->
<script lang='ts'>
	import { goto } from "$app/navigation"

	let searchQuery = null
	let users:Array<any> = []
	let userKeys:Array<any> = []
	let groups:Array<any> = []
  	let groupKeys:Array<any> = null
	let showPopupDelete = false

	//close the user popup Being used next sprint
   /*  function deleteUserPopup(user) {
        userKeys = user
		showPopupDelete = !showPopupDelete;
	} */

	//Passes the user that needs edited to the editUser page
	async function editUser(user) {
		goto(`/Admin/editUser-${user}`);
	}
	
	//Deletes the user from the realtime DB and Firebase Auth
	async function delUser(user, userEmail) {
		/* let response = await fetch(`/APIs/ManageUsersPage/delUser-${user}`);
		let response2 = await fetch(`/APIs/ManageUsersPage/DeleteUserBy-${userEmail}`);
		setTimeout(function() { ('User has been deleted'); }, 600);
		deleteUserPopup(userKeys);
		users = [];
		setTimeout(getUsers, 100); */
		let confirmDelete = confirm('Are you sure to delete this user?');
		if (confirmDelete) {
			let response = await fetch(`/APIs/ManageUsersPage/delUser-${user}`);
			let response2 = await fetch(`/APIs/ManageUsersPage/DeleteUserBy-${userEmail}`);
			users = [];
			setTimeout(getUsers, 100);
			alert('User has been deleted');
		} else {
		}
	}

	async function newUser(){
		goto('/Admin/createUser')
	}
	
	//Grabs all user data from DB
	async function getUsers(){
		let response = await fetch ('/APIs/ManageUsersPage/getUsers')
		let data = await response.json()
		if (data.status == 200) {
			userKeys = Object.keys(data.data)
			for ( let i = 0; i < userKeys.length; i++){
				users.push(data.data[userKeys[i]])
			}
			users = users
			}
		else {
			alert('No users available');
		}
  	}
	getUsers()

	//Grabs all user groups from the DB
	async function getGroups() {
		let response = await fetch('/APIs/ManageUsersPage/getGroups');
		let data = await response.json();
		if (data.status == 200) {
			groupKeys = Object.keys(data.data); //fetched the key at second index
			for (let i = 0; i < groupKeys.length; i++) {
				groups.push(data.data[groupKeys[i]]);
			}
			groups = groups;
		} else {
			alert('No groups available');
		}
	}
	getGroups();

	//Matches search with user last names and swaps the user to the top of the list
	async function sortfunc() {
		let i = 0
		while(i<users.length) {
			if (searchQuery.toLowerCase() == users[i].lname.toLowerCase()) {
				const tmp = users[0]
				const tmp2 = userKeys[0]
				users[0] = users[i]
				userKeys[0] = userKeys[i]
				users[i] = tmp
				userKeys[i] = tmp2
			}
			i++;
		}
	}
</script>

<main>
	<div id="main">
		<div>
			<div class="searchBar">
				<input id="searchBar" placeholder="Search User Last Name" aria-label="Search Bar" bind:value={searchQuery} on:change={sortfunc}/>
			</div>
			<div class="grey">
				<button on:click={newUser} class="button button--raised" id="newUserButton" name="New User Button">Add Users</button>
			</div>
		</div>
		<br><br>
       
		<!--Being saved for next sprint 
			<div class="popuptext" id="popupdelete" class:show={showPopupDelete}>
            <p>Are you sure you want to delete this user?</p>
            <br>
            <div class="buttondiv">
                <button
                    class="yesbutton"
                    id="deleteUserbutton"
                    on:click={() => {
                        {delUser(userKeys)}
                    }}>Yes</button
                >
                <button class="cancelbutton" id="cancelButton" on:click={deleteUserPopup}>Cancel</button>
            </div> 
        </div>-->
		<div class="container">
			{#if users != null}
			{#each users as user, i}
				<div class = "userdiv">
				<span class = "userspan">  
					<div class = "fname">
						<div>{user.fname}</div>
					</div>
					<div class = "lname">
						<div>{user.lname}</div>
					</div>
					<div class = "username">
						<div>{user.email}</div>
					</div> 
					<div class = "group">
					{#if user.group != undefined}
						<div>{user.group}</div>
					{/if}  
					{#if user.group == undefined}
						<div>None</div>
					{/if}  
					</div>
					<button id = "delUserButton{i}" type="button" class = "button button--raised delete" 
					on:click={() => {
						delUser(userKeys[i], user.email) 
					}
					} 
					aria-label="Delete User Button">Delete
					</button>

					<button id = "editUserButton{i}" type="button" class="button button--raised edit" 
					on:click={()=>{
					editUser(userKeys[i]);
					}}
					aria-label="Edit User Button">Edit
					</button>
				</div> 
			{/each}
			{/if}
		</div>  
	</div>  
</main>

<style>
	.delete {
        height: 30px;
        width: 120px;
        font-size: 15px;
        color: white;
        background-color: red;
        position: absolute;
        right: 140px;
        top: 17px;
    }
	.edit {
        height: 30px;
        width: 120px;
        font-size: 15px;
        color: white;
        background-color: var(--button-color);
        position: absolute;
        right: 10px;
        top: 17px;
    }
	#newUserButton {
		text-align: center;
        height: 50px;
        width: 160px;
        font-size: 18px;
	}
	.container {
		position: relative;
        border-radius: 8px;
        margin-left: auto;
        margin-right: auto;
        max-width: 80%;
        height: 50px;
        background-color: rgb(197, 196, 196);
        margin-bottom: 10px;
	}
	.fname {
		color: var(--text-color);
		font-size: 20px;
		font-size: 15px;
        position: absolute;
        left: 20px;
        top: 17px;
		text-align: center;
		word-break: normal;
	}
	.lname {
		color: var(--text-color);
		width: 20px;
		font-size: 20px;
		font-size: 15px;
        position: absolute;
        left: 100px;
        top: 17px;
		text-align: center;
		word-break: normal;
	}
	 .username {
		color: var(--text-color);
		width: 10px;
		font-size: 20px;
		font-size: 15px;
        position: absolute;
        left: 220px;
        top: 17px;
		text-align: center;
		word-break: normal;
		display: flex;
	} 
	.group {
		color: var(--text-color);
		font-size: 20px;
		width: 10px;
		font-size: 15px;
        position: absolute;
        left: 450px;
        top: 17px;
		text-align: center;
		word-break: normal;
	}

	.userdiv {
		/* this is the grey block behind the users */
		background-color: var(--box-color);
		margin-bottom: 5px;
		border-radius: 5px;
		line-height: 34px;
		min-height: 65px;
		text-align: center;
		vertical-align: auto;
		position: relative;
	}
	.userspan {
		/* this is how the users are displayed on the page with their font color, size and height. */
		color: var(--text-color);
		font-weight: 800;
		font-size: 1.5em;
	}
	.searchBar {
        text-align: right;
        margin-top: 10px;
        margin-right: 10%;
        border-radius: 8px;
    }
	.grey {
        text-align: center;
        height: 60px;
        background-color: rgba(214, 214, 214) !important;
    }
</style>
