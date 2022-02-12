<script lang="ts">
	import {page} from '$app/stores'	
	import { goto } from "$app/navigation";
	let workingLab = $page.params.labName;

	PrefilLabData();
	

	let name: string;
	let dueDate: Date;
	let description: string;
	let file: HTMLInputElement;

	async function next() {
		if (name == undefined || dueDate == undefined || description == undefined || file.value == '') {
			alert("please ensure that all fields are filled in");
			return
		}

		console.log(file.value)

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

	async function PrefilLabData() {
		let response = await fetch('/APIs/Labs/getAllLabMetaData');
		let getAllLabMetaData = await response.json();

		

		let labData = getAllLabMetaData.data[workingLab];

		name = labData.Name;
		dueDate = labData.DueDate;
		description = labData.Description;
	}
</script>

<main>
	<div class="MarginFix"></div>
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
				<input type="file" placeholder="Upload VM Image" bind:this={file} />
			</div>
			<div class="NextButton">
				<button class="button" type="button" on:click={next}>Next</button>
			</div>
		</div>
	</div>
</main>

<style>
	main {
		overflow: auto;
	}
	.MainContainer {
		max-width: 75%;
		margin: 2em auto 0em;
		background-color: darkgray;
		padding: 2em;
		border-radius: 10px;
	}

	.name, .dueDate, .description{
		width: 100%;
	}

	.BottomRow {
		margin-top: 1em;
		display: flex;
	}

	.NextButton {
		margin-left: auto;
	}

	.button {
		background-color: var(--button-color);
	}
</style>
