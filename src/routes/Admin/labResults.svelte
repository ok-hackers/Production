<!--
    Author: Josh Secrist
    Date: 3/24/22
    Lab results page, takes in labID from the previous page
-->
<script lang="ts">
	async function getLabInfo(labID) {
		let response = await fetch('/APIs/Labs/getAllLabMetaData');
		let data = await response.json();
		if (data.status == 200) {
			allLabs = Object.keys(data.data);
			for (let i = 0; i < allLabs.length; i++) {
				allLabObjects.push(data.data[allLabs[i]]);
			}
		} else {
			window.alert('Firebase connection unavailable');
		}
		for (let i = 0; i < allLabObjects.length; i++) {
			if (allLabObjects[i].ID == labID) {
				labName = allLabObjects[i].Name;
			}
		}
	}

	//calls API to fetch all users from the DB that have been assigned the lab
	//labID input
	async function getStudents(labID) {
		getLabInfo(labID);
		let response = await fetch('/APIs/ManageGroups/getGroups');
		let data = await response.json();
		if (data.status == 200) {
			allGroups = Object.keys(data.data);
			for (let i = 0; i < allGroups.length; i++) {
				allGroupObjects.push(data.data[allGroups[i]]);
			}
		} else {
			window.alert('Firebase connection unavailable');
		}
		for (let i = 0; i < allGroupObjects.length; i++) {
			if (allGroupObjects[i].labs != undefined) {
				for (let j = 0; j < allGroupObjects[i].labs.length; j++) {
					if (allGroupObjects[i].labs[j] == labID) {
						let userAPIResponse = await fetch(
							`/APIs/LabResults/getStudentsInAGroup-${allGroupObjects[i].id}`
						);
						let userData = await userAPIResponse.json();
						if (userData.status == 200) {
							allStudents = Object.keys(userData.data);
							for (let h = 0; h < allStudents.length; h++) {
								allStudentObjects.push(userData.data[allStudents[h]]);
							}
						} else {
							window.alert('Firebase connection unavailable');
						}
						allStudentObjects = allStudentObjects;
					}
				}
			}
		}
		separateDoneAndNotDone(allStudentObjects);
	}

	async function separateDoneAndNotDone(studentsInTheGroup: Array<any>) {
		console.log(studentsInTheGroup);
		for (let i = 0; i < studentsInTheGroup.length; i++) {
			if (studentsInTheGroup[i].grades != undefined) {
				if (studentsInTheGroup[i].grades[labName] != undefined) {
					doneStudents.push(studentsInTheGroup[i]);
				} else {
					notDoneStudents.push(studentsInTheGroup[i]);
				}
			}
		}
		console.log(doneStudents);
		console.log(notDoneStudents);
	}
	let labID = 9999;
	let labName = '';
	let allGroups: Array<any> = [];
	let allGroupObjects: Array<any> = [];
	let allStudents: Array<any> = [];
	let allStudentObjects: Array<any> = [];
	let allLabs: Array<any> = [];
	let allLabObjects: Array<any> = [];
	let doneStudents: Array<any> = [];
	let notDoneStudents: Array<any> = [];

	getStudents(labID);
</script>

<div class="container">
	{labName}
	<div class="studentContainer" id="doneContainer">
		{#if doneStudents != null}
			{#each doneStudents as doneStudent, i}
				<div>
					<span>
						<button>REVIEW</button>
					</span>
				</div>
			{/each}
		{/if}
	</div>
	<div class="studentContainer" id="notStartedContainer">
		{#if doneStudents != null}
			{#each notDoneStudents as notDoneStudent, i}
				<div>
					<span />
				</div>
			{/each}
		{/if}
	</div>
</div>

<style>
</style>
