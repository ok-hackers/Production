<script lang="ts">
	import Quill from 'quill';
	import { onMount } from 'svelte';
	import type { Question } from '../Lib/DocumentationItems';
	export let Question: Question;
	let quillRenderer: HTMLDivElement;
	let QuillHTML: string;
	export let Answer: number;
	let answerBlocks = [];
	let answerRow: HTMLDivElement;

	onMount(() => {
		//#region Quill Renderer
		let tempQuill = new Quill(quillRenderer);
		tempQuill.setContents(Question.data);
		QuillHTML = tempQuill.root.innerHTML;
		//#endregion

		//#region clear answers
		let allInputs = answerRow.querySelectorAll('input');
		allInputs.forEach((input) => {
			input.checked = false;
		});
		//#endregion

		//#region Set bound answer for persistance
		if (Answer != -1 && Answer != undefined) {
			allInputs[Answer - 1].checked = true;
		}
		//#endregion
	});

	function updateAnswer() {
		let allInputs = answerRow.querySelectorAll('input');

		for (let i = 0; i < allInputs.length; i++) {
			if (allInputs[i].checked) {
				Answer = i + 1;

				return;
			}

			if (i == allInputs.length - 1) {
				Answer = -1;
			}
		}
	}
</script>

<div class="Block">
	<h2>
		{Question.type}
	</h2>
	<div class="QuillContent">
		{@html QuillHTML}
	</div>

	<div bind:this={answerRow}>
		{#if Question.answer != undefined}
			{#each Question.answer as answer, i}
				{#if answer.data != ''}
					<div class="answerRow">
						<div>
							{answer.data}
						</div>
						<input type="checkbox" id="checkbox" bind:this={answerBlocks[i]} on:change={updateAnswer} />
					</div>
					{#if i < Question.answer.length - 2}
						<hr />
					{/if}
				{/if}
			{/each}
		{/if}
	</div>

	<div class="quillRenderer" bind:this={quillRenderer} />
</div>

<style>
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
