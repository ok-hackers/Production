<!--
    Author: Nate Fabian
    Date: 1/31/22
    Purpose: Layout file to be applied to all pages under /Admin
-->

<script lang="ts">
    import {goto} from '$app/navigation';
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

    console.log(auth);

    import headerBar from '../../Comps/AdminHeaderBar.svelte';
    import HamburgerMenu from "../../Comps/AdminHamburgerMenu.svelte";
</script>

<div id="AdminHamburgerLayer">
    <div class="navContainer">
        <svelte:component this={headerBar} authSession={auth} />
        <!-- Root Navmenu will be here -->
    </div>
    <div id="ContentHolder">
        <svelte:component this={HamburgerMenu} authSession={auth} />
        <div id="SlotHolder">
            <slot></slot>
        </div>
    </div>
</div>

<style>
    .navContainer {
        height: auto;
        background-color: var(--box-color);
    }

    #ContentHolder {
        position: relative;
        height: 100%;
    }

    #SlotHolder {
        margin-left: 3em;
        min-height: calc(100vh - 3em);
    }
</style>