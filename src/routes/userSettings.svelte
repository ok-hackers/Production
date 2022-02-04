<script>
	let fname = 'josh';
	let lname = 'secrist';
	let username = 'joshua.secrist@stvincent.edu';
	let password = '*******';
	let DBUsername = 'jsecrist';
	let curPassword = "Current Password"
	let newPassword = "New Password"
	let confirmPassword = "Confirm Password"
	$: full_name = fname + ' ' + lname;

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
		var popup = document.getElementById('myPopup');
		popup.classList.toggle("show")
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
			<a href="../"
				><button type="button" class="button" aria-label="Change Password Button"
					>Change Password</button
				></a
			>
		</div>
	</div>
</div>

<div class="popup" on:click={popupfunc}>
	Click me to toggle the popup!
	<div class="popuptext" id="myPopup">
		<div>Current Password: <input type="password" aria-label="Password Field" bind:value={curPassword}/></div>
		<p class="invisible_line"></p>
		<div>New Password: <input type="password" aria-label="New Password Field"/></div>
		<div>Confirm New Password: <input type="password" aria-label="Confirm New Password Field"/></div>
		<button class="button">Change Password</button>
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
		width: 1750px;
	}


	/* The actual popup */
	.popup .popuptext {
		visibility: show;
		background-color: var(--popup-color);
		color: var(--text-color);
		text-align: center;
		border-radius: 6px;
		padding: 8px 0;
		position: absolute;
		z-index: 1;
		bottom: 125%;
		left: 50%;
		margin-left: -80px;
		width: 600px;
	}

	/* Popup arrow */
	.popup .popuptext::after {
		content: '';
		position: absolute;
		top: 100%;
		left: 50%;
		margin-left: -5px;
		border-width: 5px;
		border-style: solid;
		border-color: #555 transparent transparent transparent;
	}	
	.popup .show {
		visibility: visible;
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
		height: 250px;
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
