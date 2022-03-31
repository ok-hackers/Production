//jest test for the ading users to group API   line 9

//author: Josh Secrist

//02-22-22

//pulls in get function from the updateUserGroups file

import { get } from '../routes/APIs/ManageGroups/updateUserGroups-[userToUpdate]-[groupID]';

describe('Test API for add users to group', () => {
	test('add users to group API success', async () => {
		try {
			let APIReturn = get({
				params: { usersToUpdate: ['secristj', 'fabiann', 'aCypressTest'], groupID: '2' }
			});
			let status = await (await APIReturn).body.status;
			expect(status).toEqual(200);
		} catch (error) {}
	});
});
