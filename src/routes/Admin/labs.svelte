<!-- 
Author(s): Lane Wilkerson
Date Created: 02/15/2022
Last Modified: 02/17/2022
Function: Displays all labs in the database and allows the admin to edit or delete any lab
-->
<script lang="ts">
	//#region constants and imports
    import { goto } from "$app/navigation";
    
    let publishedLabs:Array<any> = []
    let unpublishedLabs:Array<any> = []
    let labs:Array<any> = null
    let searchQuery = null;
    let labName = null;
    let showPopupDelete = false;
    let delLab = null;
    //#endregion

    //close the lab popup
    function deleteLabPopup(lab) {
        labName = lab
		showPopupDelete = !showPopupDelete;
	}
    //Unpublishes lab from DB
    async function unpublishLab(labName) {
        let response = await fetch(`/APIs/LabsPage/unpublishLab-${labName}`)
        setTimeout(function() { alert("Lab has been unpublished"); }, 600);
    }

    //publish the lab 
    async function publishLab(labName) {
        let response = await fetch(`/APIs/LabsPage/publishLab-${labName}`)
        setTimeout(function() { alert("Lab has been published"); }, 600);
    }

    //Deletes lab from DB
    async function deleteLab(labName) {
		let response = await fetch(`/APIs/LabsPage/delLab-${labName}`);
        setTimeout(function() { alert("Lab has been deleted"); }, 600);
        deleteLabPopup(labName);
        publishedLabs = []
        unpublishedLabs = []
        labArray = []
        setTimeout(grabLabData, 100);
	}

    let labKeys:Array<any> = null
    let labArray:Array<any> = []

    //Grabs all lab data from the DB
    async function grabLabData() {
        let response = await fetch('/APIs/Labs/getAllLabMetaData');
        let getAllLabMetaData = await response.json();
            if (getAllLabMetaData.status == 200) {
                labKeys = Object.keys(getAllLabMetaData.data)
                for ( let i = 0; i < labKeys.length; i++){
                    labArray.push(getAllLabMetaData.data[labKeys[i]])
                }
                labArray = labArray
            }
            else {
                alert('No users available');
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


    //Sends lab data of the lab that needs edited to the editLab page
    async function editLab(labName){
        let response = await fetch(`/APIs/LabsPage/unpublishLab-${labName}`)
		goto(`/Admin/editLab-${labName}`);
    }

    //Transitions to createLab page
    function createLab(){
        goto('/Admin/createLab')
    }

    //Sorts labs based on search query
    function searchfunc() {
		unpublishedLabs = unpublishedLabs.sort((element1: string, element2: string) => {
			if (element1.toLowerCase().includes(searchQuery.toLowerCase())) {
				return -1;
			} else if (element2.toLowerCase().includes(searchQuery.toLowerCase())) {
				return 1;
			} else {
				return 0;
			}
		});
        publishedLabs = publishedLabs.sort((element1: string, element2: string) => {
			if (element1.toLowerCase().includes(searchQuery.toLowerCase())) {
				return -1;
			} else if (element2.toLowerCase().includes(searchQuery.toLowerCase())) {
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
            <button on:click={createLab} class="button" id="createLab" name="createLab">Create Lab</button>
        </div>
        <h1>Published Labs</h1>
        {#if publishedLabs != null}
            {#each publishedLabs as lab, i}
            <div class = "displayLabs">
                <h2 class="labName{i}">{lab}</h2>
                <button  on:click={() => {unpublishLab(lab)}} class="button delete" id="unpublishLab{i}" name="deleteLab">Unpublish Lab</button>
                <button on:click={() => {editLab(lab)}} class="button edit" id="editLab{i}" name="editLab">Edit Lab</button>
            </div> 
            {/each}
        {/if} 
        <br><br>
        <div class="popuptext" id="popupdelete" class:show={showPopupDelete}>
            <p>Are you sure you want to delete this lab?</p>
            <br>
            <div class="buttondiv">
                <button
                    class="yesbutton"
                    id="deleteLabbutton"
                    on:click={() => {
                        {deleteLab(labName)}
                    }}>Yes</button
                >
                <button class="cancelbutton" id="cancelButton" on:click={deleteLabPopup}>Cancel</button>
            </div>
        </div>
        <h1>Unpublished Labs</h1>
        {#if unpublishedLabs != null}
            {#each unpublishedLabs as lab, i}
            <div class = "displayLabs">
                <h2 class="labName{i}">{lab}</h2>
                <button on:click={() => {deleteLabPopup(lab)}} class="button button--raised delete" id="deleteLab{i}" name="deleteLab">Delete Lab</button>
                <button on:click={() => {editLab(lab)}} class="button button--raised edit" id="editLab{i}" name="editLab">Edit Lab</button>
                <button on:click={() => {publishLab(lab)}} class="button button--raised publish" id="publishLab{i}" name="publishLab">Publish Lab</button>
            </div> 
            {/each}
        {/if} 
    </div>
</main>

<style>
    #deleteLabbutton, #cancelButton {
        width: 110px;
        height: 30px;
        border-radius: 8px;
        border: none
    }
    #deleteLabbutton {
        color: white;
        background-color: red;
    }
    #cancelButton {
        color: black;
        background-color: lightgray;
    }
    p {
        font-weight: bold;
        font-size: 24px;
    }
    .show {
		display: block !important;
		-webkit-animation: fadeIn 1s;
		animation: fadeIn 1s;
	}
    .popuptext {
        display: none;
		background-color: var(--popup-color);
		color: var(--text-color);
		text-align: center;
		border-radius: 6px;
		padding: 1em;
        font-size: 20px;
		width: max-content;
		margin: 0 auto;
		position: relative;
	}
    h2 {
        position: absolute;
        left: 10px;
        top: 14px;
        color: #008000
    }
    .searchBar {
        text-align: right;
        margin-top: 10px;
        margin-right: 10%;
        border-radius: 8px;
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
        width: 140px;
        font-size: 15px;
        color: white;
        background-color: red;
        position: absolute;
        right: 160px;
        top: 10px;
    }
    .edit {
        height: 30px;
        width: 140px;
        font-size: 15px;
        color: black;
        background-color: white;
        position: absolute;
        right: 10px;
        top: 10px;
    }
    .publish {
        height: 30px;
        width: 140px;
        font-size: 15px;
        color: white;
        background-color: rgb(6, 98, 14);
        position: absolute;
        right: 310px;
        top: 10px;
    }
    h1 {
        color: #008000;
        font-size: 28px;
        text-align:left;
        margin-left: 9%;
        margin-bottom: 10px;
        font-weight: bold;
    }
    .displayLabs {
        position: relative;
        border-radius: 8px;
        margin-left: auto;
        margin-right: auto;
        max-width: 80%;
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