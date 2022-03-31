//Written by Jake Swick
//This API file allows the file getVMUrl.ps1 to be integrated with the rest of the project.

//return JSON over rest api
import { exec } from 'child_process';
export async function get({ params }) {

    let returnObj = {
        body: {
            "Message":"Get URL for VM"
        }
    }
    
    exec('./PowershellScripts/getVMUrl.ps1', {'shell':'powershell.exe'}, (error, stdout, stderr)=> {

})
	return returnObj;
}