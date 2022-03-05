<!-- Written by Jake Swick 
// This page is the availableLabs page on the website. This page is responsible for diplaying all of the labs on
// the screen and give the user access to  do or check grades for a lab. -->
<script lang="ts">
    import { goto } from "$app/navigation";

    let labs:Array<any> = null
    let searchQuery = null
    let labName = null
    let labStatus = null
    let labKeys:Array<any> = null
    let labArray:Array<any> = []
    let publishedLabs:Array<any> = []
    let unpublishedLabs:Array<any> = []

    //function will get the lab data for the user to view them
    async function grabLabData() { //used Lanes function as it does the same thing I would have written
        let response = await fetch('/APIs/Labs/getAllLabMetaData');
        let getAllLabMetaData = await response.json();        
        if (getAllLabMetaData.status == 200) {
                labKeys = Object.keys(getAllLabMetaData.data)
                for (let i = 0; i < labKeys.length; i++){
                    labArray.push(getAllLabMetaData.data[labKeys[i]])
                }
                labArray = labArray
            }
            else {
                alert('No labs available at this moment. Ask Dr. Serapiglia to upload some! :D');
            }
        labArray = labArray
        sortLabs()
    }
    grabLabData();

    //Takes all the labs and creates new arrays for them based on whether they are published or not
    async function sortLabs() {
        labArray = labArray
        for (let i = 0; i < labArray.length; i++){
            if (labArray[i].Published == 1) {
                publishedLabs.push(labKeys[i])
            }
            else {
                unpublishedLabs.push(labKeys[i])
            }
        }
        publishedLabs = publishedLabs
        unpublishedLabs = unpublishedLabs
    }

    function startLab(openLab) { 
     goto(`/User/openLab-${openLab}`) //page coming soon
    }

    function labResults(labPerformance) { 
     goto(`/User/progressReport-${labPerformance}`) //page coming soon
    }

    /* async function labStatus(status){
      if (status = 0){
        
      }
    } */

    //sorts labs based on search query
    function searchfunc() {
		labs = labs.sort((element1: string, element2: string) => {
			if (element1.includes(searchQuery)) {
				return -1;
			} 
      else if (element2.includes(searchQuery)) {
				return 1;
			} 
      else {
				return 0;
			}
		}
    );
	}
</script>

<main>
    <div id="main">
        <div class="searchBar">
            <input id="searchBar" placeholder="Lab Name" aria-label="Search Bar" bind:value={searchQuery} on:change={searchfunc}/>
        </div>
        <div class="grey"></div>
        <h1>Available Labs</h1>
        {#if publishedLabs != null}
        {#each publishedLabs as lab, i}
          <div class = "displayLabs">
            <h2 class="labName{i}">{lab}</h2>
            <button  on:click={() => {startLab(lab)}} class="button button--raised start" id="openLab{i}" name="openLab">Open Lab</button>
            <button on:click={() => {labResults(lab)}} class="button button--raised results" id="performanceResults{i}" name="performanceResults">Performance Report</button>
            <div class = "status">
              <!-- <div>{lab}</div> -->
              </div>
          </div> 
        {/each}
      {/if} 
    </div>
</main>

<style>
  .displayLabs {
        position: relative;
        border-radius: 8px;
        margin-left: auto;
        margin-right: auto;
        max-width: 95%;
        height: 70px;
        background-color: rgb(197, 196, 196);
        margin-bottom: 10px;
    }
  .searchBar {
        text-align: right;
        margin-right: 30px;
        margin-top: 15px;
    }
    h1 {
        color: #008000;
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
    #startLab {
        height: 50px;
        width: 120px;
        font-size: 15px;
        color: black;
        background-color: white;
        position: absolute;
        right: 10px;
        top: 10px;
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
    .results {
        height: 50px;
        width: 120px;
        font-size: 15px;
        color: black;
        background-color: white;
        position: absolute;
        right: 10px;
        top: 10px;
    }
    .grey {
        text-align: center;
        height: 60px;
        background-color: rgba(214, 214, 214) !important;
    }
    .status{
      left: 10px;
      top: 14px;
      
    }
</style>
