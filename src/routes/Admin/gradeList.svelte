<!--
// Written by Jake Swick
// This page is written to display all lab results for a specific lab.
// Whatever lab is slected on the page before this, it will pull the results
// from the lab per student and display them here.
 -->

<script lang="ts">
    import { goto } from "$app/navigation"

    let complete:Array<any> = []
    let users:Array<any> = []
	let userKeys:Array<any> = []
    let gradeArray:Array<any> = []
    

//Grabs all user grade data from the DB
async function getUsers(){
		let response = await fetch ('/APIs/ManageUsersPage/getUsers')
		let data = await response.json()
		if (data.status == 200) {
			userKeys = Object.keys(data.data)
			for ( let i = 0; i < userKeys.length; i++){
				users.push(data.data[userKeys[i]])
			}
			users = users
			}
		else {
			alert('No users available');
		}
  	}
	getUsers()

    async function review(labName) {
        let response = await fetch(`/APIs/LabsPage/publishLab-${labName}`)
        setTimeout(function() { alert("Lab has been published"); }, 600);
    }
    async function sortGrades() {
        gradeArray = gradeArray
        for (let i = 0; i < gradeArray.length; i++){
            while (gradeArray[i].Published == 1) {
                complete.push(userKeys[i])
            }
        }
    }

</script>


<main>
    <div id="main">
        <div class="grey">
            <h4>Results for (input lab name later)</h4> 
            <!-- At the moment, ther Lab name cannot be pulled into this because the previous page does not exist yet. -->
        </div>
        {#if complete != null}
            {#each users as user, i}
            <div class = "displayResults">
                <!-- <h2 class="labName{i}">{lab}</h2> This code can be used on h4 line-->
                <span class = "userspan">  
                    <div class = "fname">
                        <div>{user.fname}</div>
                    </div>
                    <div class = "lname">
                        <!-- <div>{users[i].lname}</div> -->
                        <div>{user.lname}</div>
                    </div>
                    <div class = "grade">
                        {#if user.group != undefined}
                            <div>{user.grades}</div>
                        {/if}  
                        {#if user.group == undefined}
                            <div>None</div>
                        {/if}  
                    </div>
                <button on:click={() => {review(lab)}} class="button button--raised review" id="results{i}" name="review">Review</button>
            </div> 
            {/each}
        {/if} 
        <br><br>
    </div>
</main>

<style>
.displayResults {
        position: relative;
        border-radius: 8px;
        margin-left: auto;
        margin-right: auto;
        max-width: 95%;
        height: 70px;
        background-color: rgb(197, 196, 196);
        margin-bottom: 10px;
    }
    #incomplete {
        height: 30px;
        font-size: 15px;
        color: white;
        background-color: red;
        position: absolute;
        right: 140px;
        top: 10px;
    }
    /* #Category {
        color: #000000;
        font-size: 28px;
        text-align: center;
        margin-left: 15px;
        margin-bottom: 10px;
        font-weight: bold;
    } */
    h4 {
        color: #008000;
        font-size: 28px;
        text-align: center;
        margin-left: 15px;
        margin-bottom: 10px;
        font-weight: bold;
    }
  /*   h1 {
        color: #008000;
        font-size: 28px;
        text-align:left;
        margin-left: 15px;
        margin-bottom: 10px;
        font-weight: bold;
    } */
    h3 {
        color: red;
        font-size: 28px;
        text-align:left;
        margin-left: 15px;
        margin-bottom: 10px;
        font-weight: bold;
    }
    h2 {
        position: absolute;
        left: 10px;
        top: 14px;
        color: black;
    }
    .fname { 
		position: absolute;
        left: 4%;
        top: 25px;
        font-size: 20px;
        color: var(--text-color)
	}
	.lname { 
		position: absolute;
        left: 15%;
        top: 25px;
        font-size: 20px;
        color: var(--text-color)
	}
    .grade { 
		position: absolute;
        left: 50%;
        top: 25px;
        font-size: 20px;
        color: var(--text-color)
	}
    #performanceResults {
        height: 50px;
        font-size: 15px;
        color: white;
        background-color: red;
        position: absolute;
        right: 140px;
        top: 10px;
    }  
    .start {
        height: 50px;
        width: 120px;
        font-size: 15px;
        color: black;
        background-color: white;
        position: absolute;
        right: 140px;
        top: 10px;
    }  
    .grey {
        text-align: center;
        height: 100px;
        background-color: rgba(214, 214, 214) !important;
    }
    .status{
      left: 10px;
      top: 14px;
      
    }
    .review{
        height: 50px;
        width: 120px;
        font-size: 15px;
        color: rgb(255, 255, 255);
        background-color: 008000;
        position: absolute;
        right: 10px;
        top: 10px;
    }
</style>