import LoginAsAdmin from './logInAsAdmin'

describe('Test Manage Users Page', ()=>{
    it('EditUserButton', ()=>{
        LoginAsAdmin();

        cy.get('#ManageUsersPage').click();
        cy.get('#editUserButton0').click(); //grabs first user button
        cy.on('window:alert', (txt) => {
            expect(txt).toEqual("Merge with Lane's edit user page")
        })
    })
    
    it('DeleteButton', ()=>{
        LoginAsAdmin();

        cy.get('#ManageUsersPage').click();
        cy.get('#delUserButton0').click(); //grabs first user button
        cy.on('window:alert', (txt) => {
            expect(txt).toEqual("User successfully deleted.")
        })
    })
    it('AddUserButton', ()=>{
        LoginAsAdmin();

        cy.get('#ManageUsersPage').click();
        cy.get('#new_user_button').click(); 
        cy.on('window:alert', (txt) => {
            expect(txt).toEqual("Page coming soon")
        })
    })
});
export {}