//return JSON over rest api

export async function get({ params }) {
    //console.log("This backend file is running on the server");

    let {slug} = params;

    let returnObj;

    switch (slug) {
        case "1": {
            returnObj = {
                body: {
                    "Number":1
                }
            }
            break;
        } 
        case "2": {
            returnObj = {
                body: {
                    "Number":2
                }
            }
            break;
        } 
        case "3": {
            returnObj = {
                body: {
                    "Number":3
                }
            }
            break;
        } 
        case "4": {
            returnObj = {
                body: {
                    "Number":4
                }
            }
            break;
        } 
        default: {
            returnObj = {
                body: {
                    "Number":"We have no idea"
                }
            }
            break;
        }
    }

    

	return returnObj;
}