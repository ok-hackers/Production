//Written by Jake Swick 
//jest test for the getVM API file

//pulls in get function from the getVM API file

import { get } from '../../routes/APIs/VMs/createVM';

describe('Test API for createVM script', () => {
	test('make sure it can find the file', async () => {
        let data = await get

        expect(data).toBeDefined()
    })
})
