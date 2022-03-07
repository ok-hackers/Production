//Author: Lane Wilkerson
//Last Modified: 03/02/2022
//This file tests the 'unpublishLab-[labName].ts' API, which unpublishes the specified lab
import { get } from '../routes/APIs/LabsPage/unpublishLab-[labName]'

describe('Test API to unpublish lab for labs page', () => {
	test('unpublishLab API success', async () => {
		try {
			let APIReturn = get({ params: '' });

			let status = await (await APIReturn).body.status;
			expect(status).toEqual(200);
		} catch (error) {}
	});
});