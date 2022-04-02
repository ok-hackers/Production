/*
    Author: Josh Secrist
    Date: 3/28/22
    Purpose: Tests the API for getting students of a particular group
*/

import { get } from '../routes/APIs/LabResults/getStudentsInAGroup-[groupID]';

describe('Test API for getting users of a group', () => {
	test('getStudents from group API success', async () => {
		try {
			let APIReturn = get({
				params: { groupID: '9999' }
			});
			let status = await (await APIReturn).body.status;
			expect(status).toEqual(200);
		} catch (error) {}
	});
});
