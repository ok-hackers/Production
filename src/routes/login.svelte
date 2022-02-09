<script lang='ts'>
  // import firebase tools from server side NPM to be packed up with webpack
  import { FirebaseApp, initializeApp } from "firebase/app";
  import { Analytics, getAnalytics } from "firebase/analytics";

  import { Auth, getAuth, signInWithEmailAndPassword, signOut, sendPasswordResetEmail, setPersistence, browserSessionPersistence } from "firebase/auth";
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";

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

  async function WhoIs() {
    console.log(auth.currentUser)
  }

  //function to bind to submit button
  async function SignIn() {
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

    //console.log(userCred.user);
    //console.log(auth.currentUser);
    //these two lines are equivalent only the userCred.user works in this function though outside of it use auth.currentUser to get the current signed in user
  }
</script>

<svelte:head>
  <title>SVC HackLabs Login Page</title>
  
  <link rel="stylesheet" href="/src/style.css">
  <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
  <script defer src="https://code.getmdl.io/1.1.3/material.min.js"></script>
</svelte:head>

<div class="login">
  <header class="grey">
    <div class="topBar">
      <div class="top">
        <a href="/"><h3>SVC Hack Labs</h3></a>
      </div>
    </div>
  </header>

  <main class="main">
    <div class="topBar" id='block'>

        <div class="buttons" id="loginblock">
          <br><br><br><br>
          <input bind:value={username} class="textfield" style="display:inline;width:auto;" type="text" id="email" name="email" placeholder="Email"/>
          <br>
          <input bind:value={password} class="textfield" style="display:inline;width:auto;" type="password" id="password" name="password" placeholder="Password"/>
          <br>
          <button on:click={SignIn} class="button button--raised" id="quickstart-sign-in" name="signin">Log-In</button>
          <br><br>
          <button on:click={WhoIs} class="button button--raised" id="whois" name="whois">Who Is User</button>
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
    display: block;
    margin: auto;
  }
  .topBar {
    max-width: 1024px;
    margin: auto;
  }
  h3 {
    color: green;
    font-weight:500 !important;
  }
  #loginblock {
    text-align: center;
  }
  #block {
    background-color: rgb(214, 214, 214);
  }
  #email {
    margin-bottom: 5px;
  }
  #quickstart-sign-in {
    margin-top: 15px;
  }
</style>
