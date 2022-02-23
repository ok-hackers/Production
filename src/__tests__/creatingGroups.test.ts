import { get } from '../routes/APIs/ManageGroups/createGroup-[groupName]-[users]-[id]';

describe('Test API for create group', () => {
	test('create group API success', async () => {
		try {
			let APIReturn = get({
				params: { groupName: 'atestgroup', users: ['secristj', 'fabiann'], id: '6969' }
			});
			let status = await (await APIReturn).body.status;
			expect(status).toEqual(200);
		} catch (error) {}
	});
});
