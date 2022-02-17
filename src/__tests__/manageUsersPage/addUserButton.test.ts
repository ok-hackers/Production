/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom'
import { render } from '@testing-library/svelte'

import Index from '../../routes/Admin/ManageUsersPage.svelte'

describe("Test button controls for Add User Button", ()=>{
    test('"Does the button work?" button', ()=>{
        const {getByLabelText} = render(Index)
        let addUserButton = getByLabelText('add user button') as HTMLAnchorElement
        expect(addUserButton.href).toEqual("http://localhost/Admin/homePage")
    })
   })