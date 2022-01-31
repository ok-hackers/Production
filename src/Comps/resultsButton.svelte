<script> 

function getResults() {
    location.href = '/wiresharkResults'
    // Using '/wiresharkResults' as a dummy reference. This button will be on the admin 'Evaluate' screen 
    // and will redirect to show the results of a specific lab
}

</script>

<svelte:head>
    <!-- CSS for button -->
    <link rel="stylesheet" href="/src/style.css">

</svelte:head>

<div>
    <!-- Results button -->
    <button on:click={getResults} class="mdl-button mdl-js-button mdl-button--raised" id="results-button" name="results">Results</button>

</div>


<style>
/* Changing button from standard Green/White to White/Black  */
button {
    background-color: white !important;
    color: black !important;
}

</style>