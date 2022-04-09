<script>
import { goto } from '$app/navigation';

async function returnHome() {
    goto('/User')
}
</script>
<div class="container">
	<div class="content">
        <p>Lab Complete!</p>
        <h1>Your responses have been recorded.</h1>

        <button on:click={returnHome} class="button button--raised" id="returnHome" name="Return Home">Return Home</button>
	</div>
</div>

<style>
    #returnHome {
        font-size: 18px;
        margin-top: 80%;
        text-align: center;
        width: 140px;
        height: 60px;
    }
    h1 {
        margin-top: 1em;
        font-size: 28px;
        text-align: center;
        font-weight: bold;
    }
    p {
        margin-top: 1em;
        font-size: 28px;
        text-align: center;
        font-weight: bold;
    }
    .content {
        text-align: center;
        margin-top: 4em;
        margin-left: auto;
        margin-right: auto;
        max-width: 35em;
        border-radius: 15px;
        min-height: 30em;
        padding: 30px;
        color: var(--text-color);
        background-color: var(--box-color);
    }
</style>