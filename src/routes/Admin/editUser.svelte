<script lang=ts>
    import { goto } from "$app/navigation";
     
    let users:Array<any> = []
	let userKeys:Array<any> = null

    async function getUsers(){
        let response = await fetch ('/APIs/ManageUsersPage/getUsers')
        let data = await response.json()
        if (data.status == 200) {
            userKeys = Object.keys(data.data) //fetched the key at second index
            for (let i = 0; i < userKeys.length; i++){
                users.push(data.data[userKeys[i]])
            }
            users = users
            const count = userKeys.length
            }
        else {
            console.log('no users available');
        }
    } 
  getUsers();
 
 let groups: Array<any> = null;

 async function getGroups() {
    let response = await fetch('/APIs/ManageUsersPage/getGroups');
    let data = await response.json();
    if (data.status == 200) {
        groups = Object.keys(data.data);
    } else {
        console.log('no groups available');
        //change the page to say something
    }
 }
 getGroups();

 async function delUser(user){
	let confirmDelete = confirm("Are you sure to delete this user?");
        if (confirmDelete) {
			let response = await fetch (`/APIs/ManageUsersPage/delUser-${user}`) //Something happens here... check source file
			users = []
			setTimeout(getUsers, 100);
			alert("User successfully deleted.");
        } 
		else {
        }
	}

 let firstName = null;
 let lastName = null;
 let email = null;
 let password = '******'
 $: full_name = firstName + ' ' + lastName;


 async function saveSettings(userKey) {
		if (full_name.includes(' ')) {
			let response = await fetch(`/APIs/ManageUsersPage/${full_name}-${email}-${userKey}-${'AuthenticationToken'}`);
			alert("Your name has been changed. You're welcome");
		} else {
			alert(
				"Please enter a name"
			);
		}
        goto('/Admin')
	}

</script>

<main>
    <div class="grey">
        <br><br><br><br>
    </div>
    {#if users != null}
    {#each users as user, i}
        <div class="editUserMenu" id="userMenu">
            <br><br><br><br>
            <input bind:value={firstName} class="textfield" style="display:inline;width:auto;" type="text" id="fName" name="fName" placeholder={user.fname}/>
            <input bind:value={lastName} class="textfield" style="display:inline;width:auto;" type="text" id="lName" name="lName" placeholder={user.lname}/>
            <input bind:value={email} class="textfield" style="display:inline;width:auto;" type="text" id="username" name="username" placeholder={user.email}/>
            <input bind:value={password} class="textfield" style="display:inline;width:auto;" type="text" id="password" name="password" placeholder="**********"/>

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
            <button on:click={() => {delUser(userKeys[i])}} class="button button--raised" id="delete" name="changepassword">Delete</button>
            <button on:click={() => {saveSettings(userKeys[i])}} class="button button--raised" id="saveUser" name="changepassword">Save</button>
        </div>
    
    {/each}
    {/if}  
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