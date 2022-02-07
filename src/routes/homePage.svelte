<script lang='ts'>
  // import firebase tools from server side NPM to be packed up with webpack
  import { FirebaseApp, initializeApp } from "firebase/app";
  import { Analytics, getAnalytics } from "firebase/analytics";
  import { Auth, getAuth, signOut } from "firebase/auth";

  
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

  //console.log(auth.currentUser);

  async function WhoIs() {
    console.log(auth.currentUser)
  }

  function SignOut() {
    signOut(auth)
    location.href = 'http://localhost:3000/login';
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
        <div class="align-right">
        <button on:click={SignOut} class="mdl-button mdl-js-button mdl-button--raised" id="quickstart-sign-out" name="signout">Sign Out</button>
        </div>
      </div>
    </div>
  </header>

  <main class="mdl-layout__content mdl-color--grey-100">
    <div class="mdl-cell mdl-cell--12-col mdl-cell--12-col-tablet mdl-grid">

      <!-- Container for the demo -->
      <div class="mdl-card mdl-shadow--2dp mdl-cell mdl-cell--12-col mdl-cell--12-col-tablet mdl-cell--12-col-desktop">
        <div class="mdl-card__title mdl-color--grey-600 mdl-color-text--white"></div>
        <div class="mdl-card__supporting-text mdl-color-text--grey-600">
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
  a {
    text-decoration: none;
  }
  .mdl-card {
    overflow: hidden;
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
  .align-right {
    display:      block;
    margin-left:  auto;
    margin-right: 0;
  }
</style>