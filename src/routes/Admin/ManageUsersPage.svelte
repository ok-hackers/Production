
<svelte:head>
  <title>SVC HackLabs Manage Users Page</title>
</svelte:head>

<script lang='ts'>
  
import { element } from 'svelte/internal';

let showPopup = false
   async function editUser(user){
	alert("Merge with Lane's edit user page") //Will do with Lane in
	}
  async function delUser(user){

	let confirmDelete = confirm("Are you sure to delete this user?");
        if (confirmDelete) {
			let response = await fetch ('/APIs/ManageUsersPage/delUser-[UserName]') //Something happens here... check source file
          	alert("Action successfully executed");
        } else {
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
		//Object.entries(data.data).map(e => e[1])	//will come back to this
		
		
		userKeys = Object.keys(data.data) //fetched the key at second index
		for ( let i = 0; i < userKeys.length; i++){
			users.push(data.data[userKeys[i]])
		}
		users = users

		const count = userKeys.length

		} else {
			console.log('no users available');
		}
  } 


getUsers();

</script>


<div class="container">

  <div>
    <button type="button" class="bigButton" on:click={newUser} aria-label="New User Button">New User</button>
  </div> 
    {#if users != null}
      {#each users as user, i}
        <div class = "userdiv">
          <span class = "userspan">{user.fname} {user.lname} {user.group}
			
			<button id = "delUserButton{i}" type="button" class = "dbutton" 
            on:click={() => {
                delUser(userKeys[i])
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
    <!-- <div class="popuptext" id="myPopup" class:show={showPopup}>
			<div class="popupTextGrid">
				<div>
					<input
						id="fname"
						type="text"
						placeholder="First Name"
						aria-label="First Name Field"
					/>
				</div>
        <div>
					<input
						id="lname"
						type="text"
						placeholder="Last Name"
						aria-label="Last Name Field"
					/>
				</div>
				<div>
					<input
						id="password"
						type="password"
						placeholder="Password"
						aria-label="Password Field"
					/>
				</div>
				<div>
					<input
						id="group"
						placeholder="Group"
						type="file"
						aria-label="Confirm New Password Field"
					/>
				</div>
			</div>
		</div>-->
  </div>  





<style>
  .container {
		width: auto;
		text-align: center;
	}

  .bigButton {
		color: white;
		background-color: var(--button-color);
		border-radius: 10px;
		min-height: 45px;
		margin: 0 auto;
		margin-bottom: 10px;
		margin-top: 10px;
	}
  .ebutton {
		color: black;
		background-color: white;
		border-radius: 5px;
		margin-left: 0px;
		margin-right: 100px;
	}
  .dbutton {
		color: white;
		background-color: red;
		border-radius: 5px;
		margin-left: 100px;
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
	}

	.userspan {
		color: var(--text-color);
		font-weight: 800;
		font-size: 10pt;
	}

	header{ 
		Margin: 10px;
		position: absolute;
	}
</style>


