// Written by Jake Swick 
// 
// This page is a test file for cypress. This test is used for all buttons on a page.
// This tests buttons shown on ManageUsersPage.svelte

import LoginAsAdmin from './loginAsAdmin' //logins to the login page with admin perms

describe('Test Manage Users Page', ()=>{ //this test is for the edit user button
    it('EditUserButton', ()=>{
        LoginAsAdmin();

        cy.get('#manageUsersPage').click(); //click on manage users page from bouncer page
        cy.get('#editUserButton0').click(); //grabs first users edit button
        cy.on('window:alert', (txt) => {
            expect(txt).toEqual("Merge with Lane's edit user page") //Tests for the alert.
        })
    })
    
    it('DeleteButton', ()=>{ //this test is for the Delete User Button
        LoginAsAdmin();

        cy.get('#manageUsersPage').click(); //click on manage users page from bouncer page
        cy.get('#delUserButton0').click(); //grabs first users delete button
        cy.on('window:alert', (txt) => {
            expect(txt).toEqual("User successfully deleted.") //Tests for the alert.
        })
    })
    it('AddUserButton', ()=>{ //this test is for the eAdd User Button
        LoginAsAdmin();

        cy.get('#manageUsersPage').click(); //click on manage users page from bouncer page
        cy.get('#new_user_button').click(); //grabs the big add user button at the top of the page
        cy.on('window:alert', (txt) => {
            expect(txt).toEqual("Page coming soon") //Tests for the alert.
        })
    })
});
export {}