<!-- 
Author(s): Lane Wilkerson
Date Created: 02/09/2022
Last Modified: 03/02/2022
Purpose: Receives a user from manageUsersPage and allows that user to be edited in both the DB and authentication
-->
<script lang=ts>
    import { goto } from "$app/navigation";
    import { page } from '$app/stores';
import { group } from "console";

    let editUser = $page.params.user;

    let currentFName: string;
	let currentLName: string;
	let currentGroup: Array<any> = []
    let currentEmail: string;
    let newGroup

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
    let groupArray: Array<any> = [];
    
    //Getting all group data from the DB
    async function getGroups() {
        let response = await fetch('/APIs/ManageUsersPage/getGroups');
        let data = await response.json();
        if (data.status == 200) {
            groups = Object.keys(data.data);
            for (let i = 0; i < groups.length; i++) {
				groupArray.push(data.data[groups[i]]);
			}
			groupArray = groupArray;
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
        console.log(password)

        if (newGroup != undefined) {
            let response = await fetch(`/APIs/ManageGroups/updateUserGroups-${editUser}-${newGroup}`)  
        }

        if (password != null) {
            let response = await fetch(`/APIs/ManageUsersPage/changePassword-${email}-${password}`) //API call to update user's Firebase Auth info

        }

		if (full_name.includes(' ')) {
			let response = await fetch(`/APIs/ManageUsersPage/${full_name}-${email}-${editUser}-${'AuthenticationToken'}`); //API call to update user's DB info
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
            <div class="Inputs" id="Inputs">
                <div>
                    <p>F Name</p>
                    <input bind:value={firstName} class="textfield" style="display:inline;width:auto;" type="text" id="fName" name="fName" placeholder={currentFName}/>
                </div>
                <div>
                    <p>L Name</p>
                    <input bind:value={lastName} class="textfield" style="display:inline;width:auto;" type="text" id="lName" name="lName" placeholder={currentLName}/>
                </div>
                <div>
                    <p>Username</p>
                    <input bind:value={email} class="textfield" style="display:inline;width:auto;" type="text" id="username" name="username" placeholder={currentEmail}/>
                </div>
                <div>
                    <p>Password</p>
                    <input bind:value={password} class="textfield" style="display:inline;width:auto;" type="text" id="password" name="password" placeholder="*********"/>
                </div>
                <div>
                    <p>Group(s)</p>
                    <input list="groups" name="labGroups" id="group" bind:value={newGroup} placeholder={currentGroup.join()}/>
                    <datalist id="groups">
                    {#if groupArray != null}
                    {#each groupArray as group, i}    
                        <option type="checkbox" value={group.id}>{group.name}</option>>
                    {/each}
                    {/if}
                    </datalist>
                </div>
            </div>
            <br><br><br>
            <button on:click={() => {delUser(editUser, currentEmail)}} class="button button--raised" id="delete" name="changepassword">Delete</button>
            <button on:click={() => {saveSettings(editUser)}} class="button button--raised save" id="saveUser" name="changepassword">Save</button>
        </div>
</main>

<style>
    p {
		font-size: 20px;
		margin-bottom: 5px;
	}
    .Inputs {
		display: flex;
		justify-content: center;
		margin-bottom: 1em;
		gap: 1em;
		flex-wrap: wrap;
	}
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