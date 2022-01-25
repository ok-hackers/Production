<script lang='ts'>
  // import firebase tools from server side NPM to be packed up with webpack
  import { FirebaseApp, initializeApp } from "firebase/app";
  import { Analytics, getAnalytics } from "firebase/analytics";
  import { Auth, getAuth, signInWithEmailAndPassword } from "firebase/auth";
  import { browser } from "$app/env";

  //Firebase config
  const firebaseConfig = {
    apiKey: "AIzaSyAeCgaY0iesNwyugLaOMtYSSDb_41U2cWM",
    authDomain: "authentication-testing-f037f.firebaseapp.com",
    databaseURL: "https://authentication-testing-f037f-default-rtdb.firebaseio.com",
    projectId: "authentication-testing-f037f",
    storageBucket: "authentication-testing-f037f.appspot.com",
    messagingSenderId: "526339568679",
    appId: "1:526339568679:web:350fb085c8fd1a52110a02",
    measurementId: "G-HWQ3KV21YC"
  };

  //globals for form validation
  let username: string;
  let password: string;

  //global scope the firebase apps
  let app: FirebaseApp;
  let analytics: Analytics;
  let auth: Auth;

  //define those firebase things if running in the browser
  if (browser) {
    // Initialize Firebase
    app = initializeApp(firebaseConfig);
    analytics = getAnalytics(app);
    auth = getAuth(app);

    console.log(auth.currentUser);

    console.log("Hello World");
  }

  //function to bind to submit button
  async function SignIn() {
    console.log(username, password);
    let userCred
    try {
      userCred = await signInWithEmailAndPassword(auth, username, password);
    } catch (error) {
      console.log(error);
    }

    console.log(userCred.user);
    //console.log(auth.currentUser);
    //these two lines are equivalent only the userCred.user works in this function though outside of it use auth.currentUser to get the current signed in user
  }



    /**
     * Handles the sign in button press.
     */

    /* Burn the sin
    function toggleSignIn() {
      if (firebase.auth().currentUser) {
        firebase.auth().signOut();
      } else {
        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;
        if (email.length < 4) {
          alert('Please enter an email address.');
          return;
        }
        if (password.length < 4) {
          alert('Please enter a password.');
          return;
        }
        // Sign in with email and pass.
        firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          if (errorCode === 'auth/wrong-password') {
            alert('Wrong password.');
          } else {
            alert(errorMessage);
          }
          console.log(error);
          document.getElementById('quickstart-sign-in').disabled = false;
        });
      }
      document.getElementById('quickstart-sign-in').disabled = true;
    }

    function sendPasswordReset() {
      var email = document.getElementById('email').value;
      firebase.auth().sendPasswordResetEmail(email).then(function() {
        // Password Reset Email Sent!
        alert('Password Reset Email Sent!');
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode == 'auth/invalid-email') {
          alert(errorMessage);
        } else if (errorCode == 'auth/user-not-found') {
          alert(errorMessage);
        }
        console.log(error);
      });
    }
    /**
     * initApp handles setting up UI event listeners and registering Firebase auth listeners:
     *  - firebase.auth().onAuthStateChanged: This listener is called when the user is signed in or
     *    out, and that is where we update the UI.
     */

     /* and the imperials
    function initApp() {
      // Listening for auth state changes.
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          var displayName = user.displayName;
          //window.location = 'homePage.svelte';
          var email = user.email;
          var emailVerified = user.emailVerified;
          var photoURL = user.photoURL;
          var isAnonymous = user.isAnonymous;
          var uid = user.uid;
          var providerData = user.providerData;
          document.getElementById('quickstart-sign-in').textContent = 'Sign out';
          if (!emailVerified) {
            // document.getElementById('quickstart-verify-email').disabled = false;
          }
        } else {
          // User is signed out.
          document.getElementById('quickstart-sign-in').textContent = 'Sign in';
        }
        document.getElementById('quickstart-sign-in').disabled = false;
      });

      document.getElementById('quickstart-sign-in').addEventListener('click', toggleSignIn, false);
      document.getElementById('quickstart-password-reset').addEventListener('click', sendPasswordReset, false);
    }    

    */
  </script>


<svelte:head>
  <title>Email/Password Authentication Example</title>

  
  <link rel="stylesheet" href="https://code.getmdl.io/1.1.3/material.orange-indigo.min.css">
  <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
  <script defer src="https://code.getmdl.io/1.1.3/material.min.js"></script>


  <!-- Import and configure the Firebase SDK -->
  <!-- These scripts are made available when the app is served or deployed on Firebase Hosting -->
  <!-- If you do not serve/host your project using Firebase Hosting see https://firebase.google.com/docs/web/setup -->
  <!--
  <script src="/__/firebase/9.6.2/firebase-app-compat.js"></script>
  <script src="/__/firebase/9.6.2/firebase-auth-compat.js"></script>
  <script src="/__/firebase/init.js"></script>
  -->
  <!-- UNABLE TO GET INIT.JS TO WORK HERE. RECEIVING A 404 NOT FOUND ERROR. -->
