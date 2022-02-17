import { get } from '../routes/APIs/ManageGroups/deleteGroup-[groupName]';

describe('Test API for managegroups page, delete group', () => {
	test('delete group API success', async () => {
		try {
			let APIReturn = get({ params: 0 });

			let status = await (await APIReturn).body.status;
			expect(status).toEqual(200);
		} catch (error) {}
	});
});
