<script>
	let fname = 'josh';
	let lname = 'secrist';
	let username = 'joshua.secrist@stvincent.edu';
	let password = '*******';
	$: full_name = fname + ' ' + lname;
</script>

<html lang="en">
	<title>User settings page</title>
	<div class="container">
		<div>
			<button type="button" class="button">Save Settings</button>
		</div>
		<div class="content">
			<h2>
				Name:  <input bind:value={full_name}>
				Username: <span class="text">{username}</span>
			</h2>
			<h2 class="heading">
				Current Password: <span class="text">{password}</span>
			</h2>
			<div><a href="../"><button type="button" class="button">Change Password</button></a></div>
		</div>
	</div>
</html>

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
