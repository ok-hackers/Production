import LoginAsAdmin from './logInAsAdmin'

describe('Test Manage Users Page', ()=>{
    it('EditUserButton', ()=>{
        LoginAsAdmin();

        cy.get('#ManageUsersPage').click();
        cy.get('#editUserButton0').click(); //grabs first user button
        cy.url().should('include', 'editUser')
    })
    
    it('DeleteButton', ()=>{
        LoginAsAdmin();

        cy.get('#ManageUsersPage').click();
        cy.get('#delUserButton0').click(); //grabs first user button
        cy.on('window:alert', (txt) => {
            expect(txt).toEqual("User has been deleted")
        })
        cy.url().should('include', 'manageUsersPage')
        cy.visit('http://localhost:3000/login');
    })
    it('AddUserButton', ()=>{
        LoginAsAdmin();

        cy.get('#ManageUsersPage').click();
        cy.get('#newUserButton').click(); 
        cy.on('window:alert', (txt) => {
            expect(txt).toEqual("Page coming soon")
        })
    })
});
export {}