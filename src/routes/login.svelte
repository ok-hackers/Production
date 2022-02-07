<script lang='ts'>
  // import firebase tools from server side NPM to be packed up with webpack
  import { FirebaseApp, initializeApp } from "firebase/app";
  import { Analytics, getAnalytics } from "firebase/analytics";

  import { Auth, getAuth, signInWithEmailAndPassword, signOut, sendPasswordResetEmail, setPersistence, browserSessionPersistence } from "firebase/auth";
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  // import { onMount } from 'svelte';

  //Firebase config
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

  //globals for form validation
  let username: string;
  let password: string;

  //global scope the firebase apps
  let app: FirebaseApp;
  let analytics: Analytics;
  let auth: Auth;

  // Initialize Firebase
  app = initializeApp(firebaseConfig);
  analytics = getAnalytics(app);
  auth = getAuth(app);


  console.log(auth);


  async function WhoIs() {
    console.log(auth.currentUser)
  }

  // function sendPasswordReset(){
  //   try {
  //     sendPasswordResetEmail(auth, username)
  //   } catch (error) {
  //     console.log(error)
  //     var errorCode = error.code
  //     if (errorCode == 'auth/user-not-found') {
  //         alert("User not found. Please enter a valid email.");
  //       }
  //   }
  // }

  //function to bind to submit button
  async function SignIn() {
    console.log(username, password);
    let userCred
    try {
      await setPersistence(auth, browserSessionPersistence);
      userCred = await signInWithEmailAndPassword(auth, username, password);
    } catch (error) {
      console.log(error);
      var errorCode = error.code;
      console.log(error.code)
      var errorMessage = error.message;
      console.log(error.message)
      if (errorCode == 'auth/invalid-email') {
          alert("Invalid email address. Please enter a valid email.");
        } else if (errorCode == 'auth/user-not-found') {
          alert("User not found.");
        }
        else if (errorCode == 'auth/wrong-password') {
          alert("Wrong password. Please try again.");
        }
        else if (errorCode == 'auth/missing-email') {
          alert("Please enter an email address");
        }
    }

    if (userCred != undefined){
      await goto('/Bouncer', {replaceState: true});
    }

    console.log(userCred.user);
    //console.log(auth.currentUser);
    //these two lines are equivalent only the userCred.user works in this function though outside of it use auth.currentUser to get the current signed in user
  }
  </script>


<svelte:head>
  <title>SVC HackLabs Login Page</title>
  
  <!-- <link rel="stylesheet" href="https://code.getmdl.io/1.1.3/material.orange-indigo.min.css"> -->
  <link rel="stylesheet" href="/src/style.css">
  <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
  <script defer src="https://code.getmdl.io/1.1.3/material.min.js"></script>
</svelte:head>

<div class="demo-layout mdl-layout mdl-js-layout mdl-layout--fixed-header">
  <!-- Lane please clean up this HTML the boot strap classes make it look like vomit -->
  <!-- Working on this -Lane -->
  <!-- Header section containing title -->
  <header class="mdl-layout__header mdl-color-text--white mdl-color--grey-700">
    <div class="mdl-cell mdl-cell--12-col mdl-cell--12-col-tablet mdl-grid">
      <div class="mdl-layout__header-row mdl-cell mdl-cell--12-col mdl-cell--12-col-tablet mdl-cell--8-col-desktop">
        <a href="/"><h3>SVC HackLabs</h3></a>
      </div>
    </div>
  </header>

  <main class="mdl-layout__content mdl-color--grey-100">
    <div class="mdl-cell mdl-cell--12-col mdl-cell--12-col-tablet mdl-grid">

      <!-- Container for the demo -->
      <div class="mdl-card mdl-shadow--2dp mdl-cell mdl-cell--12-col mdl-cell--12-col-tablet mdl-cell--12-col-desktop">
        <div class="mdl-card__title mdl-color--grey-600 mdl-color-text--white"></div>
        <div class="mdl-card__supporting-text mdl-color-text--grey-600">
          <!-- <p>Enter an email and password below to sign in</p> -->
          <input bind:value={username} class="mdl-textfield__input" style="display:inline;width:auto;" type="text" id="email" name="email" placeholder="Email"/>
          <br/><br/>
          <input bind:value={password} class="mdl-textfield__input" style="display:inline;width:auto;" type="password" id="password" name="password" placeholder="Password"/>
          <br/><br/>
          <button on:click={SignIn} class="mdl-button mdl-js-button mdl-button--raised" id="quickstart-sign-in" name="signin">Log-In</button>
          <br/><br/>
          <button on:click={WhoIs} class="mdl-button mdl-js-button mdl-button--raised" id="quickstart-sign-in" name="signout">Who Is User</button>
          &nbsp;&nbsp;&nbsp;
          <!-- <button on:click={sendPasswordReset} class="mdl-button mdl-js-button mdl-button--raised" id="quickstart-password-reset" name="verify-email">Reset Password</button> -->

          <!-- Container where we'll display the user details -->
          <div class="quickstart-user-details-container">
          </div>
        </div>
      </div>
    </div>
    {#if auth.currentUser != null}
       <!-- content here -->
       <div>
         You are currently {auth.currentUser.email}
       </div>
    {/if}
  </main>
</div>

<style>
  a {
    text-decoration: none;
  }
  .mdl-card {
    overflow: visible;
    background-color: #cacacac7;
  }
  .mdl-grid {
    max-width: 1024px;
    margin: auto;
  }
  .mdl-layout__header-row {
    padding: 0;
  }
  .quickstart-user-details-container {
    margin-top: 20px;
    line-height: 25px;
  }
  h3 {
    color: green;
  }
</style>