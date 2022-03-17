//jest test for the remove user manage group popup

//author: Josh Secrist

//03-06-22

//pulls in get function from the removeUserFromGroup API file

import { get } from '../routes/APIs/ManageGroups/removeUserFromGroup-[user]-[groupName]';

describe('Test API for removing a user from a group', () => {
	test('remove group API success', async () => {
		try {
			let APIReturn = get({
				params: { user: 'aCyPressTest', groupName: 'csj' }
			});
			let status = await (await APIReturn).body.status;
			expect(status).toEqual(200);
		} catch (error) {}
	});
	test('remove group API failure', async () => {
		try {
			let APIReturn = get({
				params: { user: 'bilbobaggins', groupName: 'oops' }
			});
			let status = await (await APIReturn).body.status;
			expect(status).toEqual(502);
		} catch (error) {}
	});
});
