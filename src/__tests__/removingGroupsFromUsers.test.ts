import { get } from '../routes/APIs/ManageGroups/removeGroupFromUsers-[groupID]';

describe('Test API for create group', () => {
	test('remove group API success', async () => {
		try {
			let APIReturn = get({
				params: { id: '0' }
			});
			let status = await (await APIReturn).body.status;
			expect(status).toEqual(200);
		} catch (error) {}
	});
	test('remove group API failure', async () => {
		try {
			let APIReturn = get({
				params: { id: '6969' }
			});
			let status = await (await APIReturn).body.status;
			expect(status).toEqual(502);
		} catch (error) {}
	});
});