</svelte:head>

<div class="demo-layout mdl-layout mdl-js-layout mdl-layout--fixed-header">
  <!-- Lane please clean up this HTML the boot strap classes make it look like vomit -->
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
          &nbsp;&nbsp;&nbsp;
          <input bind:value={password} class="mdl-textfield__input" style="display:inline;width:auto;" type="password" id="password" name="password" placeholder="Password"/>
          <br/><br/>
          <button on:click={SignIn} class="mdl-button mdl-js-button mdl-button--raised" id="quickstart-sign-in" name="signin">Sign In</button>
          &nbsp;&nbsp;&nbsp;
          <button class="mdl-button mdl-js-button mdl-button--raised" id="quickstart-password-reset" name="verify-email">Reset Password</button>

          <!-- Container where we'll display the user details -->
          <div class="quickstart-user-details-container">
            Sign-in status: <span id="quickstart-sign-in-status">Signed Out</span>
          </div>
        </div>
      </div>
    </div>
  </main>
</div>

<style>
  /*
   html, body {
    font-family: 'Roboto', 'Helvetica', sans-serif;
    background-color: #f5f5f5;
  }
  a {
    text-decoration: none;
  }
  li a {
    text-decoration: underline;
    color: #0288d1;
  }
  .mdl-card {
    overflow: visible;
  }
  .grecaptcha-logo {
    background-color: white;
  }
  .mdl-grid {
    max-width: 1024px;
    margin: auto;
  }
  .mdl-layout__header-row {
    padding: 0;
  }
  .quickstart-user-details-container, .user-details-container {
    margin-top: 20px;
    line-height: 25px;
  }
  #quickstart-sign-in-status, #sign-in-status, #quickstart-tenant-id {
    font-weight: bold;
  }
  pre {
    overflow-x: scroll;
    line-height: 18px;
  }
  code {
    white-space: pre-wrap;
    word-break: break-all;
  }
  h3 {
    color: white;
  }
  .close-icon {
    cursor: pointer;
    float: right;
    width: 20px;
  }
  .gcip-heading {
    background: none;
    padding-left: 10px;
  }
  #verification-code-form {
    display:none;
  }
  #recaptcha-container {
    margin-top: 10px;
    margin-bottom: 20px;
  }
  #verify-code-button, #cancel-verify-code-button {
    margin-left: 20px;
  }
  #sign-out-button {
    display: none;
  }
  #sign-in-card {
    z-index: 2;
  }
  .recaptcha-container {
    transform: scale(0.9);
    transform-origin:0 0;
    -webkit-transform:scale(0.9);
    -webkit-transform-origin:0 0;
  }
  .mfa-info-list-item {
    margin-bottom: 0px;
    margin-top: 0px;
    width: 300px;
  }
  .mdl-selectfield {
    height: 27px;
    padding-bottom: 20px;
    padding-top: 20px;
    width: 200px;
  }
  .mdl-selectfield__select {
    background:
      linear-gradient(45deg, transparent 50%, rgba(0,0,0, 0.26) 50%),
      linear-gradient(135deg, rgba(0,0,0, 0.26) 50%, transparent 50%),
      linear-gradient(to right, transparent, transparent);
    background-color: transparent;
    background-position:
      calc(100% - 10px) calc(1em - 4px),
      calc(100% - 5px) calc(1em - 4px),
      100% 0;
    background-repeat: no-repeat;
    background-size: 5px 5px, 5px 5px;
    border-color: rgba(0,0,0, 0.12);
    border-radius: 0;
    border-style: solid;
    border-width: 0 0 1px 0;
    box-shadow: none;
    box-sizing: border-box;
    height: 26px;
    line-height: 18px;
    margin: 0;
    outline: none !important;
    padding-bottom: 4px;
    padding-top: 4px;
    width: 100%;
    -moz-appearance:none;
    -moz-box-sizing: border-box;
    -webkit-appearance:none;
    -webkit-box-sizing: border-box;
  }
  .mdl-layout__header mdl-color-text--white mdl-color--light-blue-700 is-casting-shadow {
    background: grey;
  }
  .mdl-selectfield__label {
    color: rgba(0,0,0, 0.26);
    display: block;
    font-size: 16px;
    left: 0;
    overflow: hidden;
    pointer-events: none;
    position: relative;
    text-align: left;
    top: -23px;
    transition-duration: 0.2s;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    white-space: nowrap;
    width: 100%;
  }
  .mdl-selectfield__label.is-active {
    color: rgb(255,152,0);
    font-size: 12px;
    top: -40px;
  }
  .blinking{
    animation: blinkingText 1.2s infinite;
  }
  @keyframes blinkingText {
    0% { color: #ff0000; }
    49% { color: transparent; }
    50% { color: transparent; }
    99% { color: #ff0000; }
    100% { color: #ff0000; }
  }
  #quickstart-tenant-card {
    min-height: 500px;
  }
  #quickstart-tenant-modal-title {
    margin: 0px;
    padding: 2px;
    text-align: center;
  }

  */
</style>