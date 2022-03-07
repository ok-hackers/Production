//Written by Jake Swick
//This API file allows the file VMWareTools.ps1 to be integrated with the rest of the project.
//test

//return JSON over rest api
import { exec } from 'child_process';
export async function get({ params }) {

    let returnObj = {
        body: {
            "Message":"VMTools Test"
        }
    }
    
    exec('./PowershellScripts/VMWareTools.ps1', {'shell':'powershell.exe'}, (error, stdout, stderr)=> {

})
	return returnObj;
}