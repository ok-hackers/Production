/*
    Author: Nate Fabian
    Date: 1/18/22
    Purpose: Example of how to make a rest API in svelte
*/

export async function get({ params }) {
    //console.log("This backend file is running on the server");

    let returnObj = {
        body: {
            "Message":"Hello World"
        }
    }

	return returnObj;
}