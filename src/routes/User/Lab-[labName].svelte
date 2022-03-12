<script lang="ts">
	import type {Documentation, Question} from '../../Lib/DocumentationItems';
	import Quill from 'quill';
	import {page} from '$app/stores';
	let labName = $page.params.labName;

	let itemsDelta = Array<Question | Documentation>();
	let items:Array<string> = [];
	let answerBlocks:Array<HTMLDivElement> = [];
	let answerBreakPoints = [];
	let answerblocksByQuestion = [];

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

	function DEBUG() {

		getAnswerBreakPoints();
		/*
		creates the answerblocks by question arrary using the break points just created
		*/
		for (let i = 0; i < answerBreakPoints.length - 1; i++) {
			answerblocksByQuestion.push(answerBlocks.slice(answerBreakPoints[i], answerBreakPoints[i+1]));
		}

		/*
		with the now 2d array created by the previous for loop we can look though and finally see what answers were checked for what questions
		*/
		for (let i = 0; i < answerblocksByQuestion.length; i++) {
			for (let j = 0; j < answerblocksByQuestion[i].length; j++) {
				console.log(`question ${i} answer ${j} is ${answerblocksByQuestion[i][j].querySelector('input').checked}`);
			}
		}
	}

	/*
	get the seperation points by questions
	takes the array of all of the questions in one and pushes the points into another array to be used to break out points
	*/
	let breakCounter = -1;
	function getAnswerBreakPoints() {
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

	let answerIncrement = -1;
	function counter() {
		answerIncrement += 1;
		return answerIncrement;
	}

	populateData();
</script>

<div>
	{#if items != undefined}
		{#each items as item, i}
			<div class="Block">
				<div class="QuillContent">
					{@html item}
				</div>
				{#if itemsDelta[i].type == "Question"}
				<div>
					{#each itemsDelta[i].answer as answer, j}
						{#if answer.data != ""}
							<div bind:this={answerBlocks[counter()]}>
								<div>
									{answer.data}
								</div>
								<input type="checkbox" />
							</div>
						{/if}
					{/each}
				</div>
				{/if}
			</div>
		{/each}
	{/if}

	<button type="button" on:click={DEBUG}>DEBUG</button>

	<div class="quillRenderer" bind:this={quillRenderer}>

	</div>
</div>

<style>
	.quillRenderer {
		display: none;
	}

	.QuillContent {
		max-width: 90vw;
	}

	.QuillContent :global(img) {
		max-width: 100%;
	}
</style>