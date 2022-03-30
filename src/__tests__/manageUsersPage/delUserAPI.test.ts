// Written by Jake Swick 
// 
// This page is a test file using jest. This test is used for ensuring the file "delUser-[UserName]".ts"
// successfully deletes a user from the database.

import { get } from '../../routes/APIs/ManageUsersPage/delUser-[UserName]' //imports the file we need to test

describe('Test API for ManageUsers Page. This test will focus on Deleting Users', () => {
	test('delete User API success', async () => {
		try {
			let response = await fetch ('/APIs/ManageUsersPage/getUsers')
			let APIReturn = get({ params: 6 }) 
			let status = await (await APIReturn).body.status  //wait for a successful status (200)
			expect(status).toEqual(200) //If it gets 200, it will pass the test
		} catch (error) {} // Will do this and fail if it cannot get status code 200
	})
})
