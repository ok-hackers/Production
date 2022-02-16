<script lang="ts">
	import { goto } from "$app/navigation";

    grabLabData();

    let labs:Array<any> = null

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
    <div class="grey">
        <br><br>
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

</main>

<style>
    #labName {
        position: absolute;
        left: 10px;
        top: 14px;
        color: #008000
    }
    #createLab {
        text-align: center;
        height: 40px;
        width: 120px;
        font-size: 15px;
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
        height: 100px;
        background-color: rgba(214, 214, 214) !important;
    }
</style>