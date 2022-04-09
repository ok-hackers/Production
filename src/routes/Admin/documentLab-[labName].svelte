<!--
    Author: Nate Fabian
    Date: 2/12/22
    Purpose: Page for editing the lab documentation
-->
<script lang="ts">
	//#region Imports
	import type {
		Question as IQuestion,
		Documentation as IDocumentation
	} from '../../Lib/DocumentationItems';
	import { LabItem } from '../../Lib/DocumentationItems';
	import { page } from '$app/stores';
	import Question from '../../Comps/LabQuestion.svelte';
	import Documentation from '../../Comps/LabDocumentation.svelte';
	//#endregion
	let labName = $page.params.labName;

	//#region Draggable List manager
	import { dndzone } from 'svelte-dnd-action';
	import { goto } from '$app/navigation';

	//items array of questions and documentation
	let items: Array<IQuestion | IDocumentation> = [];

	//constants for draggable list
	let flipDuration = 300;

	//handle the drag over
	function handleDndConsider(e) {
		items = e.detail.items;
	}

	//handle the drop over
	function handleDndFinalize(e) {
		items = e.detail.items;
	}

	let ItemCounter = 0; //item counter for unique ID's
	//#endregion

	//#region List utility functions
	//add a question to the end of the array with default data
	function newQuestion() {
		ItemCounter++;
		items.push({
			type: LabItem.Question,
			id: ItemCounter,
			data: undefined,
			answer: [{ data: '', correct: false }]
		});
		items = items;
	}

	//add a documentation item to the end of the array with default data
	function newDocumentation() {
		ItemCounter++;
		items.push({ type: LabItem.Documentation, id: ItemCounter, data: undefined });
		items = items;
	}

	//post data and move to the next screen
	async function next() {
		let formData = new FormData();
		formData.set('LabDocumentation', JSON.stringify(items));
		formData.set('Lab Name', labName);

		let postRequest = {
			method: 'POST',
			body: formData
		};

		let response = await fetch('/APIs/Labs/postLabDocumentation', postRequest);

		goto(`/Admin/AdminLab-${labName}`);
	}

	async function save() {

		let formData = new FormData();
		formData.set('LabDocumentation', JSON.stringify(items));
		formData.set('Lab Name', labName);

		let postRequest = {
			method: 'POST',
			body: formData
		};

		let response = await fetch('/APIs/Labs/postLabDocumentation', postRequest);

		goto(`/Admin/`);
	}
	//#endregion

	//#region Documentation child functions
	//delete a given item from the array
	function deleteGivenItem(Item) {
		let index = items.findIndex((element) => {
			if (element.id == Item.id) {
				return true;
			} else {
				return false;
			}
		});

		items.splice(index, 1);
		items = items;
	}
	//#endregion

	//#region Populate any existing data
	//if the data existst populate it onto the page before continuing with editing
	async function populateData() {
		let response = await fetch(`/APIs/Labs/getLabDocumentation-${labName}`);
		let json = await response.json();
		if (json.status == 200 && json.data.DocumentData != undefined) {
			items = json.data.DocumentData;
			for (let i = 0; i < items.length; i++) {
				if (items[i].id > ItemCounter) {
					ItemCounter = items[i].id + 1;
				}
			}
		} else {
			items = [];
		}
	}

	populateData();
	//#endregion
</script>

<main>
	<!-- Controll Buttons -->
	<div class="buttonHolders">
		<button id="AddQuestion" on:click={newQuestion}>Add Question</button>
		<button id="AddDocumentation" on:click={newDocumentation}>Add Documentation</button>
	</div>
	<!-- Draggable area -->
	<div class="marginFix">&nbsp;</div>
	<div
		id="dragContainer"
		use:dndzone={{ items: items, flipDurationMs: flipDuration }}
		on:consider={handleDndConsider}
		on:finalize={handleDndFinalize}
	>
		{#if items != []}
			<!-- content here -->
			{#each items as Block (Block.id)}
				{#if Block.type == LabItem.Question}
					<Question
						QuestionData={Block}
						deleteFunction={() => {
							deleteGivenItem(Block);
						}}
					/>
				{:else if Block.type == LabItem.Documentation}
					<Documentation
						DocumentationData={Block}
						deleteFunction={() => {
							deleteGivenItem(Block);
						}}
					/>
				{:else}
					<div>unknown block type {Block.type} please panic</div>
				{/if}
			{/each}
		{/if}
	</div>
	<div class="next" on:click={next}>Next</div>
	<div class="save" on:click={save}>Save</div>
</main>

<style>
	#dragContainer {
		min-height: 80vh;
		overflow-y: scroll;
		max-height: calc(100vh - 7em);
		margin-top: 2em;
	}

	.buttonHolders {
		position: absolute;
		top: 1em;
		left: 1em;
		z-index: 100;
	}

	.buttonHolders > button {
		padding: 1em;
		background-color: var(--button-color);
		border: 0px;
		color: white;
		border-radius: 10px;
		cursor: pointer;
	}

	main {
		max-height: calc(100vh - 3em); /* screen height minus navbar */
		position: relative;
	}

	.next {
		position: absolute;
		bottom: 1em;
		right: 2%;
		background-color: var(--button-color);
		border-radius: 10px;
		padding: 1em;
		color: white;
		cursor: pointer;
	}

	.save {
		position: absolute;
		top: 1em;
		right: 2%;
		background-color: var(--button-color);
		border-radius: 10px;
		padding: 1em;
		color: white;
		cursor: pointer;
	}
</style>
