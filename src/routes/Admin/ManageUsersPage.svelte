<!-- this code is my original code. Putting this here to have it up and then will continue working on it after.-->
<!-- This is the closest thing I can find to importing firebase-->
<script lang='ts'>
  
  let usernames = null

   async function editUser(){
		
	}
  async function delUser(){
		//alert ("Are you sure you want to delete this user?");"

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
  <div>
    <button type="button" class="button" on:click={getUsers} aria-label="Edit User Button">Edit User</button>
  </div> 
  <div>
    <button type="button" class="button" on:click={delUser} aria-label="Delete User Button">Delete User</button>
  </div>
  <div>
    {#if usernames != null}
    {#each usernames as user}
       <div>
         {user}
        </div> 
    {/each}
    {/if}
  </div> 
</div>

<svelte:head>
  <title>SVC HackLabs Manage Users Page</title>

  
  <!-- <link rel="stylesheet" href="https://code.getmdl.io/1.1.3/material.orange-indigo.min.css"> -->
  <link rel="stylesheet" href="/src/style.css">
  <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
  <script defer src="https://code.getmdl.io/1.1.3/material.min.js"></script>

</svelte:head>


<!-- New User Button-->
<a href = "New_User_Page" aria-label = "New User" > NewUser </a> 

<!-- Edit User1-->
<a href = "Edit_User" aria-label = "Edit" > editUser </a> 

<!-- Delete User-->
<a href = "Delete_User" aria-label = "Delete" > delUser </a> 

<!-- hello-->


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