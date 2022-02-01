<script lang='ts'>
  // import firebase tools from server side NPM to be packed up with webpack
  import { FirebaseApp, initializeApp } from "firebase/app";
  import { Analytics, getAnalytics } from "firebase/analytics";
  import { Auth, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
  //import { browser } from "$app/env"; // no longer needed 
  //import { onMount } from 'svelte';
  
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

  //define those firebase things if running in the browser
  //if (browser) {
    // Initialize Firebase
    app = initializeApp(firebaseConfig);
    analytics = getAnalytics(app);
    auth = getAuth(app);

    console.log(auth.currentUser);
  //}

  // onMount(async () => {
  //   let user
  //   user = onAuthStateChanged
  //   console.log("Initial User: " + user)
  //   if(user.auth){
  //     location.href = 'http://localhost:3000/login'
  //     console.log("New User: " + user)
  //   }
	// });

  async function WhoIs() {
    console.log(auth.currentUser)
  }
  function SignOut() {
    signOut(auth)
    location.href = 'http://localhost:3000/login';
  }
  //function to bind to submit button
  // async function SignIn() {
  //   console.log(username, password);
  //   let userCred
  //   try {
  //     userCred = await signInWithEmailAndPassword(auth, username, password);
  //   } catch (error) {
  //     console.log(error);
  //     var errorCode = error.code;
  //     console.log(error.code)
  //     var errorMessage = error.message;
  //     console.log(error.message)
  //     if (errorCode == 'auth/invalid-email') {
  //         alert("Invalid email address. Please enter a valid email.");
  //       } else if (errorCode == 'auth/user-not-found') {
  //         alert("User not found.");
  //       }
  //       else if (errorCode == 'auth/wrong-password') {
  //         alert("Wrong password. Please try again or click 'RESET PASSWORD'");
  //       }
  //       else if (errorCode == 'auth/missing-email') {
  //         alert("Please enter an email address");
  //       }
  //   }
  //   if (userCred != undefined){
  //     location.href = 'http://localhost:3000/homePage.svelte';
  //   }

  //   console.log(userCred.user);
  //   //console.log(auth.currentUser);
  //   //these two lines are equivalent only the userCred.user works in this function though outside of it use auth.currentUser to get the current signed in user
  // }
  </script>


<svelte:head>
  <title>SVC HackLabs Login Page</title>

  
  <!-- <link rel="stylesheet" href="https://code.getmdl.io/1.1.3/material.orange-indigo.min.css"> -->
  <link rel="stylesheet" href="/src/style.css">
  <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
  <script defer src="https://code.getmdl.io/1.1.3/material.min.js"></script>

</svelte:head>

<div class="demo-layout mdl-layout mdl-js-layout mdl-layout--fixed-header">
  <main class="mdl-layout__content mdl-color--grey-100">
    <div class="mdl-cell mdl-cell--12-col mdl-cell--12-col-tablet mdl-grid">

      <!-- Container for the demo -->
      <div class="mdl-card mdl-shadow--2dp mdl-cell mdl-cell--12-col mdl-cell--12-col-tablet mdl-cell--12-col-desktop">
        <div class="mdl-card__title mdl-color--grey-600 mdl-color-text--white"></div>
        <div class="mdl-card__supporting-text mdl-color-text--grey-600">
          <button on:click={SignOut} class="mdl-button mdl-js-button mdl-button--raised" id="quickstart-sign-out" name="signout">Sign Out</button>
          &nbsp;&nbsp;&nbsp;
          <button on:click={WhoIs} class="mdl-button mdl-js-button mdl-button--raised" id="quickstart-sign-in" name="signout">Who Is User</button>

          <!-- Container where we'll display the user details -->
          <div class="quickstart-user-details-container">
          </div>
        </div>
      </div>
    </div>
  </main>
</div>

<style>
  .mdl-card {
    overflow: visible;
  }
  .mdl-grid {
    max-width: 1024px;
    margin: auto;
  }
  .quickstart-user-details-container {
    margin-top: 20px;
    line-height: 25px;
  }
</style>