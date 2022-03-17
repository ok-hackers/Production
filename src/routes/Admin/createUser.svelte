<!--
    Author: Nate Fabian
    Date: 1/31/22
    Purpose: The Create Users page
	Create one or more users via form inputs or via a CSV file
-->
<script lang="ts">
	let singleFirstName;
	let singleLastName;
	let singleEmail;
	let singlePassword;
	let singleGroup;

	let groupArray: Array<any> = [];
	let groupNames: Array<string> = [];

	let CSVFile: HTMLInputElement;

	async function addSingle() {
		if (
			singleFirstName == undefined ||
			singleLastName == undefined ||
			singlePassword == undefined ||
			singleEmail == undefined ||
			singleGroup == undefined
		) {
			alert('please fill in all forms before submitting a new user');
			return;
		}

		let response = await fetch(
			`/APIs/ManageUsersPage/createUser-${singleFirstName}-${singleLastName}-${singleEmail}-${singlePassword}-${singleGroup}`
		);

		let data = await response.json();

		alert(data.data);
	}

	async function addFile() {
		let fileBlob = await convertFileToBlob(CSVFile);
		let fileReader = new FileReader();
		fileReader.readAsText(fileBlob);

		fileReader.onloadend = (e)=>{
			let data = e.target.result;
			let parsedUsers = parseToCSV(data);

			parsedUsers.forEach(async (item) => {
				let response = await fetch(
					`/APIs/ManageUsersPage/createUser-${item.Fname}-${item.Lname}-${item.email}-${item.password}-${item.group}`
				);
			});

			alert('User Created');
		}
	}

	function parseToCSV(data:any) {
		let lines = data.split(/\n/g);
		let parsedUsers = [];
		for (let i = 1; i < lines.length; i++) {
			let items = lines[i].split(',');
			
			let Fname = items[0].trim();
			let Lname = items[1].trim();
			let email = items[2].trim();
			let password = items[3].trim();
			let group = items[4].trim();

			parsedUsers.push({
				Fname,
				Lname,
				email,
				password,
				group
			});
		}

		return parsedUsers;
	}

	async function convertFileToBlob(fileObjecct): Promise<Blob> {
		let fileReader = new FileReader();
		let blobPromise = new Promise((resolve, reject) => {
			try {
				fileReader.onloadend = (e) => {
					let arrayBuffer = e.target.result;
					resolve(new Blob([arrayBuffer]));
				};
				fileReader.readAsArrayBuffer(fileObjecct.files[0]);
			} catch (e) {
				reject(e);
			}
		});
		//@ts-ignore
		return blobPromise;
	}

	async function populateGroups() {
		let response = await fetch(`/APIs/ManageGroups/getGroups`);
		let json = await response.json();

		if (json.status == 200) {
			groupNames = Object.keys(json.data);
			for (let i = 0; i < groupNames.length; i++) {
				groupArray.push(json.data[groupNames[i]]);
			}
			groupArray = groupArray;
		}
	}

	populateGroups();
</script>

<div class="container">
	<div class="finishButton Button"><a href="/Admin">Finish</a></div>
	<h1>Add User</h1>
	<div class="addUser">
		<div class="Inputs">
			<div id="FName">
				<p>First Name</p>
				<input class="textfield" type="text" bind:value={singleFirstName} id="singleFirstName" />
			</div>
			<div id="LName">
				<p>Last Name</p>
				<input class="textfield" type="text" bind:value={singleLastName} id="singleLastName"/>
			</div>
			<div id="Username">
				<p>Username</p>
				<input class="textfield" type="username" bind:value={singleEmail} id="singleEmail"/>
			</div>
			<div id="Password">
				<p>Password</p>
				<input
					class="textfield"
					type="password"
					name="singlePassword"
					id="singleUserPassword"
					bind:value={singlePassword}
				/>
			</div>
			<div id="Group">
				<p>Group(s)</p>
				<select name="GroupSelection" id="SingleGroupSelection" bind:value={singleGroup}>
					{#if groupArray != undefined}
						{#each groupArray as group, i}
							<option value={group.id}>{groupNames[i]}</option>
						{/each}
					{/if}
				</select>
			</div>
		</div>
		<div class="add"><button type="button" id="addSingle" on:click={addSingle}>Add</button></div>
	</div>
	<h1>Add Users</h1>
	<div class="addUsers">
		<div class="Inputs">
			<input type="file" id="CSVUpload" bind:this={CSVFile}>
		</div>
		<div class="addMany">
			<button type="button" id="addMany" on:click={addFile}>Add</button>
		</div>
	</div>
</div>

<style>
	p {
		font-size: 20px;
		margin-bottom: 5px;
	}
	#SingleGroupSelection {
		padding: 10px 0;
        font-size: 14px;
        border-radius: 8px;
        background:white;
        box-shadow: 0 0 3px rgb(0 0 0 / 18%), 0 3px 16px rgb(0 0 0 / 36%);
        border: 1px solid rgba(0,0,0,.12);
	}
	h1 {
		font-size: 18px;
		font-weight: lighter;
	}
	.container {
		widows: 100%;
		padding: 0 2em;
	}
	.addUser,
	.addUsers {
		background-color: var(--box-color);
		margin-bottom: 1em;
		padding: 1em;
		border-radius: 10px;
	}

	.Inputs {
		display: flex;
		justify-content: center;
		margin-bottom: 1em;
		gap: 1em;
		flex-wrap: wrap;
	}

	.finishButton {
		background-color: var(--button-color);
		border-radius: 10px;
		text-align: center;
		margin: auto;
		line-height: 40px;
		width: 110px;
		height: 40px;
		font-size: 14px;
	}

	.Button>a {
		color: white;
		text-decoration: none;
		font-size: 18px;
	}


	.Button>a:visited {
		color: white;
	}

	.add,.addMany {
		margin: 0 auto;
		width: max-content;
	}

	.add>button,.addMany>button {
		width: 110px;
		height: 40px;
		font-size: 14px;
		background-color: var(--button-color);
		border: none;
		color: white;
		border-radius: 8px;
	}
</style>
