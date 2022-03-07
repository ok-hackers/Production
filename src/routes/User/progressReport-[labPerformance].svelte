<!-- Written by Jake Swick 
// This page is the results page on the website. This page is responsible for diplaying the 
// results per student per lab on the screen and give the user access to  do or check grades for a lab. -->

<script lang="ts">
    import { page } from '$app/stores'

    //let name = await fetch (`/APIs/ManageUsersPage/delUser-${grabLabName}`) //lab name - appear at the top of the page
    let grade: string
    let questionNumber: string //question numbers
    let questions:Array<any> = null
    let labStatus = null

    async function grabLabName() {
        
    }

</script>

<main>
    <div id="main">
        <div class="grey"></div>
        <div class = "labName"></div>
    </div>
</main>

<style>
    h1 {
        color: #008000;
        font-size: 28px;
        text-align:left;
        margin-left: 15px;
        margin-bottom: 10px;
        font-weight: bold;
    }

    .grey {
        text-align: center;
        height: 60px;
        background-color: rgba(214, 214, 214) !important;
    }
</style>