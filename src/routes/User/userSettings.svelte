<!--
    Author: Lane Wilkerson, Josh Secrist
    Date: 2/08/22
    User settings page where the user can update name, see username and groups, and change password
	To-do: Get currentDBUser and currentUser from findUser() function to be accessible outside of the function
		   The input field for the user's name also starts with a space. Need to fix this. 
-->
<script lang='ts'>
	import { goto } from '$app/navigation';
	import { group } from 'console';

	import { FirebaseError } from 'firebase/app';
	import {
		getAuth,
		onAuthStateChanged,
		updatePassword,
		reauthenticateWithCredential,
		AuthCredential,
		signInWithEmailAndPassword
	} from 'firebase/auth';

	let userAuth = getAuth();
	let user = userAuth.currentUser;
	console.log(user.email)
	let fname = '';
	let lname = '';
	let password = '*******';
	let curPassword = '';
	let newPassword = '';
	let confirmPassword = '';
	$: full_name = fname + ' ' + lname;
	let showPopup = false;


	let currentDBUser
	let currentUser
	//Matches users in DB to the currently logged in user
	async function findUser(users){
		console.log(users)
		let i = 0
		while (userKeys[i] != null){
			if (users[i].email == user.email) {
				currentDBUser = userKeys[i]
				currentUser = users[i]
			}
			currentDBUser = currentDBUser
			currentUser = currentUser
			i += 1
		}
		console.log(currentDBUser)
		console.log(currentUser)
	}

	let users:Array<any> = []
	let userKeys:Array<any> = null
	//Grabs all user data from DB
	async function getUsers(){
		let response = await fetch ('/APIs/ManageUsersPage/getUsers')
		let data = await response.json()
		if (data.status == 200) {
			userKeys = Object.keys(data.data)
			for ( let i = 0; i < userKeys.length; i++){
				users.push(data.data[userKeys[i]])
			}
			users = users
			userKeys = userKeys
			}
		else {
			alert('No users available');
		}
		findUser(users);
  	}
	getUsers();

	//updates the name fields of the user in the DB
	//no inputs or outputs
	async function saveSettings() {
		currentDBUser = 'lanewilkerson' //Cannot access currentDBUser from findUser() function. Passing user here for POC.
		console.log(full_name)
		console.log(user.email)
		console.log(currentDBUser)

		if (full_name.includes(' ')) {
			let response = await fetch(`/APIs/ManageUsersPage/${full_name}-${user.email}-${currentDBUser}-${'AuthenticationToken'}`); //API call to update user's DB info
			alert("Your name has been changed. You're welcome");
		} else {
			alert(
				"Name must contain fistname followed by a space and then last name. Please don't include multiple spaces or a middle name. Thanks!"
			);
		}
	}

	//toggles the pop-up on the page
	//no inputs or outputs
	function popupfunc() {
		showPopup = !showPopup;
	}

	//changes the password of the user
	//no inputs or outputs
	async function changePassword(){
        if (newPassword == confirmPassword){
            updatePassword(user, newPassword).then(() => {
                alert('Your password has been updated')
            }).catch((error) => {
                var errorCode = error.code;
                console.log(error.code)
                if (errorCode == 'auth/weak-password') {
                    alert("Please choose a password with at least 6 characters.");
                } 
				else if (newPassword != confirmPassword) {
            		alert("Passwords do not match. Try again.")
        		}
				else if (newPassword && confirmPassword == "testing") {
					alert("You must choose a NEW password.")
				}
            });
        }
		popupfunc()
    }
</script>

<div class="container">
	<div>
		<button type="button" class="button" id="saveSettings" on:click={saveSettings} aria-label="Save Setting Button"
			>Save Settings</button
		>
	</div>
	<div class="content">
		<h2>
			Name: <input id="namefield" aria-label="Name Field" bind:value={full_name} />
			Username: <span class="text">{user.email}</span>
			Assigned Group(s): <span class="text">Groups Here</span>
		</h2>
		<h2 class="heading">
			Current Password: <span class="text">{password}</span>
		</h2>
		<div>
			<button
				id="changepwbutton1"
				type="button"
				class="button"
				aria-label="Change Password Button"
				on:click={popupfunc}
			>
				Change Password
			</button>
		</div>
		<div class="popuptext" id="myPopup" class:show={showPopup}>
			<div class="closePopup" id="closePopup">
				<button id="closePopup" class="closePopup" on:click={popupfunc}>X</button>
				<h1>Password:</h1> 
			</div>
			<div class="popupTextGrid">
				<div>
					<input
						id="curPassword"
						type="password"
						placeholder="Current Password"
						aria-label="Password Field"
						bind:value={curPassword}
					/>
				</div>
				<br>
				<div>
					<input
						id="newPassword"
						type="password"
						placeholder="New Password"
						aria-label="New Password Field"
						bind:value={newPassword}
					/>
				</div>
				<div>
					<input
						id="confirmPassword"
						placeholder="Confirm New Password"
						type="password"
						aria-label="Confirm New Password Field"
						bind:value={confirmPassword}
					/>
				</div>
			</div>
			<button id="changepwbutton2" class="button" on:click={changePassword}>Change Password</button>
		</div>
	</div>
</div>

<style>
	.closePopup {
		text-align: right;
		color: red;
	}
	h1 {
		text-align: left;
		font-weight:900;
		color: var(--text-color);
		font-size: 20px;
		margin-top: -20px;
	}
	#namefield {
		margin-right: 30px;
		height: 25px;
		border-radius: 8px;
		border: none;
	}
	.popup {
		position: relative;
		display: inline-block;
		cursor: pointer;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
		width: 100%;
	}

	/* The actual popup */
	.popuptext {
		display: none;
		background-color: var(--popup-color);
		color: var(--text-color);
		text-align: center;
		border-radius: 6px;
		padding: 1em;
		width: max-content;
		margin: 0 auto;
	}

	.popuptext input {
		border-radius: 8px;
		padding: 10px;
		margin-bottom: 5px;
	}

	.popupTextGrid {
		display: block;
		padding: 10px;
	}

	.show {
		display: block !important;
		-webkit-animation: fadeIn 1s;
		animation: fadeIn 1s;
	}

	/* Add animation (fade in the popup) */
	@-webkit-keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
	.content {
		margin-top: 5px;
		border-radius: 15px;
		min-height: 250px;
		padding: 30px;
		color: var(--text-color);
		background-color: var(--box-color);
	}
	.button {
		width: 175px;
		height: 35px;
		font-size: 14px;
		border-radius: 10px;
		margin-top: 2em;
		color: white;
		background-color: var(--button-color);
	}
	#changepwbutton1 {
		width: 125px;
		font-size: 11px;
	}
	.heading {
		padding-top: 50px;
	}
	.container {
		margin: 0 3em;
	}
	.text {
		color: black;
		margin-right: 30px;
	}
</style>
