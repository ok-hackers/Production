<!--
	Author: Nate Fabian
	Date: 2022-03-24
	Purpose: Get all the labs and create links to direct to the screen of all students for a lab
-->

<script lang="ts">
import { goto } from "$app/navigation";


	let labKeys:Array<any> = null
    let labArray:Array<any> = []

	async function grabLabData() {
        let response = await fetch('/APIs/Labs/getAllLabMetaData');
        let getAllLabMetaData = await response.json();
            if (getAllLabMetaData.status == 200) {
                labKeys = Object.keys(getAllLabMetaData.data)
                for ( let i = 0; i < labKeys.length; i++){
                    labArray.push(getAllLabMetaData.data[labKeys[i]])
                }
            }
            else {
                alert('No users available');
            }
		labKeys = labKeys
        labArray = labArray
		console.log(labArray)
		console.log(labKeys)
    }
    grabLabData();

	async function results(labID) {
		goto(`/Admin/labResults-${labID}`);
	}
</script>

<div class="container">
	<h2>
		Student Labs and Results
	</h2>
	<div class="LabList">
	{#if labKeys != null}
		{#each labKeys as lab, i}
			<div class="Lab">
				<div class="labName">{lab}</div>
				<button on:click={() => {results(labArray[i].ID)}} class="button button--raised edit" id="results{i}" name="results">Results</button>
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

	.edit {
		margin-left: auto;
		height: 30px;
		width: 120px;
		background-color: white;
		color: black;
		font-size: 15px;
		border-radius: 8px;
	}
</style>