//Written by Jake Swick
//This API file allows the file createVM.ps1 to be integrated with the rest of the project.
//test

//return JSON over rest api
import { exec } from 'child_process';
export async function get({ params }) {

    let returnObj = {
        body: {
            "Message":"Create VM"
        }
    }
    
    exec('./PowershellScripts/createVM.ps1', {'shell':'powershell.exe'}, (error, stdout, stderr)=> {
    // do whatever with stdout
})
	return returnObj;
}