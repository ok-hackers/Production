//Written by Jake Swick 
//jest test for the destroyVM API file

//pulls in get function from the destroyVM API file

import { get } from '../../routes/APIs/VMs/destroyVM';

describe('Test API for destroyVM script', () => {
	test('make sure it can find the file', async () => {
        let data = await get

        expect(data).toBeDefined()
    })
})