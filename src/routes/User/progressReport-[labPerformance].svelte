<!--
Author: Lane Wilkerson
Last Modified: 03/25/2022
Purpose: Student can view their performance on a lab after it is completed
-->

<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { getAuth, onAuthStateChanged, AuthCredential } from 'firebase/auth';

	let lab = $page.params.labPerformance;
	console.log(lab);
	let userAuth = getAuth();
	let user = userAuth.currentUser;
	//console.log(user.email)

	let currentDBUser;
	let currentUser;
    let status = ''
	//Matches users in DB to the currently logged in user
	async function findUser(users) {
		//console.log(users)
		let i = 0;
		while (userKeys[i] != null) {
			if (users[i].email == user.email) {
				currentDBUser = userKeys[i];
				currentUser = users[i];
			}
			currentDBUser = currentDBUser;
			currentUser = currentUser;
			i += 1;
		}
		console.log(currentDBUser);
		console.log(currentUser);
        if (currentUser['grades'][lab]['dateCompleted'] != undefined) {
            status = 'Complete'
        }
        else {
            status = 'Incomplete'
        }
	}

	let users: Array<any> = [];
	let userKeys: Array<any> = null;
	//Grabs all user data from DB
	async function getUsers() {
		let response = await fetch('/APIs/ManageUsersPage/getUsers');
		let data = await response.json();
		if (data.status == 200) {
			userKeys = Object.keys(data.data);
			for (let i = 0; i < userKeys.length; i++) {
				users.push(data.data[userKeys[i]]);
			}
			users = users;
			userKeys = userKeys;
		} else {
			alert('No users available');
		}
		findUser(users);
	}
	getUsers();

	//let name = await fetch (`/APIs/ManageUsersPage/delUser-${grabLabName}`) //lab name - appear at the top of the page
	let grade: string;
	let questionNumber: string; //question numbers
	let questions: Array<any> = null;
	let labStatus = null;
</script>

<main>
	<div id="main">
		<h1>{lab}</h1>
		<div class="grey">
			<div id="labStatus">
				<div>{status}</div>
			</div>
			<div id="grade">
                {#if currentUser != null}
                    <div>Grade: {currentUser['grades'][lab]['correct']}/{currentUser['grades'][lab]['total']}</div>
                {/if}
			</div>
		</div>
	</div>
</main>

<style>
	#labStatus {
		margin-top: 14px;
        margin-left: 2%;
		position: absolute;
		color: black;
		font-size: 22px;
	}
	#grade {
		margin-top: 14px;
		margin-left: 70%;
		position: absolute;
		color: black;
		font-size: 22px;
	}
	h1 {
		margin-top: 2em;
		text-align: center;
		color: #008000;
		font-size: 28px;
	}
	.grey {
		margin-top: 2em;
		margin-left: auto;
		margin-right: auto;
		max-width: 80%;
		background-color: var(--box-color);
		height: 50px;
		border-radius: 8px;
	}
</style>
