<!--
    Author: Josh Secrist
    Date: 4/2/22
    Purpose: Admin can view the lab
-->
<script lang="ts">
	//#region Firebase Setup
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

	//#region Imports and globals
	import type {
		Question as IQuestion,
		Documentation as IDocumentation
	} from '../../Lib/DocumentationItems';
	import Documentation from '../../Comps/ViewDocumentation.svelte';
	import Question from '../../Comps/ViewQuestion.svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	let labName = $page.params.labName;

	let Items = Array<IQuestion | IDocumentation>(); //data retrivared from firebase
	let questionAnswers: Array<Number> = [];
	let submittedAnswer: Array<Number> = [];

	interface Page {
		page1: IQuestion | IDocumentation;
		page2: IQuestion | IDocumentation;
	}

	let pages: Array<Page> = [];

	//#endregion

	//#region Populate Data
	async function populateData() {
		let response = await fetch(`/APIs/Labs/getLabDocumentation-${labName}`);
		let json = await response.json();

		if (json.status == 200) {
			Items = json.data.DocumentData;
		} else {
			throw `json status is ${json.status}`;
		}

		for (let i = 0; i < Items.length; i++) {
			let tempPage: Page = { page1: null, page2: null };
			tempPage.page1 = Items[i];
			i++;
			if (i < Items.length) {
				tempPage.page2 = Items[i];
			}
			pages.push(tempPage);
		}

		pages = pages;
	}

	populateData();
	//#endregion

	//#region Scroller Functions
	let scroller = 0;

	function incScroller() {
		if (scroller < pages.length - 1) {
			scroller++;
		}
	}

	function decScroller() {
		if (scroller > 0) {
			scroller--;
		}
	}
	//#endregion

	//#region Submit Button and helper functions
	async function Submit() {
		goto(`/Admin/`);
	}

	function checkIfAllAnswered() {
		let questionCount: number = 0;
		for (let i = 0; i < Items.length; i++) {
			if (Items[i].type == 'Question') {
				questionCount += 1;
			}
		}

		if (questionCount == submittedAnswer.length) {
			return true;
		} else {
			return false;
		}
	}
	//#endregion

	//#region LaunchVM Script for jake to Handle
	function LaunchVM() {
		alert('NOT YET IMPLEMENTED 3/21/22');
	}
	//#endregion
</script>

<div class="root">
	<div class="LabControlls">
		<button on:click={LaunchVM}>LaunchVM</button>
		<button on:click={Submit} type="button" id="completeSetup">Complete Setup</button>
	</div>

	{#if pages.length != 0}
		<div class="scroller">
			<div>
				{#key scroller}
					{#if pages[scroller].page1.type == 'Documentation'}
						<svelte:component this={Documentation} bind:Documentation={pages[scroller].page1} />
					{:else if pages[scroller].page1.type == 'Question'}
						<svelte:component
							this={Question}
							bind:Question={pages[scroller].page1}
							bind:Answer={questionAnswers[scroller * 2 + 0]}
						/>
					{/if}
				{/key}
			</div>
			<div>
				{#key scroller}
					{#if pages[scroller].page2 != null}
						{#if pages[scroller].page2.type == 'Documentation'}
							<svelte:component this={Documentation} bind:Documentation={pages[scroller].page2} />
						{:else if pages[scroller].page2.type == 'Question'}
							<svelte:component
								this={Question}
								bind:Question={pages[scroller].page2}
								bind:Answer={questionAnswers[scroller * 2 + 1]}
							/>
						{/if}
					{/if}
				{/key}
			</div>
		</div>
	{/if}

	<div class="buttonController">
		<button type="button" id="backButton" on:click={decScroller}>Back</button>
		<button type="button" id="nextButton" on:click={incScroller}>Next</button>
	</div>
</div>

<style>
	.root {
		padding: 2em;
	}

	.LabControlls {
		display: flex;
		margin-bottom: 1em;
		justify-content: end;
		gap: 1em;
	}

	.buttonController {
		display: flex;
		justify-content: space-between;
	}

	button {
		font-size: 1.5em;
		color: white;
		background-color: var(--button-color);
		padding: 0.5em;
		border: 0px solid white;
		border-radius: 10px;
		cursor: pointer;
	}
</style>
