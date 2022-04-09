<script lang="ts">
	let groups: Array<any> = [];
	let groupObjects: Array<any> = [];
	let labKeys: Array<any> = [];
	let labArray: Array<any> = [];
	let users: Array<any> = [];
	let userKeys: Array<any> = [];
	let numOfGroups = 0;
	let numOfUsers = 0;
	let numOfGrades = 0;
	let numOfLabs = 0;

	async function getGroups() {
		let response = await fetch('/APIs/ManageGroups/getGroups');
		let data = await response.json();
		if (data.status == 200) {
			groups = Object.keys(data.data);
			for (let i = 0; i < groups.length; i++) {
				groupObjects.push(data.data[groups[i]]);
			}
		} else {
			console.log('no groups available');
		}
		numOfGroups = groupObjects.length;
	}

	async function grabLabData() {
		let response = await fetch('/APIs/Labs/getAllLabMetaData');
		let getAllLabMetaData = await response.json();
		if (getAllLabMetaData.status == 200) {
			labKeys = Object.keys(getAllLabMetaData.data);
			for (let i = 0; i < labKeys.length; i++) {
				labArray.push(getAllLabMetaData.data[labKeys[i]]);
			}
			labArray = labArray;
		} else {
			alert('No users available');
		}
		labArray = labArray;
		numOfLabs = labArray.length;
	}

	async function getUsers() {
		let response = await fetch('/APIs/ManageUsersPage/getUsers');
		let data = await response.json();
		if (data.status == 200) {
			userKeys = Object.keys(data.data); //fetched the key at second index
			for (let i = 0; i < userKeys.length; i++) {
				users.push(data.data[userKeys[i]]);
			}
			users = users;
		} else {
			alert('No users available');
		}
		numOfUsers = users.length;
	}

	getGroups();
	grabLabData();
	getUsers();
</script>

<main>
	<div id="marginfix" class="marginfix">&nbsp;</div>
	<div class="gridContainer">
		<div class="gridItem">
			<div>You have {numOfLabs} labs so far</div>
			<button class="button">
				<a id="NavigateLabs" href="/Admin/labs">Labs</a>
			</button>
		</div>
		<div class="gridItem">
			<div>{numOfGrades} submissions on the upcoming assignment</div>
			<button class="button">
				<a id="Grading" href="/Admin/evaluate">Grading</a>
			</button>
		</div>
		<div class="gridItem">
			<div>You've created {numOfUsers} users</div>
			<button class="button">
				<a id="ManageUsersPage" href="/Admin/manageUsersPage">Users</a>
			</button>
		</div>
		<div class="gridItem">
			<div>{numOfGroups} groups exist</div>
			<button class="button">
				<a id="ManageGroups" href="/Admin/managegroups">Groups</a>
			</button>
		</div>
	</div>
</main>

<style>
	.gridContainer {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-template-rows: 1fr 1fr;
		gap: 30px;
		text-align: center;
		margin-top: 25vh;
		margin-left: 15vw;
		margin-right: 15vw;
		justify-items: center;
	}
	.gridItem {
		color: black;
		background-color: rgb(197, 196, 196);
		border-radius: 10px;
		max-width: 40vh;
		width: 30vh;
		font-weight: bold;
		box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
	}

	.button {
		color: white !important;
		background-color: var(--button-color);
		font-weight: 5px;
		font-size:18px;
		margin-bottom: 3px;
		margin-top: 5px;
	}
	a:link, a:visited {
		color: white;
		text-decoration: none;
	}
	a:active {
  		color: blue;
		text-decoration: none;
	}
</style>
