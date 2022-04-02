<!--
	Author: Nate Fabian
	Date: 2022-03-24
	Purpose: Get all the labs and create links to direct to the screen of all students for a lab
-->

<script lang="ts">
	let items: Array<any> = []; //Array of lab names derrived from delta
	let itemsDelta: Array<any> = []; //Array derived from the API call for lab data
	
	async function onLoad() {
	//#region Get all lab meta datums (using datums because josh told me to :0)
	let response = await fetch("/APIs/Labs/getAllLabMetaData");
	let json = await response.json();

	itemsDelta = json.data;
	items = Object.keys(itemsDelta);

	console.log(items)
	//#endregion
	}

	onLoad();
</script>

<div class="container">
	<h2>
		Student Labs and Results
	</h2>
	<div class="LabList">
	{#if items != []}
		{#each items as item, i}
			<div class="Lab">
				<div class="labName">{item}</div>
				<div class="LabLink">
					<!-- WHEN IT COMES TIME TO LINK ACCESS IT HERE UNDER itemsDelta[i] FOR ALL THE LAB DATA or item for the direct lab name as displayed -->
					<a href="#">Results</a>
				</div>
			</div>
		{/each}
	{/if}
	</div>
</div>

<style>
	.container {
		padding: 2rem;
	}

	.Lab {
		display: flex;
		padding: 1rem;
		background-color: var(--box-color);
		margin-top: 0.5rem;
		border-radius: 10px;
		align-items: center;
	}

	.labName {
		font-size: 2em;
	}

	.LabLink {
		margin-left: auto;
		background-color: white;
		border-radius: 10px;
		padding: 0.5em 2em;
	} 

	.LabLink>a {
		text-decoration: none;
		color: black;
	}

	.LabLink>a:hover {
		color: black;
	}

	.LabLink>a:visited {
		color: black;
	}
</style>