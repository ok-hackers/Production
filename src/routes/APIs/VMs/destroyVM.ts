//Written by Jake Swick
//This API file allows the file deleteVM.ps1 to be integrated with the rest of the project.

//return JSON over rest api
import { exec } from 'child_process';
export async function get({ params }) {

    let returnObj = {
        body: {
            "Message":"Destroy a VM"
        }
    }
    
    exec('./PowershellScripts/deleteVM.ps1', {'shell':'powershell.exe'}, (error, stdout, stderr)=> {

})
	return returnObj;
}