<script>
    import { goto } from '$app/navigation';
    import {initializeApp} from 'firebase/app';
    import {getAuth} from 'firebase/auth';

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

    let app = initializeApp(firebaseConfig);
    let auth = getAuth(app);

    if (auth.currentUser == null) {
      goto('/login');
    }


  import nav from '../../Comps/UserNavMenu.svelte';
</script>

<div>
  <svelte:component this={nav} SignedInUser={auth.currentUser.email}/>
  <slot><!-- optional fallback --></slot>
</div>
