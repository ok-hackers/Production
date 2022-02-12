<script lang="ts">
	let name: string;
	let dueDate: Date;
	let description: string;
	let file: HTMLInputElement;
	let blobSource;

	async function next() {
		let vmFileBlob = await convertFileToBlob(file);

		let messageData = {
			Name: name,
			DueDate: dueDate,
			Description: description
		};

        let formData = new FormData();
        formData.append('JSON info', JSON.stringify(messageData));
        formData.append('raw file data', vmFileBlob);

		let response = await fetch('/APIs/Labs/postLabInfo', {
			method: 'POST',
			body: formData
		});

		let responseData = await response.json();
		console.log(responseData)
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
	<div class="MainContainer">
		<div>
			<p>Name</p>
			<input type="text" bind:value={name} />
		</div>
		<div>
			<p>Due Date</p>
			<input type="text" bind:value={dueDate} />
			<input type="date" bind:value={dueDate} />
		</div>
		<div>
			<p>Description</p>
			<input type="text" bind:value={description} />
		</div>
		<div>
			<input type="file" placeholder="Upload VM Image" bind:this={file} />
		</div>
		<div>
			<button type="button" on:click={next}>Next</button>
		</div>
		<img src={blobSource} alt="" />
	</div>
</main>

<style></style>
