/*
    Author: Nate Fabian
    Date: 2/15/22
    Purpose: Rest API to post lab meta data to firebase and lab image to the internal server
*/

import fs from 'fs';
import Database, { DBGroups, LabMetaData } from '../../../Lib/DatabaseConnector';

export async function post({ request }) {
	console.log('Create/Edit Lab request incomming');
	//#region process the incomming request into variables
	let body = await request.formData();
	let info = JSON.parse(body.get('JSON info')) as LabMetaData;
	let blobData = body.get('raw file data') as File;
	let blobBuffer: ArrayBuffer;
	let uInt8buffer: Uint8Array;
	//@ts-ignore ignore this check as it is only a string and not a file when undefined
	if (blobData != 'undefined') {
		blobBuffer = await blobData.arrayBuffer();
		uInt8buffer = new Uint8Array(blobBuffer);
	}
	//#endregion

	//#region Update firebase with lab meta data
	let db = new Database(DBGroups.Labs);

	db.updateLabMetaData(info);
	//#endregion

	//#region write that file
	//this allows for partial submission of this form but a check must be made when the lab is published to ensure that all of the data is actually there
	if (uInt8buffer != undefined) {
		fs.writeFileSync(`VMImageTempSpace/LabImage_${info.Name}.jpg`, uInt8buffer);
	}
	//#endregion
	//#region send the all good message back
	return {
		body: {
			message: `post recived and saved under ${info.Name}.jpg`,
			status: 200
		}
	};
	//#endregion
}
