<script lang="ts">
	//#region Firebase auth stuff
	import { initializeApp } from 'firebase/app';
	import { getAuth } from 'firebase/auth';

	const firebaseConfig = {
		apiKey: 'AIzaSyAcQ8U9QmlK-Kdb94SPW1qdP8Kqu829GhE',
		authDomain: 'seniorprojectokhackers.firebaseapp.com',
		databaseURL: 'https://seniorprojectokhackers-default-rtdb.firebaseio.com/',
		projectId: 'seniorprojectokhackers',
		storageBucket: 'seniorprojectokhackers.appspot.com',
		messagingSenderId: '102482778593',
		appId: '1:102482778593:web:e77c7482eaeb592884daa0',
		measurementId: 'G-194TR6QGXY'
	};

	let app = initializeApp(firebaseConfig);
	let auth = getAuth(app);
	//#endregion



	import type {Documentation, Question} from '../../Lib/DocumentationItems';
	import Quill from 'quill';
	import {page} from '$app/stores';
	let labName = $page.params.labName;

	let itemsDelta = Array<Question | Documentation>(); //data retrived from firebase
	let items:Array<string> = []; //the quill data from the items delta array
	let answerBlocks:Array<HTMLDivElement> = []; //
	let answerBreakPoints = [];
	let answerblocksByQuestion = [];
	let answerSubmitAnswers: Array<number> = [];

	let quillRenderer: HTMLDivElement;

	async function populateData() {
		let response = await fetch(`/APIs/Labs/getLabDocumentation-${labName}`);
		let json = await response.json();

		if (json.status == 200) {
			itemsDelta = json.data.DocumentData;
		} else {
			throw `json status is ${json.status}`; 
		}

		for (let i = 0; i < itemsDelta.length; i++) {
			let tempQuill = new Quill(quillRenderer);
			tempQuill.setContents(itemsDelta[i].data);
			items[i] = tempQuill.root.innerHTML;
		}
	}

	async function Submit() {
		console.clear();
		getAnswerBreakPoints();
		/*
		creates the answerblocks by question arrary using the break points just created
		*/
		answerblocksByQuestion = []; //clear before pushing
		for (let i = 0; i < answerBreakPoints.length - 1; i++) {
			answerblocksByQuestion.push(answerBlocks.slice(answerBreakPoints[i], answerBreakPoints[i+1]));
		}


		/*
		with the now 2d array created by the previous for loop we can look though and finally see what answers were checked for what questions
		*/
		answerSubmitAnswers = []; //clear array
		for (let i = 0; i < answerblocksByQuestion.length; i++) {
			for (let j = 0; j < answerblocksByQuestion[i].length; j++) {
				//console.log(`i:${i} and j:${j}, check? ${answerblocksByQuestion[i][j].querySelector('input').checked}`);
				if (answerblocksByQuestion[i][j].querySelector('input').checked) {
					answerSubmitAnswers[i] = j + 1;
					j = answerblocksByQuestion[i].length;
					continue;
				}
				if (j == answerblocksByQuestion[i].length - 1) {
					alert(`You must answer all questions, you have left question ${i + 1} empty`);
					return; //PANIC RETURN
				}
			}
		}

		let formData = new FormData();
		formData.set("UserName", auth.currentUser.email);
		formData.set("LabName", labName);
		formData.set("AnswersArray", JSON.stringify(answerSubmitAnswers));

		let response = await fetch(`/APIs/Labs/postLabAnswers`, {
			method: 'POST',
			body: formData
		});

		console.log(await response.json());
	}

	/*
	get the seperation points by questions
	takes the array of all of the questions in one and pushes the points into another array to be used to break out points
	*/
	function getAnswerBreakPoints() {
		let breakCounter = -1;
		answerBreakPoints = []; //clear array before push
		answerBreakPoints.push(0);
		for (let i = 0; i < itemsDelta.length; i++){
			if (itemsDelta[i].type == "Documentation") {
				continue;
			}

			for (let j = 0; j < (itemsDelta[i] as Question).answer.length; j++) {
				breakCounter += 1;
			}
			answerBreakPoints.push(breakCounter);
		}

	}

	/*
	increment counter for the each question answer blocks
	*/
	let answerIncrement = -1;
	function counter() {
		answerIncrement += 1;
		return answerIncrement;
	}

	populateData();
</script>

<div class="root">
	{#if items != undefined}
		{#each items as item, i}
			<div class="Block">
				<h2>
					{itemsDelta[i].type}
				</h2>
				<div class="QuillContent">
					{@html item}
				</div>
				{#if itemsDelta[i].type == "Question"}
				<div>
					{#each itemsDelta[i].answer as answer, j}
						{#if answer.data != ""}
							<div bind:this={answerBlocks[counter()]} class="answerRow">
								<div>
									{answer.data}
								</div>
								<input type="checkbox" />
							</div>
							{#if j < itemsDelta[i].answer.length - 2}
								 <hr>
							{/if}
						{/if}
					{/each}
				</div>
				{/if}
			</div>
		{/each}
	{/if}

	<button type="button" on:click={Submit}>DEBUG</button>

	<div class="quillRenderer" bind:this={quillRenderer}>

	</div>
</div>

<style>

	.root {
		padding: 2em;
	}
	.quillRenderer {
		display: none;
	}

	.QuillContent {
		max-width: 90vw;
		border: 1px solid black;
		padding: 1em;
		margin-bottom: 1em;
		border-radius: 0.5em;
	}

	.QuillContent :global(img) {
		max-width: 100%;
	}

	.Block {
		background-color: white;
		padding: 1em;
		border-radius: 0.5em;
		margin-bottom: 2em;
	}

	.Block > h2 {
		margin-bottom: 0.5em;
	}

	.answerRow {
		display: flex;
		font-size: 2em;
	}

	.answerRow > input {
		margin-left: auto;
		height: 2em;
		width: 2em;
	}
</style>