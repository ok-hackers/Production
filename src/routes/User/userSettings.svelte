<script>
	let fname = 'josh';
	let lname = 'secrist';
	let username = 'joshua.secrist@stvincent.edu';
	let password = '*******';
	let DBUsername = "jsecrist";
	$: full_name = fname + ' ' + lname;
	
	async function saveSettings(){
		//if (full_name = authNme) do this:
		if (full_name.includes(" ")){
			let response = await fetch(`/APIs/UserSettings/${full_name}-${DBUsername}-${"AuthenticationToken"}`);
			alert("Your name has been changed. You're welcome");
		}
		else {
			alert("Name must contain fistname followed by a space and then last name. Please don't include multiple spaces or a middle name. Thanks!");
		}
	}

</script>

	<div class="container">
		<div>
			<button type="button" class="button" on:click={saveSettings} aria-label="Save Setting Button">Save Settings</button>
		</div>
		<div class="content">
			<h2>
				Name:  <input aria-label="Name Field" bind:value={full_name}>
				Username: <span class="text">{username}</span>
			</h2>
			<h2 class="heading">
				Current Password: <span class="text">{password}</span>
			</h2>
			<div><a href="../"><button type="button" class="button" aria-label="Change Password Button">Change Password</button></a></div>
		</div>
	</div>
<style>
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
</style>
