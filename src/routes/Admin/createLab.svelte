<!--
    Author: Nate Fabian
    Date: 2/12/22
    Purpose: Create Lab meta data page. Collect information and lab image and send off to /APIs/Labs/postLabMetaData
-->
<script lang="ts">
	import { goto } from '$app/navigation';
	let name: string;
	let dueDate: string;
	let description: string;
	let file: HTMLInputElement;
	let currentDate = new Date();

	async function next() {
		let dueDateobj = new Date(dueDate);
		if (name == undefined || dueDate == undefined || description == undefined || file.value == '') {
			alert('please ensure that all fields are filled in');
			return;
		}

		if (dueDateobj <= currentDate) {
			alert('please make the due date sometime after today');
			return;
		}

		let vmFileBlob = await convertFileToBlob(file);
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
</script>

<main>
	<div class="MarginFix" />
	<div class="MainContainer">
		<div>
			<p>Name</p>
			<input class="name" type="text" bind:value={name} />
		</div>
		<div>
			<p>Due Date</p>
			<input class="dueDate" type="date" bind:value={dueDate} />
		</div>
		<div>
			<p>Description</p>
			<textarea class="description" type="text" bind:value={description} />
		</div>
		<div class="BottomRow">
			<div>
				<input type="file" class="fileUpload" bind:this={file} />
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
	.saveButton {
		top: 0em;
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
	.dueDate,
	.description {
		width: 100%;
		border-radius: 8px;
		border: none;
		height: 40px;
	}

	.BottomRow {
		margin-top: 1em;
		display: flex;
	}

	.NextButton {
		margin-left: auto;
	}
</style>
