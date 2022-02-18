<script lang="ts">
	import { goto } from "$app/navigation";
    
    let labs:Array<any> = null
    let searchQuery = null;
    let labName = null;

    //deletes lab from DB, grabs updated lab data
    async function deleteLab(labName) {
		let response = await fetch(`/APIs/LabsPage/delLab-${labName}`);
		setTimeout(grabLabData, 100);
        setTimeout(function() { alert("Lab has been deleted"); }, 600);
	}

    async function grabLabData() {
        let response = await fetch('/APIs/Labs/getAllLabMetaData');
        let getAllLabMetaData = await response.json();
        
        labs = Object.keys(getAllLabMetaData.data);
    }
    grabLabData();

    function editLab(labName){
		goto(`/Admin/editLab-${labName}`);
    }

    function createLab(){
        goto('/Admin/createLab')
    }

    //sorts labs based on search query
    function searchfunc() {
		labs = labs.sort((element1: string, element2: string) => {
			if (element1.includes(searchQuery)) {
				return -1;
			} else if (element2.includes(searchQuery)) {
				return 1;
			} else {
				return 0;
			}
		});
	}
</script>

<main>
    <div id="main">
        <div class="searchBar">
            <input id="searchBar" placeholder="Lab Name" aria-label="Search Bar" bind:value={searchQuery} on:change={searchfunc}/>
        </div>
        <div class="grey">
            <button on:click={createLab} class="button button--raised" id="createLab" name="createLab">Create Lab</button>
        </div>
        <h1>Unpublished Labs</h1>
        {#if labs != null}
        {#each labs as lab, i}
          <div class = "displayLabs">
            <h2 class="labName{i}">{lab}</h2>
            <button  on:click={() => {deleteLab(lab)}} class="button button--raised delete" id="unpublishLab{i}" name="deleteLab">Delete Lab</button>
            <button on:click={() => {editLab(lab)}} class="button button--raised edit" id="editLab{i}" name="editLab">Edit Lab</button>
          </div> 
        {/each}
      {/if} 
    </div>
</main>

<style>
    h2 {
        position: absolute;
        left: 10px;
        top: 14px;
        color: #008000
    }
    .searchBar {
        text-align: right;
    }
    #B{
        border-radius: 8px;
        border: none;
        height: 22px;
        margin-right: 10px;
    }
    #createLab {
        text-align: center;
        height: 50px;
        width: 160px;
        font-size: 18px;
    }
    #editLab {
        height: 30px;
        width: 120px;
        font-size: 15px;
        color: black;
        background-color: white;
        position: absolute;
        right: 10px;
        top: 10px;
    }
    #unpublishLab {
        height: 30px;
        font-size: 15px;
        color: white;
        background-color: red;
        position: absolute;
        right: 140px;
        top: 10px;
    }
    .delete {
        height: 30px;
        width: 120px;
        font-size: 15px;
        color: white;
        background-color: red;
        position: absolute;
        right: 140px;
        top: 10px;
    }
    .edit {
        height: 30px;
        width: 120px;
        font-size: 15px;
        color: black;
        background-color: white;
        position: absolute;
        right: 10px;
        top: 10px;
    }
    h1 {
        color: #008000;
        font-size: 28px;
        text-align:left;
        margin-left: 15px;
        margin-bottom: 10px;
        font-weight: bold;
    }
    .displayLabs {
        position: relative;
        border-radius: 8px;
        margin-left: auto;
        margin-right: auto;
        max-width: 95%;
        height: 50px;
        background-color: rgb(197, 196, 196);
        margin-bottom: 10px;
    }
    .grey {
        text-align: center;
        height: 60px;
        background-color: rgba(214, 214, 214) !important;
    }
</style>