<!--
    Author: Josh Secrist
    Date: 3/24/22
    Lab results page, takes in labID from the previous page
-->
<script lang="ts">
import { goto } from "$app/navigation";


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
		doneStudents = doneStudents;
		notDoneStudents = notDoneStudents;
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

	async function reviewResults(student, lab) {
		goto(`/Admin/review-${student}-${lab}`);
	}
	console.log(doneStudents);
</script>

<div class="container">
	{labName}
	<div class="studentContainer" id="doneContainer">
		<span class="sectionTitleDone">DONE</span>
		{#if doneStudents != []}
			{#each doneStudents as doneStudent, i}
				<div class="studentGrid">
					<span>
						NAME:
						{doneStudent.fname}
						{doneStudent.lname}
						<span class="scoreSpan">
							SCORE:
							{doneStudent.grades[labName].correct}/{doneStudent.grades[labName].total}
						</span>
						<button class="reviewButton" on:click={() => {
							reviewResults(doneStudent.email, labName) 
						}
						} >REVIEW</button>
					</span>
				</div>
			{/each}
		{/if}
	</div>
	<div class="studentContainer" id="notStartedContainer">
		<span class="sectionTitleIncomplete">INCOMPLETE</span>
		{#if notDoneStudents != []}
			{#each notDoneStudents as notDoneStudent, i}
				<div>
					<span>NAME: {notDoneStudent.fname} {notDoneStudent.lname}</span>
				</div>
			{/each}
		{/if}
	</div>
</div>

<style>
	.studentGrid {
		background-color: white;
		margin-left: 2vw;
		margin-right: 2vw;
	}

	.container {
		margin-left: 35vw;
	}

	.studentContainer {
		background-color: #bdbdbd;
		margin-bottom: 2vh;
		max-width: 25vw;
		border-radius: 10px;
	}

	.sectionTitleDone {
		color: var(--text-color);
	}

	.sectionTitleIncomplete {
		color: red;
	}

	.scoreSpan {
		margin-left: 1vw;
	}

	.reviewButton {
		margin-left: 5vw;
	}
</style>
