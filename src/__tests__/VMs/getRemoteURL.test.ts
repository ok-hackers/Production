//Written by Jake Swick 
//jest test for the getRemoteURL API file

//pulls in get function from the getRemoteURL API file

import { get } from '../../routes/APIs/VMs/getRemoteURL';

describe('Test API for getRemoteURL script', () => {
	test('make sure it can find the file', async () => {
        let data = await get

        expect(data).toBeDefined()
    })
})
