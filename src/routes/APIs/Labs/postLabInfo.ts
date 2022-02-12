import fs from 'fs'

export async function post({ request }) {
    let body = await request.formData();
    let info = JSON.parse(body.get('JSON info'));
    let blobData = body.get('raw file data') as File;
    let blobBuffer = await blobData.arrayBuffer();
    let uInt8buffer = new Uint8Array(blobBuffer);

    console.log(info);

    fs.writeFileSync(`VMImageTempSpace/${info.Name}.jpg`, uInt8buffer);

    return {
        body: {
            message: `post recived and saved under ${info.Name}.jpg`
        }
    }
}

async function convertEncodedBlobToBlob(EncodedBlob: string) {

}