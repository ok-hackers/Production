<!-- 
Author(s): Lane Wilkerson
Date Created: 02/08/2022
Last Modified: 02/08/2022
Purpose: Allows users to change their default password 
-->
<script lang='ts'>
    import { FirebaseApp, initializeApp } from "firebase/app";
    import { getAuth, updatePassword } from "firebase/auth";

    const firebaseConfig = {
    apiKey: 'AIzaSyAcQ8U9QmlK-Kdb94SPW1qdP8Kqu829GhE',
    authDomain: 'seniorprojectokhackers.firebaseapp.com',
    databaseURL: 'https://seniorprojectokhackers-default-rtdb.firebaseio.com/',
    projectId: 'seniorprojectokhackers',
    storageBucket: 'seniorprojectokhackers.appspot.com',
    messagingSenderId: '102482778593',
    appId: '1:102482778593:web:e77c7482eaeb592884daa0',
    measurementId: 'G-194TR6QGXY'
    };
  
    let app: FirebaseApp;
    app = initializeApp(firebaseConfig);
    const auth = getAuth();

    const user = auth.currentUser;

    //globals for form validation
    let password: string;
    let confirmPassword: string;

    //Changes the currently signed in user's default password
    async function SetupPassword(){
        if (password == confirmPassword && password != "testing"){
            updatePassword(user, password).then(() => {
                document.getElementById("changePassword").innerHTML = "Password Update Successful!";
            }).catch((error) => {
                var errorCode = error.code;
                console.log(error.code)
                if (errorCode == 'auth/weak-password') {
                    alert("Please choose a password with at least 6 characters.");
                } 
            });
        }
        else if (password != confirmPassword) {
            alert("Passwords do not match. Try again.")
        }
        else if (password && confirmPassword == "testing") {
            alert("You must choose a NEW password.")
        }
        //Password for my account is now "testing123" --Lane
    }
</script>

<svelte:head>
  <title>SVC HackLabs Login Page</title>
  
  <link rel="stylesheet" href="/src/style.css">
  <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
  <script defer src="https://code.getmdl.io/1.1.3/material.min.js"></script>
</svelte:head>

<main class="main">
  <div class="topBar" id='block'>
    <div class="buttons" id="initialPasswordBlock">
      <br><br><br><br>
      <h2 id="changePassword">Welcome to HackLabs! <br> Please Create a New Password.</h2>
      <br>
      <input bind:value={password} class="textfield" style="display:inline;width:auto;" type="password" id="password" name="password" placeholder="Password"/>
      <br/><br/>
      <input bind:value={confirmPassword} class="textfield" style="display:inline;width:auto;" type="password" id="confirmPassword" name="confirmPassword" placeholder="Confirm Password"/>
      <br/><br/>
      <button on:click={SetupPassword} class="button button--raised" id="change-password" name="changepassword">Change Password</button>
    </div>
  </div>
</main>

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
