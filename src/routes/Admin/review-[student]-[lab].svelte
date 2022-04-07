<!--
Author: Lane Wilkerson
Last Modified: 03/25/2022
Purpose: Student can view their performance on a lab after it is completed
-->

<script lang="ts">
	import { page } from '$app/stores';
	import { getAuth, onAuthStateChanged, AuthCredential } from 'firebase/auth';

	let student = $page.params.student;
	let lab = $page.params.lab;

	console.log(student);
	console.log(lab);

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

	let reviewStudent;
	let currentReviewStudent;
	//Matches users in DB to the currently logged in user
	async function findUser(users) {
		//console.log(users)
		let i = 0;
		while (userKeys[i] != null) {
			if (users[i].email == student) {
				reviewStudent = userKeys[i];
				currentReviewStudent = users[i];
			}
			reviewStudent = reviewStudent;
			currentReviewStudent = currentReviewStudent;
			currentReviewStudent.fname = currentReviewStudent.fname
			currentReviewStudent.lname = currentReviewStudent.lname
			i += 1;
		}

		console.log(reviewStudent);
		console.log(currentReviewStudent);
		console.log(currentReviewStudent['grades'][lab].answersArray)

		getAnswers(currentReviewStudent);
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
	<div class="container">
		<div class="grey">
			{#if currentReviewStudent != null}
			<h1>Results for {currentReviewStudent.fname} {currentReviewStudent.lname}</h1>
			{/if}
			<div id="studentAnswers">
				<div id="questionNumber">
					<p>Question #</p>
					{#each questionNumbers as questionNumber, i}
						<div id="question">
							{questionNumber}
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
	</div>
</main>

<style>
	p {
		margin-bottom: 15px;
		font-weight: 400;
	}
	.container {
		padding: 2rem;
	}
	#answer, #question {
		text-align: center;
		margin-bottom: 15px;
	}
	#studentAnswers {
		display: flex;	
	}
	#questionNumber, #studentAnswer, #correctAnswer {
		margin-top: 10px;
		margin-right: auto;
        margin-left: auto;
		color: black;
		font-size: 22px;
	}
	h1 {
		margin-top: 2em;
		padding: 1.5em;
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
		height: auto;
		border-radius: 8px;
	}
</style>
