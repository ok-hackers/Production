<script lang="ts">
	import { goto } from "$app/navigation";

    grabLabData();

    let searchTerm = ''
    let labs:Array<any> = null

    function highlight() {
        var inputText = document.getElementById("main");
        var innerHTML = inputText.innerHTML;
        var index = innerHTML.indexOf(searchTerm);
        if (index >= 0) { 
        innerHTML = innerHTML.substring(0,index) + "<span style='background-color:yellow;'>" + innerHTML.substring(index,index+searchTerm.length) + "</span>" + innerHTML.substring(index + searchTerm.length);
        inputText.innerHTML = innerHTML;
        console.log("should have ran")
        }
    }   
    
    async function grabLabData() {
        let response = await fetch('/APIs/Labs/getAllLabMetaData');
        let getAllLabMetaData = await response.json();

        labs = Object.keys(getAllLabMetaData.data);

        document.getElementById("labName").innerHTML = labs[0];
        return labs;
    }

    function createLab(){
        goto('/Admin/createLab')
    }


</script>

<main>
    <div id="main">
        <div class="searchBar">
            <input bind:value={searchTerm} id="searchInput" placeholder="Lab name">
            <button on:click={highlight} class="button button--raised" id="searchButton" name="search">Search</button>
        </div>
        <div class="grey">
            <button on:click={createLab} class="button button--raised" id="createLab" name="createLab">Create Lab</button>
        </div>
        <h1>Published Labs</h1>
        <div class="displayLabs" id="labsMenu">
            <button on:click={createLab} class="button button--raised" id="unpublishLab" name="unpublishLab">Unpublish Lab</button>
            <button on:click={createLab} class="button button--raised" id="editLab" name="editLab">Edit Lab</button>
        </div>
        <div class="displayLabs" id="labsMenu">
            <button on:click={createLab} class="button button--raised" id="unpublishLab" name="unpublishLab">Unpublish Lab</button>
            <button on:click={createLab} class="button button--raised" id="editLab" name="editLab">Edit Lab</button>
        </div>
        <div class="displayLabs" id="labsMenu">
            <button on:click={createLab} class="button button--raised" id="unpublishLab" name="unpublishLab">Unpublish Lab</button>
            <button on:click={createLab} class="button button--raised" id="editLab" name="editLab">Edit Lab</button>
        </div>

        <br><br><br>

        <h1>Unpublished Labs</h1>
        <div class="displayLabs" id="labsMenu">
            <h2 id="labName"></h2>
            <button on:click={createLab} class="button button--raised" id="unpublishLab" name="unpublishLab">Unpublish Lab</button>
            <button on:click={createLab} class="button button--raised" id="editLab" name="editLab">Edit Lab</button>
        </div>
        <div class="displayLabs" id="labsMenu">
            <button on:click={createLab} class="button button--raised" id="unpublishLab" name="unpublishLab">Unpublish Lab</button>
            <button on:click={createLab} class="button button--raised" id="editLab" name="editLab">Edit Lab</button>
        </div>
        <div class="displayLabs" id="labsMenu">
            <button on:click={createLab} class="button button--raised" id="unpublishLab" name="unpublishLab">Unpublish Lab</button>
            <button on:click={createLab} class="button button--raised" id="editLab" name="editLab">Edit Lab</button>
        </div>
    </div>
</main>

<style>
    .searchBar {
        text-align: right;
    }
    #searchInput {
        border-radius: 8px;
        border: none;
        height: 22px;
    }
    #searchButton {
        margin-right: 10px;
    }
    #labName {
        position: absolute;
        left: 10px;
        top: 14px;
        color: #008000
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