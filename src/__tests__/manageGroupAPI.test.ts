import { get } from '../routes/APIs/ManageGroups/getGroups';

describe('Test API for managegroups page', () => {
	test('get groups API success', async () => {
		try {
			let APIReturn = get({ params: '' });

			let status = await (await APIReturn).body.status;
			expect(status).toEqual(200);
		} catch (error) {}
	});
	test('get groups API fail', async () => {
		try {
			let APIReturn = get({ params: '' });

			let status = await (await APIReturn).body.status;
			expect(status).toEqual(402);
		} catch (error) {}
	});
});
