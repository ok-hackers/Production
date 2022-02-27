<!-- Written by Jake Swick 
// This page is the manageUsersPage on the website. This page is responsible for diplaying all of the users on
// the screen and give the admin access to edit or delete them. The admin will also have access to create a new
// user on this page.
-->
<script lang='ts'> //language is in typescript
  
import { element } from 'svelte/internal'; //importing the svelte internal components

	let users:Array<any> = [] //array of users
	let userKeys:Array<any> = null //array of userKeys, which is the content of each user (username, fname, lname, group)


	// this function is where the edit User Button code will be thrown in. This function will open the edit user page 
   async function editUser(user){ 
	alert("Merge with Lane's edit user page") //Will do with Lane in
	}

	// this function is where the delete User button is. This function will ask the user to confirm they want to delete
	// a user. If they say yes, the function will do to response fetches to the two API files below. Each file will delete 
	// the user from both the database. If they say no, nothing will happen.
  async function delUser(fullUserName, userEmail){ 
	let confirmDelete = confirm("Are you sure to delete this user?");
        if (confirmDelete) {
			let response = await fetch (`/APIs/ManageUsersPage/delUser-${fullUserName}`) //deletes the user from realtime database
			let response2 = await fetch (`/APIs/ManageUsersPage/DeleteUserBy-${userEmail}`) //deletes the user from authentication by their email
			users = [] //the array of users diplayed on the list is updated
			setTimeout(getUsers, 100); //creates a delay for the process to take place
			alert("User successfully deleted.") //alerts the user that the user was deleted.
        } 
		else {}
	}

	// this function is where the add new User button is. This function does nothing yet other than an alert and will eventually 
	// redirect to the upcoming add users page
  async function newUser(){
		alert ("Page coming soon")
	}

	// this function is responsible for getting the users from the API file "getUsers". 
	// This function will call the other file and pull the list of users to this page
  async function getUsers(){
    let response = await fetch ('/APIs/ManageUsersPage/getUsers') 
    let data = await response.json() //Creates variable data to wait for the file response.json
	if (data.status == 200) { 
		userKeys = Object.keys(data.data) //fetches the key at second index
		for ( let i = 0; i < userKeys.length; i++){ //Gets the data of each user (userKeys) for each user
			users.push(data.data[userKeys[i]]) 
		}
		users = users //sets users equal to itself
		const count = userKeys.length 
		}
	else {} //do nothing
  } 

  //Switches over to get the groups for each user


  let groups:Array<any> = [] //array of groups by its value (0, 1, 2, etc...)
  let groupKeys:Array<any> = null ////array of groupKeys, which is the actual group name for each group

	// this function is responsible for getting the groups for each user from the API file "getGroups". 
	// This function will call the other file and pull the list of groups to this page
  async function getGroups(){
	let response = await fetch ('/APIs/ManageUsersPage/getGroups') 
	let data = await response.json() //Creates variable data to wait for the file response.json
	if (data.status == 200) { 
		groupKeys = Object.keys(data.data) 
		for ( let i = 0; i < groupKeys.length; i++){ //Gets the data of each group (groupKeys) for each user
			groups.push(data.data[groupKeys[i]])	
		}
		groups = groups //sets groups equal to itself
		const count = groupKeys.length
		} 
	else {} //do nothing
}

//Calls both functions to display the user data to the page
getUsers();
getGroups();
</script>

<!-- HTML -->

<!-- Container is the foundation for the entire page -->
<div class="container">

  <div>
	  <!-- Creates a button for adding a new user on the top of the page -->
    <button id = "new_user_button" class="bigButton" on:click={newUser} aria-label="New User Button">New User</button>
  </div> 
  
    {#if users != null} <!-- If there are not 0 users... -->
      {#each users as user, i} <!-- each block to do the following code for each individual user. Each user will have a fname, lname, and their group displayed on the screen -->
        <div class = "userdiv"> 
          <span class = "userspan">  
			  <div class = "fname">
				<div>{user.fname}</div>
			  </div>
			  <div class = "lname">
				<div>{user.lname}</div>
			  </div>
			  <div class = "group">
				<div>{user.group}</div>
			  </div>

			  <!-- Button for deleting a User. This will be for each user. When clicked, it will call userKeys and user.email used above -->
			<button id = "delUserButton{i}" type="button" class = "dbutton" on:click={() => {delUser(userKeys[i], user.email)}} aria-label="Delete User Button">Delete User</button>

			  <!-- Button for editing a User. This will be for each user. When clicked, it will call userKeys as used above -->
            <button id = "editUserButton{i}" type="button" class="ebutton" on:click={() => {editUser(userKeys[i])}} aria-label="Edit User Button">Edit User</button>
        </div> 
      {/each}
    {/if}  
  </div> 

<!-- CSS -->
<style>
  .container { /* setups margins and width for container class (the backbone of the entire page) */
		margin-left: 22%;
		width: 1000px;
		text-align: center;
	}

	.fname { /* setups how the first name will display on the page. it is aligned off of the left side */
		color: var(--text-color);
		font-weight: 800;
		font-size: 1.5em;
		text-align: left;
		margin-left: 100px;
		position: absolute;
	}

	.lname { /* setups how the first name will display on the page. it is aligned off of the left side */
		color: var(--text-color);
		font-weight: 800;
		font-size: 1.5em;
		text-align: left;
		margin-left: 200px;
		position: absolute;
	}
	.group { /* setups how the groups will display on the page. it is aligned off of the left side */
		color: var(--text-color);
		font-weight: 800;
		font-size: 1.5em;
		text-align: left;
		margin-left: 400px;
		position: absolute;
	}
  .bigButton { /* bigButton is the biggest button on the page. It is tied to addUser. It is centered at the top of the user list */
		color: white;
		background-color: var(--button-color);
		border-radius: 10px;
		min-height: 45px;
		margin: 0 auto;
		margin-bottom: 10px;
		margin-top: 10px;
		font-size: 1em;
	}

  .ebutton { /* this button is how the edit user button is setup. It is listed per user */
		color: black;
		background-color: white;
		border-radius: 10px;
		margin-left: 0px;
		margin-right: 0px;
		font-size: 1em;
	}

  .dbutton { /* this button is how the delete user button is setup. It is listed per user */
		color: white;
		background-color: red;
		border-radius: 10px;
		margin-left: 700px;
		font-size: 1em;
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
</style>
