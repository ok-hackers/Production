<script>
    import {initializeApp} from 'firebase/app';
    import {getAuth} from 'firebase/auth'

    
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
    

    let user = "not logged in"

    if (auth.currentUser == null) {
        alert('you are not loged in')
    } else {
    user = auth.currentUser.email;

    console.log(auth.currentUser.email);
    }
</script>

<div>
	<div>Where would you like to go?</div>
	<div>you will not see this once bouncer is complete</div>
    <div>You are logged in as {user}</div>
    <div>
        <a href="/Admin">Admin</a>|<a href="/User">User</a>
    </div>
</div>
