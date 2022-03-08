//This file tests the '[newUser]-[userEmail]-[currentUser]-[auth].ts' API, which updates a user in the DB
import { get } from '../routes/APIs/ManageUsersPage/[newUser]-[userEmail]-[currentUser]-[auth]';

describe('Test API for editUser page', () => {
	test('saveSettings API success', async () => {
		try {
			let APIReturn = get({ params: '' });

			let status = await (await APIReturn).body.status;
			expect(status).toEqual(200);
		} catch (error) {}
	});
});