//return JSON over rest api

export async function get({ params }) {
    //console.log("This backend file is running on the server");

    let returnObj = {
        body: {
            "Message":"Hello World"
        }
    }

	return returnObj;
}