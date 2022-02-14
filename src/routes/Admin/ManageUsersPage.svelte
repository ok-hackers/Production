
<svelte:head>
  <title>SVC HackLabs Manage Users Page</title>
</svelte:head>

<script lang='ts'>
  
  let usernames = null

   async function editUser(user){
		
	}
  async function delUser(user){
		//alert ("Are you sure you want to delete this user?");"
    let response = await fetch ('/APIs/ManageUsersPage/delUser-[UserName]')

    var proceed = confirm("Are you sure you want to delete this user");
      if (proceed) {
      
      } 
      else {
      
      }
   

	}
  let showPopup = false;

  async function newUser(user){
		showPopup = !showPopup
	}

  async function getUsers(){
    let response = await fetch ('/APIs/ManageUsersPage/getUsers')
    let data = await response.json()
    usernames = Object.keys(data.data)
    
  }
</script>

<div class="container">
 
  <div>
    <button type="button" class="bigButton" on:click={newUser} aria-label="New User Button">New User</button>
  </div> 
    {#if usernames != null}
      {#each usernames as user, i}
        <div class = "userdiv">
          <span class = "userspan"
            >{user}
            <button id = "editUserButton{i}" type="button" class="ebutton" 
            on:click={()=>{
              editUser(user);
              }}
              aria-label="Edit User Button">Edit User
            </button>
          
            <button id = "delUserButton{i}" type="button" class = "dbutton" 
            on:click={() => {
                delUser(user)
              }
            } 
              aria-label="Delete User Button">Delete User
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
						type="range"
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
		margin-left: 5px;
	}
  .dbutton {
		color: white;
		background-color: red;
		border-radius: 5px;
		margin-left: 1700px;
	}

</style>


