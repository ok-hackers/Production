<!--
    Author: Nate Fabian
    Date: 2/12/22
    Purpose: Edit lab meta data page. pulls in data from firebase about the given lab data and allows it to be edited and saved
-->

<script lang="ts">
	//#region imports and constants
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	let workingLab = $page.params.labName;
	let name: string;
	let dueDate: Date;
	let description: string;
	let file: HTMLInputElement;
	//#endregion

	//prefil the lab data on load
	PrefilLabData();

	//#region Control flow functions
	/*
	check for unfilled form elements, upload the data and move to the next page
	*/
	async function next() {
		if (name == undefined || dueDate == undefined || description == undefined) {
			alert('please ensure that all fields are filled in');
			return;
		}

		let vmFileBlob: Blob;
		if (file.value != '') {
			vmFileBlob = await convertFileToBlob(file);
		}

		let messageData = {
			Name: name,
			DueDate: dueDate,
			Description: description
		};

		let formData = new FormData();
		formData.append('JSON info', JSON.stringify(messageData));
		formData.append('raw file data', vmFileBlob);

		let response = await fetch('/APIs/Labs/postLabMetaData', {
			method: 'POST',
			body: formData
		});

		let responseData = await response.json();
		if (responseData.status == 200) {
			goto(`/Admin/documentLab-${name}`);
		} else {
			alert(responseData.message);
		}
	}

	/*
	Save and exit to come back later
	*/
	async function save() {
		if (name == undefined) {
			alert('to be able to save at least a lab name must be specified');
			return;
		}

		let vmFileBlob: Blob;
		if (file.value != '') {
			vmFileBlob = await convertFileToBlob(file);
		}

		let messageData = {
			Name: name,
			DueDate: dueDate,
			Description: description
		};

		let formData = new FormData();
		formData.append('JSON info', JSON.stringify(messageData));
		formData.append('raw file data', vmFileBlob);

		let response = await fetch('/APIs/Labs/postLabMetaData', {
			method: 'POST',
			body: formData
		});

		let responseData = await response.json();
		if (responseData.status == 200) {
			goto(`/Admin/`);
		} else {
			alert(responseData.message);
		}
	}
	//#endregion

	//#region Helper Functions
	/*
	Given a file object uploaded convert that file to a blob and return it as a promise
	*/
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

	/*
	if lab data exists for this specific lab prefil that data
	*/
	async function PrefilLabData() {
		let response = await fetch('/APIs/Labs/getAllLabMetaData');
		let getAllLabMetaData = await response.json();

		let labData = getAllLabMetaData.data[workingLab];

		name = labData.Name;
		dueDate = labData.DueDate;
		description = labData.Description;
	}
	//#endregion
</script>

<main>
	<div class="MarginFix" />
	<div class="MainContainer">
		<div class="DateInput">
			<p>Due Date</p>
			<input class="dueDate" type="date" bind:value={dueDate} />
		</div>
		<div>
			<p>Name</p>
			<input class="name" type="text" bind:value={name} />
		</div>
		<div>
			<p>Description</p>
			<textarea class="description" type="text" bind:value={description} />
		</div>
		<div class="BottomRow">
			<div>
				<input type="file" class="fileUpload" bind:this={file} />
				<div class="disclaimer">
					Please be aware changing the lab name will require a new lab image to be uploaded
				</div>
			</div>
			<div class="NextButton">
				<button id="Next" class="button" type="button" on:click={next}>Next</button>
			</div>
		</div>
	</div>
	<div class="saveButton button" on:click={save}>Save and exit</div>
</main>

<style>
	p {
		font-size: 20px;
		margin-top: 5px;
	}
	.disclaimer {
		font-size: 8pt;
	}
	.saveButton {
		top: 0em;

		right: 12%;

		right: 1em;
		height: 30px;
        width: 100px;
		font-size: 16px;
		text-align: center;
		position: absolute;
		cursor: pointer;
		line-height: 35px;
		width: 120px;
		height: 35px;
		background-color: var(--button-color);
	}
	main {
		overflow: auto;
	}
	.MainContainer {
		max-width: 75%;
		margin: 2.5em auto 0em;
		background-color: var(--box-color);
		padding: 2em;
		border-radius: 10px;
	}
	.name,
	.description {
		width: 100%;
		border-radius: 8px;
		border: none;
		height: 40px;
	}
	.DateInput {
		width: max-content;
	}
	.BottomRow {
		margin-top: 1em;
		display: flex;
	}
	.NextButton {
		margin-left: auto;
	}
</style>
