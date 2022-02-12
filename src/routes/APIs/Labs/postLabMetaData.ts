import fs from 'fs';
import Database, {DBGroups, LabMetaData} from '../../../Lib/DatabaseConnector';

export async function post({ request }) {
    //#region process the incomming request into variables
    let body = await request.formData();
    let info = JSON.parse(body.get('JSON info')) as LabMetaData;
    let blobData = body.get('raw file data') as File;
    let blobBuffer = await blobData.arrayBuffer();
    let uInt8buffer = new Uint8Array(blobBuffer);
    //#endregion

    //#region check for malformed form data
    if (info.Name == undefined || info.DueDate == undefined || info.Description == undefined) {
        return {
            body: {
                message: "malformed form data please ensure all fields are complete",
                status: 204
            }
        }
    }
    //#endregion

    //#region check to make sure the file actually made it over 
    if (uInt8buffer == undefined) {
        return {
            body: {
                message: "failed to receive data body",
                status: 550
            }
        }
    }
    //#endregion
    //#region Update firebase with lab meta data
    let db = new Database(DBGroups.Labs);

    db.updateLabMetaData(info);
    //#endregion

    //#region write that file
    fs.writeFileSync(`VMImageTempSpace/LabImage_${info.Name}.jpg`, uInt8buffer);
    //#endregion
    //#region send the all good message back
    return {
        body: {
            message: `post recived and saved under ${info.Name}.jpg`,
            status: 200
        }
    }
    //#endregion
}