<!-- 
Author(s): Lane Wilkerson
Date Created: 02/09/2022
Last Modified: 02/24/2022
Purpose: Receives a user from manageUsersPage and allows that user to be edited in both the DB and authentication
-->
<script lang=ts>
    import { goto } from "$app/navigation";
    import { page } from '$app/stores';

    let editUser = $page.params.user;

    let currentFName: string;
	let currentLName: string;
	let currentGroup: Array<any> = []
    let currentEmail: string;

    //Grabbing current user data for the user that is being edited
    async function PrefilUserData() {
        let response = await fetch ('/APIs/ManageUsersPage/getUsers')
        let getAllUserData = await response.json();

        let userData = getAllUserData.data[editUser];

        currentFName = userData.fname;
        currentLName = userData.lname;
        currentGroup = userData.group;
        currentEmail = userData.email;
	}
    PrefilUserData();

    let users:Array<any> = []
	let userKeys:Array<any> = null

    //Getting all user data from the DB
    async function getUsers(){
        let response = await fetch ('/APIs/ManageUsersPage/getUsers')
        let data = await response.json()
        if (data.status == 200) {
            userKeys = Object.keys(data.data) //fetched the key at second index
            for (let i = 0; i < userKeys.length; i++){
                users.push(data.data[userKeys[i]])
            }
            users = users
            }
        else {
            alert('No users available');
        }
    } 
    getUsers();
 
    let groups: Array<any> = null;
    
    //Getting all group data from the DB
    async function getGroups() {
        let response = await fetch('/APIs/ManageUsersPage/getGroups');
        let data = await response.json();
        if (data.status == 200) {
            groups = Object.keys(data.data);
        } else {
            alert('No groups available');
        }
    }
    getGroups();

    //Deleting the current user from the DB and authentication
    async function delUser(user, userEmail){
        let confirmDelete = confirm("Are you sure to delete this user?");
            if (confirmDelete) {
                let response = await fetch (`/APIs/ManageUsersPage/delUser-${user}`)
                let response2 = await fetch (`/APIs/ManageUsersPage/DeleteUserBy-${userEmail}`)
                users = []
                setTimeout(getUsers, 100);
                alert("User has been deleted");
            } 
            else {
                alert("Unable to delete user")
            }
            goto('/Admin/manageUsersPage')
        }

    let firstName = null;
    let lastName = null;
    let email = null;
    let password = null
 
    //Saving the settings for the current user. If fields are left blank, they will remain the same. 
    async function saveSettings(editUser) {
        if (firstName == null){
            firstName = currentFName
        }
        if (lastName == null){
            lastName = currentLName
        }
        if (email == null){
            email = currentEmail
        }

        let full_name = firstName + ' ' + lastName;

		if (full_name.includes(' ')) {
			let response = await fetch(`/APIs/ManageUsersPage/${full_name}-${email}-${editUser}-${'AuthenticationToken'}`); //API call to update user's DB info
            let response2 = await fetch(`/APIs/ManageUsersPage/changePassword-${email}-${password}`) //API call to update user's Firebase Auth info
			alert("User has been updated");
		} else {
			alert("Please enter a valid name");
		}
        goto('/Admin/manageUsersPage')
	}
</script>

<main>
    <div class="grey">
        <br><br><br><br>
    </div>
        <div class="editUserMenu" id="userMenu">
            <br><br><br><br>
            <input bind:value={firstName} class="textfield" style="display:inline;width:auto;" type="text" id="fName" name="fName" placeholder={currentFName}/>
            <input bind:value={lastName} class="textfield" style="display:inline;width:auto;" type="text" id="lName" name="lName" placeholder={currentLName}/>
            <input bind:value={email} class="textfield" style="display:inline;width:auto;" type="text" id="username" name="username" placeholder={currentEmail}/>
            <input bind:value={password} class="textfield" style="display:inline;width:auto;" type="text" id="password" name="password" placeholder="*********"/>

            <label>Group(s)
                <input list="groups" name="labGroups" id="group" /></label>
                <datalist id="groups">
                {#if groups != null}
                {#each groups as group, i}    
                    <option value={group}>
                {/each}
                {/if}
            </datalist>
            <br><br><br>
            <button on:click={() => {delUser(editUser, currentEmail)}} class="button button--raised" id="delete" name="changepassword">Delete</button>
            <button on:click={() => {saveSettings(editUser)}} class="button button--raised save" id="saveUser" name="changepassword">Save</button>
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