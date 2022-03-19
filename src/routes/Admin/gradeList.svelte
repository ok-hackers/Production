// Written by Jake Swick

<script lang="ts">

</script>


<main>
    <div id="main">
        <div class="grey">
            <h1>Lab Name</h1>
        </div>
        <h1>Complete</h1>
        
        {#if publishedLabs != null}
            {#each publishedLabs as lab, i}
            <div class = "displayLabs">
                <h2 class="labName{i}">{lab}</h2>
                <button  on:click={() => {unpublishLab(lab)}} class="button button--raised review" id="unpublishLab{i}" name="review">Review</button>
            </div> 
            {/each}
        {/if} 
        <br><br>
        <h1>Incomplete</h1>
        {#if unpublishedLabs != null}
            {#each unpublishedLabs as lab, i}
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