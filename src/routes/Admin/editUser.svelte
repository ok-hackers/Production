<script lang=ts>
    import { goto } from "$app/navigation";
    import {updateEmail, deleteUser, getAuth, updateProfile, updatePassword, reauthenticateWithCredential, AuthCredential} from 'firebase/auth';
     
    const auth = getAuth()
    const user = auth.currentUser;

    let fName
    let lName
    let username
    let password
    let fullName = user.displayName
    let fullNameSplit = [' ', ' ']

    if (user.displayName != null) {
        fullNameSplit = user.displayName.split(' ')
    }

    async function updateName() {
        let name = fName + ' ' + lName;
        updateProfile(auth.currentUser,  {
            displayName: name 
            }).then(() => {
                alert("Profile name updated")
            }).catch((error) => {
                console.log(error);
                var errorCode = error.code;
                console.log(error.code)
                var errorMessage = error.message;
                console.log(error.message)
            }); 
    }

    async function emailUpdate() {
        let email = username
        updateEmail(auth.currentUser, email).then(() => {
            alert("Username updated")
        }).catch((error) => {
            console.log(error);
            var errorCode = error.code;
            console.log(error.code)
            var errorMessage = error.message;
            console.log(error.message)
        });
    }

    async function passwordUpdate() {
        updatePassword(user, password).then(() => {
            alert("Password updated")
        }).catch((error) => {
            console.log(error);
            var errorCode = error.code;
            console.log(error.code)
            var errorMessage = error.message;
            console.log(error.message)
        });
    }

    function saveUser(){
        updateName()
        emailUpdate()
        passwordUpdate()
        goto('/Admin')
    }

    async function userDelete() {
        deleteUser(user).then(() => {
            alert("User deleted")
            goto('/Admin')
        }).catch((error) => {
            console.log(error);
            var errorCode = error.code;
            console.log(error.code)
            var errorMessage = error.message;
            console.log(error.message)
        });
    }
</script>

<main>
    <div class="grey">
        <br><br><br><br>
        <h1>Edit User - { user.email } </h1>
    </div>
    <div class="editUserMenu" id="userMenu">
        <br><br><br><br>
        <input bind:value={fName} class="textfield" style="display:inline;width:auto;" type="text" id="fName" name="fName" placeholder={fullNameSplit[0]}/>
        <input bind:value={lName} class="textfield" style="display:inline;width:auto;" type="text" id="lName" name="lName" placeholder={fullNameSplit[1]}/>
        <input bind:value={username} class="textfield" style="display:inline;width:auto;" type="text" id="username" name="username" placeholder={user.email}/>
        <input bind:value={password} class="textfield" style="display:inline;width:auto;" type="text" id="password" name="password" placeholder="**********"/>
        <label>Group(s)
            <input list="groups" name="labGroups" id="group" /></label>
            <datalist id="groups">
            <option value="CS-325">
            <option value="Highschools">
            <option value="Testing">
            </datalist>
        <br><br><br>
        <button on:click={userDelete} class="button button--raised" id="delete" name="changepassword">Delete</button>
        <button on:click={saveUser} class="button button--raised" id="saveUser" name="changepassword">Save</button>
    </div>

</main>

<style>
    #group {
        padding: 10px 0;
        font-size: 14px;
        border-radius: 8px;
        background:white;
        box-shadow: 0 0 3px rgb(0 0 0 / 18%), 0 3px 16px rgb(0 0 0 / 36%);
        border: 1px solid rgba(0,0,0,.12);
    }
    h1 {
        color: grey;
        font-size: 22px;
        text-align:left;
        margin-left: 150px;
    }
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
        width: 120px;
        margin-bottom: 15px;
        margin-right: 5px;
        margin-left: 5px;
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
    .grey {
        height: 100px;
        background-color: rgba(214, 214, 214) !important;
    }
</style>