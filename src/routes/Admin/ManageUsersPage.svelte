
<svelte:head>
  <title>SVC HackLabs Manage Users Page</title>
</svelte:head>

<script lang='ts'>
  
import { element } from 'svelte/internal';

let showPopup = false
   async function editUser(user){
	alert("Merge with Lane's edit user page") //Will do with Lane in
	}

  async function delUser(user, userEmail){
	
	let confirmDelete = confirm("Are you sure to delete this user?");
        if (confirmDelete) {
			let response = await fetch (`/APIs/ManageUsersPage/delUser-${user}`)
			let response2 = await fetch (`/APIs/ManageUsersPage/DeleteUserBy-${userEmail}`)
			users = []
			setTimeout(getUsers, 100);
			alert("User successfully deleted.");
        } 
		else {

        }
	}

  async function newUser(){
		alert ("Page coming soon")
	}

	let users:Array<any> = []
	let userKeys:Array<any> = null
	
  async function getUsers(){
    let response = await fetch ('/APIs/ManageUsersPage/getUsers')
    let data = await response.json()
	if (data.status == 200) {
		userKeys = Object.keys(data.data) //fetched the key at second index
		for ( let i = 0; i < userKeys.length; i++){
			users.push(data.data[userKeys[i]])
		}
		users = users

		const count = userKeys.length

		}
	else {

	}
  } 

  let groups:Array<any> = []
  let groupKeys:Array<any> = null

  async function getGroups(){
	let response = await fetch ('/APIs/ManageUsersPage/getGroups')
	let data = await response.json()
	if (data.status == 200) {
		groupKeys = Object.keys(data.data) //fetched the key at second index
		for ( let i = 0; i < groupKeys.length; i++){
			groups.push(data.data[groupKeys[i]])	
		}
		groups = groups

		const count = groupKeys.length

		} 
	else {
		
	}
}
getUsers();
getGroups();

</script>


<div class="container">

  <div>
    <button id = "new_user_button" class="bigButton" on:click={newUser} aria-label="New User Button">New User</button>
  </div> 
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
			  <div class = "group">
				<div>{user.group}</div>
			  </div>
			<button id = "delUserButton{i}" type="button" class = "dbutton" 
            on:click={() => {
                delUser(userKeys[i], user.email) 
              }
            } 
              aria-label="Delete User Button">Delete User
            </button>

            <button id = "editUserButton{i}" type="button" class="ebutton" 
            on:click={()=>{
              editUser(userKeys[i]);
              }}
              aria-label="Edit User Button">Edit User
            </button>
        </div> 
      {/each}
    {/if}  
  </div>  

<!-- CSS -->
<style>
  .container { 
		margin-left: 22%;
		width: 1000px;
		text-align: center;
	}

	.fname { 
		color: var(--text-color);
		font-weight: 800;
		font-size: 1.5em;
		text-align: left;
		margin-left: 100px;
		/* margin-top: 3%; */
		position: absolute;
		}

	.lname { 
		color: var(--text-color);
		font-weight: 800;
		font-size: 1.5em;
		text-align: left;
		margin-left: 200px;
		position: absolute;
	}

	.group { 
		color: var(--text-color);
		font-weight: 800;
		font-size: 1.5em;
		text-align: left;
		margin-left: 400px;
		position: absolute;
	}
  .bigButton {
		color: white;
		background-color: var(--button-color);
		border-radius: 10px;
		min-height: 45px;
		margin: 0 auto;
		margin-bottom: 10px;
		margin-top: 10px;
		font-size: 1em;
	}
  .ebutton {
		color: black;
		background-color: white;
		border-radius: 10px;
		margin-left: 0px;
		margin-right: 0px;
		font-size: 1em;
	}
  .dbutton {
		color: white;
		background-color: red;
		border-radius: 10px;
		margin-left: 700px;
		font-size: 1em;
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
	.userdiv {
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
	.userspan {
		color: var(--text-color);
		font-weight: 800;
		font-size: 1.5em;
	}
</style>


