//return JSON over rest api

import Database, {DBGroups} from '../../../Lib/DatabaseConnector'

export async function get({ params }) {
    //console.log("This backend file is running on the server");

    let {UserName} = params;

   
    let returnObj = {
        body:{
            data:`${UserName} was Deleted`
        
        }
        
    }
    
    

	return returnObj;
}
// need to use a slug. reference LearnYourNumbers > [slug.ts]
//    let {slug} = params; 
//    let {UserName} = params;
