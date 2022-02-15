
<svelte:head>
  <title>SVC HackLabs Manage Users Page</title>
</svelte:head>

<script lang='ts'>
  
  import { goto } from '$app/navigation';
import { element } from 'svelte/internal';

let showPopup = false;
   async function editUser(user){
	showPopup = !showPopup
	}
  async function delUser(user){
		//alert ("Are you sure you want to delete this user?");"
    let response = await fetch ('/APIs/ManageUsersPage/delUser-[UserName]')

    /*var proceed = confirm("Are you sure you want to delete this user");
      if (proceed) {
      
      } 
      else {
      
      }
   */
	}



  async function newUser(){
		alert ("Are you sure you want to delete this user?")
	}

	let users:Array<any> = null

  async function getUsers(){
    let response = await fetch ('/APIs/ManageUsersPage/getUsers')
    let data = await response.json()
	if (data.status == 200) {
			users = Object.keys(data.data);
		} else {
			console.log('no users available');
			//change the page to say something
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
          <span class = "userspan">{user}
			
			<button id = "delUserButton{i}" type="button" class = "dbutton" 
            on:click={() => {
                delUser(user)
              }
            } 
              aria-label="Delete User Button">Delete User
            </button>

            <button id = "editUserButton{i}" type="button" class="ebutton" 
            on:click={()=>{
              editUser(user);
              }}
              aria-label="Edit User Button">Edit User
            </button>
          
        
        </div> 
      {/each}
    {/if}  
    <div class="popuptext" id="myPopup" class:show={showPopup}>
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
		</div>
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
		margin-left: 0px;
	}

	.show {
		display: block !important;
		-webkit-animation: fadeIn 1s;
		animation: fadeIn 1s;
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



</style>


