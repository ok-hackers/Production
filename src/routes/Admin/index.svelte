<script lang="ts">
	let numOfGroups = 0;
	let numOfUsers = 0;
	let numOfGrades = 0;
	let numOfLabs = 0;
</script>

<main>
	<div id="marginfix" class="marginfix">&nbsp;</div>
	<div class="gridContainer">
		<div class="gridItem">
			<div>You have {numOfLabs} labs so far</div>
			<button class="button">
				<a href="/Admin/labs">LABS<img src="/create-edit-lab.svg" /></a>
			</button>
		</div>
		<div class="gridItem">
			<div>You've got {numOfGrades} submissions on the upcoming assignment</div>
			<button class="button"> <a href="/Admin/grading">GRADING</a> </button>
		</div>
		<div class="gridItem">
			<div>You've created {numOfUsers} users</div>
			<button class="button"> <a href="/Admin/manageUsersPage">USERS</a> </button>
		</div>
		<div class="gridItem">
			<div>{numOfGroups} groups exist</div>
			<button class="button"> <a href="/Admin/managegroups">GROUPS</a> </button>
		</div>
	</div>
</main>

<style>
	.gridContainer {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-template-rows: 1fr 1fr;
		gap: 10px;
		text-align: center;
		margin-top: 40vh;
		margin-left: 15vw;
		margin-right: 15vw;
		justify-items: center;
	}
	.gridItem {
		color: black;
		background-color: gray;
		border-radius: 10px;
		max-width: 30vh;
		width: 25vh;
	}

	.button {
		color: white !important;
		background-color: var(--button-color);
	}
</style>
