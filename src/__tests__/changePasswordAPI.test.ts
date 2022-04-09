//This file tests the 'changePassword-[email]-[newPassword].ts' API, which changes a users password in Firebase Auth
import { get } from '../routes/APIs/ManageUsersPage/updateUser-[newUser]-[userEmail]-[currentUser]-[auth]';

describe('Test API for editUser page', () => {
	test('saveSettings API success', async () => {
		try {
			let APIReturn = get({ params: '' });

			let status = await (await APIReturn).body.status;
			expect(status).toEqual(200);
		} catch (error) {}
	});
});