<!--
Author: Lane Wilkerson
Last Modified: 03/25/2022
Purpose: Student can view their performance on a lab after it is completed
-->

<script lang="ts">
	import { page } from '$app/stores';
	import { getAuth, onAuthStateChanged, AuthCredential } from 'firebase/auth';

	let lab = $page.params.labPerformance;
	let userAuth = getAuth();
	let user = userAuth.currentUser;

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

	let currentDBUser;
	let currentUser;
    let status = ''
	let labStatus = undefined
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
			labStatus = labStatus
			i += 1;
		}

		console.log(currentDBUser);
		console.log(currentUser);

		console.log(currentUser['grades'][lab])

		if (currentUser['grades'][lab] == undefined) {
			console.log("Lab not yet started")
			labStatus = currentUser['grades'][lab]
			status = 'Incomplete'
			labStatus = labStatus
		}
        else if (currentUser['grades'][lab]['dateCompleted'] != undefined) {
			status = 'Complete'
			labStatus = currentUser['grades'][lab]
			labStatus = labStatus
		}
		getAnswers(currentUser)
	}

	let studentAnswers: Array<any> = [];
	let correctAnswers: Array<any> = [];
	let questionNumbers: Array<any> = [];
	async function getAnswers(currentReviewStudent) {
		for(let i=0; i<currentReviewStudent['grades'][lab].answersArray.length; i++) {
			correctAnswers.push(currentReviewStudent['grades'][lab].answersArray[i]['correctAnswer'])
			studentAnswers.push(currentReviewStudent['grades'][lab].answersArray[i]['userAnswer'])
			questionNumbers.push(i+1);
		}
		correctAnswers = correctAnswers
		studentAnswers = studentAnswers
		questionNumbers = questionNumbers
		console.log(correctAnswers)
		console.log(studentAnswers)
		console.log(questionNumbers)
	}
</script>

<main>
	<div id="main">
		<h1>{lab}</h1>
		<div class="grey">
			<div id="labStatus">
				<div>{status}</div>
			</div>
			<div id="grade">
				{#if labStatus != null}
					<div>Grade: {currentUser['grades'][lab]['correct']}/{currentUser['grades'][lab]['total']}</div>
				{/if}
			</div>
		</div>
		<div id="grey2">
			<div id="questionNumber">
				<p>Question #</p>
				{#each questionNumbers as questionNumber, i}
					<div id="question">
						{questionNumber+':'}
					</div>
				{/each}
			</div>
			<div id="studentAnswer">
				<p>Student Answer</p>
				{#each studentAnswers as studentAnswer, i}
					<div id="answer">
						{studentAnswer}
					</div>
				{/each}
			</div>
			<div id="correctAnswer">
				<p>Correct Answer</p>
				{#each correctAnswers as correctAnswer, i}
					<div id="answer">
						{correctAnswer}
					</div>
				{/each}
			</div>
		</div>
	</div>
</main>

<style>
	#answer, #question {
		text-align: center;
		margin-bottom: 15px;
	}
	p {
		margin-bottom: 15px;
		font-weight: 400;
	}
	#questionNumber, #studentAnswer, #correctAnswer {
		margin-top: 10px;
		margin-right: auto;
        margin-left: auto;
		color: black;
		font-size: 22px;
	}
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
		background-color: var(--box-color) !important;
		height: 50px;
		border-radius: 8px;
	}
	#grey2 {
		margin-top: 4em;
		margin-left: auto;
		margin-right: auto;
		max-width: 80%;
		background-color: var(--box-color);
		height: auto;
		border-radius: 8px;
		display: flex;
	}
</style>
