//return JSON over rest api
import { exec } from 'child_process';
export async function get({ params }) {
    //console.log("This backend file is running on the server");

    let returnObj = {
        body: {
            "Message":"VMTools Test"
        }
    }
    
    exec('./PowershellScripts/VMWareTools.ps1', {'shell':'powershell.exe'}, (error, stdout, stderr)=> {
    // do whatever with stdout
})
	return returnObj;
}