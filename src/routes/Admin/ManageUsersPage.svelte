<!-- this code is my original code. Putting this here to have it up and then will continue working on it after.-->
<!-- This is the closest thing I can find to importing firebase-->
<script lang='ts'>
  
  let usernames = null

   async function editUser(){
		
	}
  async function delUser(){
		//alert ("Are you sure you want to delete this user?");"
    let response = await fetch ('/APIs/ManageUsersPage/delUser-[UserName]')

    var proceed = confirm("Are you sure you want to delete this user");
      if (proceed) {
      
      } 
      else {
      
      }
   

	}

  async function newUser(){
		
	}

  async function getUsers(){
    let response = await fetch ('/APIs/ManageUsersPage/getUsers')
    let data = await response.json()
    usernames = Object.keys(data.data)
    
  }
</script>

<div class="container">
 
  <div>
    <button type="button" class="button" on:click={newUser} aria-label="New User Button">New User</button>
  </div> 
    {#if usernames != null}
      {#each usernames as user, i}
        <div class = "userdiv">
          <span class = "userspan"
            >{user}
            <button id = "editUserButton{i}" type="button" class="ebutton" 
            on:click={(user)=>{
              editUser(user);
              }}
              aria-label="Edit User Button">Edit User
            </button>
          
            <button id = "delUserButton{i}" type="button" class = "dbutton" 
            on:click={(user) => {
                delUser(user)
              }
            } 
              aria-label="Delete User Button">Delete User
            </button>
        
        </div> 
      {/each}
    {/if}
  </div> 


<svelte:head>
  <title>SVC HackLabs Manage Users Page</title>

  
  <!-- <link rel="stylesheet" href="https://code.getmdl.io/1.1.3/material.orange-indigo.min.css"> -->
  <link rel="stylesheet" href="/src/style.css">
  <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
  <script defer src="https://code.getmdl.io/1.1.3/material.min.js"></script>

</svelte:head>


<style>
  .topBar {
    max-width: 1024px;
    margin: auto;
  }
  #initialPasswordBlock {
    text-align: center;
  }
  #block {
    background-color: rgb(214, 214, 214);
  }
  h2 {
      color: green;
  }
  button {
      height: 40px;
  }
</style>
<!-- 
<div>
  <div class="popuptext" id="myPopup" class:show={showPopup}>
    <div class="popupTextGrid">
      <div>
        <input
          id="curPassword"
          type="password"
          placeholder="Current Password"
          aria-label="Password Field"
        />
      </div>
      <div>
        <input
          id="newPassword"
          type="password"
          placeholder="New Password"
          aria-label="New Password Field"
        />
      </div>
      <div>
        <input
          id="confirmPassword"
          placeholder="Confirm New Password"
          type="password"
          aria-label="Confirm New Password Field"
        />
      </div>
    </div>
  </div>
  {#if groups != null}
    {#each groups as group, i}
      <div class="groupdiv">
        <span class="groupspan"
          >{group}
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
-->