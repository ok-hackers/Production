<script lang=ts>
     import { goto } from "$app/navigation";

     let fName
     let lName
     let username
     let password

</script>

<main>
    <div class="editUserMenu" id="userMenu">
        <br><br><br><br>
        <input bind:value={fName} class="textfield" style="display:inline;width:auto;" type="text" id="fName" name="fName" placeholder="Nate"/>
        <input bind:value={lName} class="textfield" style="display:inline;width:auto;" type="text" id="lName" name="lName" placeholder="Fabian"/>
        <input bind:value={username} class="textfield" style="display:inline;width:auto;" type="text" id="username" name="username" placeholder="nathan.fabian@stvincent.edu"/>
        <input bind:value={password} class="textfield" style="display:inline;width:auto;" type="text" id="password" name="password" placeholder="**********"/>
        <label>Groups
            <input list="browsers" name="myBrowser" /></label>
            <datalist id="browsers">
            <option value="CS-325">
            <option value="Highschools">
            <option value="Testing">
            </datalist>
        <br><br><br>
        <button class="button button--raised" id="delete" name="changepassword">Delete</button>
        <button class="button button--raised" id="saveUser" name="changepassword">Save</button>
    </div>
</main>

<style>
    .textfield {
        margin-left: 15px;
        margin-right: 15px;
    }
    label {
        font-size: 16px;
    }
    #delete {
        background-color: red;
    }
    .button, .button--raised{
        height: 40px;
        margin-bottom: 15px;
        margin-right: 15px;
        margin-left: 15px;
        font-size: 14px;
    }
    .editUserMenu {
        border-radius: 8px;
        margin-left: auto;
        margin-right: auto;
        max-width: 80%;
        background-color: rgb(197, 196, 196);
        text-align: center;
    }
</style>