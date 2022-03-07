import {get} from '../../routes/APIs/Labs/getLabDocumentation-[labName]'

describe('Test Get Lab documentation', ()=>{
	test('get Lab Data Success', async ()=>{
		let result = await get({params: {labName: 'Wireshark Lab 1'}});

		expect(result.body.status).toEqual(200);
		expect(result.body.data.DocumentData).not.toBeNull();
	})

	test('get Lab Data fail', async ()=>{
		let result = await get({params: {labName: 'this is not a valid lab'}});

		expect(result.body.status).toEqual(500);
	})
})