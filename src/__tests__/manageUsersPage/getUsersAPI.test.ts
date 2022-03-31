// Written by Jake Swick 
// 
// This page is a test file using jest. This test is used for ensuring the file "getUsers.ts"
// successfully pulls the users from the database.

import { get } from '../../routes/APIs/ManageUsersPage/getUsers' //imports the file we need to test

describe('Test API for ManageUsers Page. This test will focus on Getting Users', () => {
	test('Get User API success', async () => {
		try {
			let APIReturn = get({ params: 0 }) //selects the first user on the list (user 0).
			let status = await (await APIReturn).body.status //wait for a successful status (200)
			expect(status).toEqual(200) //If it gets 200, it will pass the test
		} catch (error) {} // Will do this and fail if it cannot get status code 200
	})
})
