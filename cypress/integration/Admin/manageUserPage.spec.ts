// Author(s): Jake Swick, Lane Wilkerson
// Last Modified: 02/22/2022
// Purpose: Tests the manageUsersPage page to ensure everything is displayed properly and functional
// Note: This test deletes the top user in Firebase Auth. I try to make sure that user is always cypress@test.com -Lane
import LoginAsAdmin from './loginAsAdmin'


describe('Test Manage Users Page', ()=>{ //this test is for the edit user button
    it('EditUserButton', ()=>{
        LoginAsAdmin();

        cy.get('#ManageUsersPage').click();
        cy.get('#editUserButton0').click(); //grabs first user button
        cy.url().should('include', 'editUser')
    })
    
    // it('DeleteButton', ()=>{ //this test is for the Delete User Button
    //     LoginAsAdmin();

    //     cy.get('#ManageUsersPage').click(); //click on manage users page from bouncer page
    //     cy.get('#delUserButton0').click(); //grabs first users delete button
    //     cy.on('window:alert', (txt) => {
    //         expect(txt).toEqual("User has been deleted")
    //     })
    //     cy.url().should('include', 'manageUsersPage')
    //     cy.wait(1000)
    //     cy.visit('http://localhost:3000/login');
    // })
    it('AddUserButton', ()=>{ //this test is for the eAdd User Button
        LoginAsAdmin();

        cy.get('#ManageUsersPage').click();
        cy.get('#newUserButton').click(); 
        cy.on('window:alert', (txt) => {
            expect(txt).toEqual("Page coming soon") //Tests for the alert.
        })
    })
});
export {}