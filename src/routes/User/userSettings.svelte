<script>
	import { goto } from '$app/navigation';

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
	let fname = 'josh';
	let lname = 'secrist';
	let username = 'joshua.secrist@stvincent.edu';
	let password = '*******';
	let DBUsername = 'jsecrist';
	let curPassword = '';
	let newPassword = '';
	let confirmPassword = '';
	$: full_name = fname + ' ' + lname;
	let showPopup = false;

	async function saveSettings() {
		//if (full_name = authNme) do this:
		if (full_name.includes(' ')) {
			let response = await fetch(
				`/APIs/UserSettings/${full_name}-${DBUsername}-${'AuthenticationToken'}`
			);
			alert("Your name has been changed. You're welcome");
		} else {
			alert(
				"Name must contain fistname followed by a space and then last name. Please don't include multiple spaces or a middle name. Thanks!"
			);
		}
	}

	function popupfunc() {
		showPopup = !showPopup;
	}

	async function changePassword() {
		if (newPassword == confirmPassword) {
			let usercred = await signInWithEmailAndPassword(userAuth, user.email, curPassword);
			updatePassword(user, newPassword)
				.then(() => {
					alert('Password Updated Successfully');
				})
				.catch((error) => {
					alert('Password failed to update, please log-in again and try again');
					goto('../login');
				});
		} else {
			alert('Passwords do not match');
		}
	}
</script>

<div class="container">
	<div>
		<button type="button" class="button" on:click={saveSettings} aria-label="Save Setting Button"
			>Save Settings</button
		>
	</div>
	<div class="content">
		<h2>
			Name: <input aria-label="Name Field" bind:value={full_name} />
			Username: <span class="text">{username}</span>
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
		border-radius: 4px;
		padding: 5px;
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
		padding-left: 25px;
		padding-right: 25px;
		padding-top: 10px;
		padding-bottom: 10px;
		border-radius: 10px;
		margin-top: 1em;
		color: white;
		background-color: var(--button-color);
	}
	.heading {
		padding-top: 50px;
	}
	.container {
		margin: 0 3em;
	}
	.text {
		color: black;
	}
	.invisible_line {
		height: 30px;
	}
</style>
