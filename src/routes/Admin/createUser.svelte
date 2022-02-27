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
	<p>Add User</p>
	<div class="addUser">
		<div class="Inputs">
			<div id="FName">
				<p>First Name</p>
				<input type="text" bind:value={singleFirstName} id="singleFirstName" />
			</div>
			<div id="LName">
				<p>Last Name</p>
				<input type="text" bind:value={singleLastName} id="singleLastName"/>
			</div>
			<div id="Email">
				<p>Email</p>
				<input type="email" bind:value={singleEmail} id="singleEmail"/>
			</div>
			<div id="Password">
				<p>Password</p>
				<input
					type="password"
					name="singlePassword"
					id="singleUserPassword"
					bind:value={singlePassword}
				/>
			</div>
			<div id="Group">
				<p>Group</p>
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
	<p>Add Users</p>
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
		padding: 0.25em;
		border-radius: 10px;
		margin: 0 auto;
		width: max-content;
		font-size: 2em;
	}

	.Button>a {
		color: white;
		text-decoration: none;
	}


	.Button>a:visited {
		color: white;
	}

	.add,.addMany {
		margin: 0 auto;
		width: max-content;
	}

	.add>button,.addMany>button {
		font-size: 2em;
		background-color: var(--button-color);
		border-color: var(--button-color);
		color: white;
		border-radius: 10px;
	}
</style>
