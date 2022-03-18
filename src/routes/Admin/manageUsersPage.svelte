<!-- 
Author(s): Jake Swick, Lane Wilkerson
Date Created: 02/10/2022
Last Modified: 03/02/2022 
Purpose: Displays all users in the DB and allows the admin to either delete or edit any user
-->
<script lang='ts'>
	import { goto } from "$app/navigation"

	let searchQuery = null
	let users:Array<any> = []
	let userKeys:Array<any> = []
	let groups:Array<any> = []
  	let groupKeys:Array<any> = null
	let lNames:Array<any> = []

	//Passes the user that needs edited to the editUser page
   	async function editUser(user){
		goto(`/Admin/editUser-${user}`);
	}
	
	//Deletes the user from the realtime DB and Firebase Auth
  	async function delUser(user, userEmail){
		let confirmDelete = confirm("Are you sure to delete this user?");
		if (confirmDelete) {
			let response = await fetch (`/APIs/ManageUsersPage/delUser-${user}`)
			let response2 = await fetch (`/APIs/ManageUsersPage/DeleteUserBy-${userEmail}`)
			users = []
			setTimeout(getUsers, 100);
			alert("User has been deleted");
		} 
		else {
			alert("Unable to delete user")
		}
	}

	async function newUser(){
		alert ("Page coming soon")
	}
	
	//Grabs all user data from DB
	async function getUsers(){
		let response = await fetch ('/APIs/ManageUsersPage/getUsers')
		let data = await response.json()
		if (data.status == 200) {
			userKeys = Object.keys(data.data)
			for ( let i = 0; i < userKeys.length; i++){
				users.push(data.data[userKeys[i]])
				lNames[i] = users[i].lname 
			}
			users = users
			}
		else {
			alert('No users available');
		}
  	}
	getUsers()

	//Grabs all user groups from the DB
  	async function getGroups(){
		let response = await fetch ('/APIs/ManageUsersPage/getGroups')
		let data = await response.json()
		if (data.status == 200) {
			groupKeys = Object.keys(data.data) //fetched the key at second index
			for ( let i = 0; i < groupKeys.length; i++){
				groups.push(data.data[groupKeys[i]])	
			}
			groups = groups
		} 
		else {
			alert('No groups available');
		}
	}
	getGroups();

	function sortfunc() {
		console.log('sorting')
		//console.log(lNames)
		lNames = lNames.sort((element1: string, element2: string) => {
			/* console.log(users)
			console.log(userKeys) */
			if (element1.includes(searchQuery)) {
				console.log('1')
				return -1;
			} 
            else if (element2.includes(searchQuery)) {
				console.log('2')
				return 1;
			} 
            else {
				console.log('3')
				return 0;
			}
		}
    );
	}
</script>

<main>
	<div class="container">
		<div>
			<div class="searchBar">
				<input id="searchBar" placeholder="Search User Last Name" aria-label="Search Bar" bind:value={searchQuery} on:change={sortfunc}/>
			</div>
			<button id = "newUserButton" class="button button--raised" on:click={newUser} aria-label="New User Button">Add Users</button>
		</div> 
		{#if users != null}
		{#each users as user, i}
			<div class = "userdiv">
			<span class = "userspan">  
				<div class = "fname">
					<div>{user.fname}</div>
				</div>
				<div class = "lname">
					<!-- <div>{users[i].lname}</div> -->
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
				aria-label="Delete User Button">Delete User
				</button>

				<button id = "editUserButton{i}" type="button" class="button button--raised edit" 
				on:click={()=>{
				editUser(userKeys[i]);
				}}
				aria-label="Edit User Button">Edit User
				</button>
			</div> 
		{/each}
		{/if}  
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
        top: 10px;
    }
	.edit {
        height: 30px;
        width: 120px;
        font-size: 15px;
        color: black;
        background-color: white;
        position: absolute;
        right: 10px;
        top: 10px;
    }
	#newUserButton {
		margin-bottom: 20px;
		margin-top: 20px;
		height: 40px;
        width: 130px;
        font-size: 16px;
        color: white;
        background-color: var(--button-color);
	}
  	.container { 
		margin-left: 22%;
		width: 1000px;
		text-align: center;
	}
	.fname { 
		position: absolute;
        left: 4%;
        top: 14px;
        color: var(--text-color)
	}
	.lname { 
		position: absolute;
        left: 15%;
        top: 14px;
        color: var(--text-color)
	}
	.username { 
		position: absolute;
        left: 28%;
        top: 14px;
        color: var(--text-color)
	}
	.group { 
		position: absolute;
        left: 600px;
        top: 14px;
        color: var(--text-color)
	}

	.userdiv { /* this is the grey block behind the users */
		background-color: var(--box-color);
		margin-bottom: 5px;
		border-radius: 5px;
		min-height: 35px;
		text-align: center;
		margin-left: 5px;
		margin-right: 5px;
		padding-top: 12px;
		position: relative;
	}
	.userspan { /* this is how the users are displayed on the page with their font color, size and height. */
		color: var(--text-color);
		font-weight: 800;
		font-size: 1.5em;
	}
	.searchBar {
        text-align: right;
        margin-right: 30px;
        margin-top: 15px;
    }
</style>
