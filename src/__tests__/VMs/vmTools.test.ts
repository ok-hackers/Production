//Written by Jake Swick 
//jest test for the vmTools API file

//pulls in get function from the vmTools API file

import { get } from '../../routes/APIs/VMs/vmTools';

describe('Test API for vmTools script', () => {
	test('make sure it can find the file', async () => {
        let data = await get

        expect(data).toBeDefined()
    })
})
