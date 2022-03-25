<!-- Written by Jake Swick 
// This page is the availableLabs page on the website. This page is responsible for diplaying all of the labs on
// the screen and give the user access to  do or check grades for a lab. -->
<script lang="ts">
    import { goto } from "$app/navigation"
    import { getAuth } from 'firebase/auth';

    let userAuth = getAuth();
	let user = userAuth.currentUser;
    let labs:Array<any> = []
    let groups: Array<any> = null;
    let groupObjects: Array<any> = [];
    let userGroupObjects: Array<any> = [];
    let usersLabs: Array<any> = [];
    let availableLabsArray: Array<any> = [];
    let searchQuery = null
    let labName = null
    let labStatus = null
    let labKeys:Array<any> = []
    let labArray:Array<any> = []
    let userGroups:Array<any> = []
    let publishedLabs:Array<any> = []
    let unpublishedLabs:Array<any> = []

    

    let currentDBUser;
	let currentUser;
    let status = ''
	//Matches users in DB to the currently logged in user
	async function findUser(users) {
		//console.log(users)
		let i = 0;
		while (userKeys[i] != null) {
			if (users[i].email == user.email) {
				currentDBUser = userKeys[i];
				currentUser = users[i];
			}
			currentDBUser = currentDBUser;
			currentUser = currentUser;
			i += 1;
		}
		userGroups = currentUser['group']
        console.log("Here are the user's group IDs: ")
        console.log(userGroups)
	}

	let users: Array<any> = [];
	let userKeys: Array<any> = null;
	//Grabs all user data from DB
	async function getUsers() {
		let response = await fetch('/APIs/ManageUsersPage/getUsers');
		let data = await response.json();
		if (data.status == 200) {
			userKeys = Object.keys(data.data);
			for (let i = 0; i < userKeys.length; i++) {
				users.push(data.data[userKeys[i]]);
			}
			users = users;
			userKeys = userKeys;
		} else {
			alert('No users available');
		}
		findUser(users);
	}
	getUsers();

    //function will get the lab data for the user to view them
    async function grabLabData() {
        let response = await fetch('/APIs/Labs/getAllLabMetaData');
        let getAllLabMetaData = await response.json();        
        if (getAllLabMetaData.status == 200) {
                labKeys = Object.keys(getAllLabMetaData.data)
                for (let i = 0; i < labKeys.length; i++){
                    labArray.push(getAllLabMetaData.data[labKeys[i]])
                }
                labArray = labArray
            }
            else {
                alert('No labs available at this moment. Ask Dr. Serapiglia to upload some! :D');
            }
        labArray = labArray
        sortLabs()
    }
    grabLabData();

    //Takes all the labs and creates new arrays for them based on whether they are published or not
    async function sortLabs() {
        labArray = labArray
        for (let i = 0; i < labArray.length; i++){
            if (labArray[i].Published == 1) {
                publishedLabs.push(labKeys[i])
            }
            else {
                unpublishedLabs.push(labKeys[i])
            }
        }
        publishedLabs = publishedLabs
        unpublishedLabs = unpublishedLabs
    }

    // async function userLabs() {
    //     labArray = labArray
    //     console.log("Here are all the labs: ")
    // }
    // userLabs()

    async function getGroups() {
        userGroups = userGroups
        labArray = labArray
        publishedLabs = publishedLabs

        let response = await fetch('/APIs/ManageGroups/getGroups');
        let data = await response.json();
        if (data.status == 200) {
            groups = Object.keys(data.data);
            for (let i = 0; i < groups.length; i++) {
                groupObjects.push(data.data[groups[i]]);
            }
        } else {
            console.log('no groups available');
            //change the page to say something
        }
        groups = groups
        groupObjects = groupObjects
        console.log("Here are all the groups: ")
        console.log(groupObjects)


        let j = 0
        let i = 0
        //Getting the group objects for each group that a user is a member of
        for(i; j<userGroups.length; i++) {
            if(groupObjects[i].id == userGroups[j]){
                userGroupObjects.push(groupObjects[i])
                j++;
                i = 0;
            }
        }
        userGroupObjects = userGroupObjects
        console.log("Here are the users groups: ")
        console.log(userGroupObjects)

        j = 0
        i = 0
        let k=0
        //Getting the labs that the user has access to
        for(i; j<userGroupObjects.length; i++) {
            if(userGroupObjects[j].id == userGroups[j]){
                k=0
                while(k<userGroupObjects[j]['labs'].length){
                    usersLabs.push(userGroupObjects[j]['labs'][k])
                    k++
                }
                j++;
                i = 0;
            }
        }
        usersLabs = usersLabs
        console.log("Here are the users labs: ")
        console.log(usersLabs)


        console.log("Here are all the labs: ")
        console.log(labArray)
        j = 0
        i = 0
        //Getting only the Published Labs that the user has access to
        for(i; j<usersLabs.length; i++){
            if(usersLabs[j] == labArray[i].ID){
                if(labArray[i].Published == 1) { //If labs are not published, they should not be available
                    availableLabsArray.push(labArray[i].Name)
                    j++
                    i=0
                }
                else {
                    j++
                    i=0
                }
            }
        }
        availableLabsArray = availableLabsArray
        console.log("Here are the users published labs: ")
        console.log(availableLabsArray);

    }
    getGroups()

    function startLab(openLab) { 
        alert('Page coming soon')
        // goto(`/User/openLab-${openLab}`) //page coming soon
    }

    function labResults(labPerformance) { 
        goto(`/User/progressReport-${labPerformance}`)
    }

    //sorts labs based on search query
    function sortfunc() {
		publishedLabs = publishedLabs.sort((element1: string, element2: string) => {
			if (element1.includes(searchQuery)) {
                return -1;
			} 
            else if (element2.includes(searchQuery)) {
                return 1;
			} 
            else {
				return 0;
			}
		}
    );
	}
</script>

<main>
    <div id="main">
        <div class="searchBar">
            <input id="searchBar" placeholder="Lab Name" aria-label="Search Bar" bind:value={searchQuery} on:change={sortfunc}/>
        </div>
        <div class="grey"></div>
        <h1>Available Labs</h1>
        {#if availableLabsArray != null}
        {#each availableLabsArray as lab, i}
          <div class = "displayLabs">
            <h2 class="labName{i}">{lab}</h2>
            <button  on:click={() => {startLab(lab)}} class="button button--raised start" id="openLab{i}" name="openLab">Open Lab</button>
            <button on:click={() => {labResults(lab)}} class="button button--raised results" id="performanceResults{i}" name="performanceResults">Performance Report</button>
            <div class = "status">
              <!-- <div>{lab}</div> -->
              </div>
          </div> 
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
        max-width: 75%;
        height: 70px;
        background-color: rgb(197, 196, 196);
        margin-top: 20px;
    }
  .searchBar {
        text-align: right;
        margin-right: 30px;
        margin-top: 15px;
    }
    h1 {
        color: #008000;
        font-size: 32px;
        text-align:left;
        margin-left: 12%;
        margin-bottom: 10px;
        font-weight: bold;
    }
    h2 {
        position: absolute;
        line-height: 70px;
        margin-left: 1%;
        font-size: 22px;
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
