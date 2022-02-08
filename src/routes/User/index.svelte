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

</script>


<svelte:head>

  <title>SVC HackLabs Login Page</title>

</svelte:head>

<div class="homepage">
  <header class="grey">
    <div class="topBar">
      <div class="top">
	      <a href="/User/userSettings"> user settings page </a>
        <a href="/User/initialPassword"> initial password page </a>
      </div>
    </div>
  </header>
  
    <main class="main">
      <div class="topBar" id="block">
        <div class="buttons">
          <br>
          <button on:click={WhoIs} class="button button--raised" id="whois" name="whois">Who Is User</button>
        </div>
      </div>
    </main>
</div>

<style>
  a {
    text-decoration: none;
  }
  .topBar {
    max-width: 1024px;
    margin: auto;
  }
  #block {
    background-color: rgb(214, 214, 214);
  }
</style>
