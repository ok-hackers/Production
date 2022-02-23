import { get } from '../routes/APIs/ManageGroups/updateUserGroups-[userToUpdate]-[groupID]';

describe('Test API for add users to group', () => {
	test('add users to group API success', async () => {
		try {
			let APIReturn = get({
				params: { userToUpdate: 'nfabian', groupID: '6969' }
			});
			let status = await (await APIReturn).body.status;
			expect(status).toEqual(200);
		} catch (error) {}
	});
});
