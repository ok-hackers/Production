// Author(s): Lane Wilkerson
// Last Modified: 02/22/2022
// Purpose: Tests the save button and delete button on editUser page. Delete button test is commented out temporialy for mental sanity purposes
import LoginAsCypress from './logInAsCypress'

describe('Test Edit User Page', ()=>{

    it('Save button', ()=>{
        LoginAsCypress()
        cy.get('#ManageUsersPage').click();
        cy.get('#editUserButton0').click();
        cy.get('#fName').type('Cypress');
        cy.get('#lName').type('Tester');
        cy.get('#username').type('cypress@test.com')
        cy.get('#saveUser').click();
        cy.on('window:alert',($txt)=>{
            expect($txt).toEqual("User has been updated");
        })
        cy.url().should('include', 'manageUsersPage')
        cy.visit('http://localhost:3000/login');
    })
    // it('Delete button', ()=>{
    //     LoginAsCypress()
    //     cy.get('#ManageUsersPage').click();
    //     cy.get('#editUserButton0').click();
    //     cy.get('input[name="fName"').invoke('attr', 'placeholder').should('contain', 'Cypress')
    //     cy.get('input[name="lName"').invoke('attr', 'placeholder').should('contain', 'Tester')
    //     cy.get('input[name="username"').invoke('attr', 'placeholder').should('contain', 'cypress@test.com')
    //     cy.get('input[name="password"').invoke('attr', 'placeholder').should('contain', '**********')
    //     cy.get('#delete').click();
    //     cy.on('window:alert',($txt)=>{
    //         expect($txt).toEqual('User has been deleted');
    //     })
    //     cy.wait(1000);
    //     cy.url().should('include', 'manageUsersPage')
    // })
});