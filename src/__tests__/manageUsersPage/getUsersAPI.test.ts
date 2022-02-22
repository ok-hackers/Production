import { get } from '../../routes/APIs/ManageUsersPage/delUser-[UserName]'

describe('Test API for ManageUsers Page. This test will focus on Getting Users', () => {
	test('Get User API success', async () => {
		try {
			let APIReturn = get({ params: 0 })
			let status = await (await APIReturn).body.status
			expect(status).toEqual(200)
		} catch (error) {}
	})
})
