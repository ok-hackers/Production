<!-- this code is my original code. Putting this here to have it up and then will continue working on it after.-->
<!-- This is the closest thing I can find to importing firebase-->
<script lang='ts'>
    import { FirebaseApp, initializeApp } from "firebase/app";
   // import { getAuth, updatePassword } from "firebase/auth";

   async function editUser(){
		
	}
  async function delUser(){
		
	}
</script>

<div class="container">
  <div>
    <button type="button" class="button" on:click={editUser} aria-label="Edit User Button">Edit User</button>
  </div> 
  <div>
    <button type="button" class="button" on:click={delUser} aria-label="Delete User Button">Delete User</button>
  </div>
</div>

<svelte:head>
  <title>SVC HackLabs Manage Users Page</title>

  
  <!-- <link rel="stylesheet" href="https://code.getmdl.io/1.1.3/material.orange-indigo.min.css"> -->
  <link rel="stylesheet" href="/src/style.css">
  <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
  <script defer src="https://code.getmdl.io/1.1.3/material.min.js"></script>

</svelte:head>
<!-- 
  <script>
  //This data is all dummy data. I do not know how to make the database usernames sync with my code. - Jake
	let fname1 = 'nate';
	let lname1 = 'fabian';
  let username1 = "nate.fabian@stvincent.edu";

  let fname2 = 'josh';
	let lname2 = 'secrist';
  let username2 = "joshua.secrist@stvincent.edu";
  
  let fname3 = 'jake';
	let lname3 = 'swick';
  let username3 = "jacob.swick@stvincent.edu";
	
  let fname4 = 'lane';
	let lname4 = 'wilkerson';
  let username4 = "lane.wilkerson@stvincent.edu";
	
  
  let group = 'None';
</script>

-->
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