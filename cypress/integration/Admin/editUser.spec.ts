// Author(s): Lane Wilkerson
// Last Modified: 02/22/2022
// Purpose: Tests the save button and delete button on editUser page. Delete button test is commented out temporialy for mental sanity purposes
import loginAsAdmin from './loginAsAdmin'

describe('Test Edit User Page', ()=>{

    it('Fname and Lname control', ()=>{
        loginAsAdmin()
        cy.get('#ManageUsersPage').click();
        cy.get('#editUserButton0').click();
        cy.get('#fName').type('Cypress');
        cy.get('#lName').type('Tester');
    })
    it('Username and Password control', ()=>{
        loginAsAdmin()
        cy.get('#ManageUsersPage').click();
        cy.get('#editUserButton0').click();
        cy.get('#username').type('cypress@test.com');
        cy.get('#password').type('testing');
    })
    it('Save button', ()=>{
        loginAsAdmin()
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
    //     loginAsAdmin()
    //     cy.get('#ManageUsersPage').click();
    //     cy.get('#searchBar').type('Wilkerson{enter}')
    //     cy.get('#editUserButton0').click();
    //     cy.wait(500);
    //     cy.url().should('include', 'editUser-')
    //     cy.get('#delete').click();
    //     cy.on('window:alert',($txt)=>{
    //         expect($txt).toEqual('User has been deleted');
    //     })
    //     cy.get('#newUserButton').click();
    //     cy.wait(500);
    //     cy.get('#singleFirstName').type('Lane')
    //     cy.get('#singleLastName').type('Wilkerson')
    //     cy.get('#singleEmail').type('lane.wilkerson@stvincent.edu')
    //     cy.get('#singleUserPassword').type('testing123')
    //     cy.get('#addSingle').click();
    // })
});
