import '@testing-library/jest-dom'
import { render } from '@testing-library/svelte';

import { get } from '../../routes/APIs/ManageUsersPage/delUser-[UserName]'

describe('Test API for ManageUsers Page. This test will focus on Deleting Users', () => {
	test('delete User API success', async () => {
		try {
			let APIReturn = get({ params: 0 })
			let status = await (await APIReturn).body.status
			expect(status).toEqual(200)
		} catch (error) {}
	})
})

//Copied Josh's code from GitHub to play around and figure out what the test was doing and how it worked. Not planning on using this code or copying it
// I also tried my own stuff as well