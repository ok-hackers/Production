import LoginAsCypress from './logInAsCypress'

describe('Test Edit User Page', ()=>{

    it('Save button', ()=>{
        LoginAsCypress()
        cy.get('#NavigateEditUser').click();
        cy.get('#fName').type('Cypress');
        cy.get('#lName').type('Tester');
        cy.get('#username').type('cypress@test.com')
        cy.get('#password').type('testing')
        cy.get('#saveUser').click();
        cy.on('window:alert',($txt)=>{
            expect($txt).toEqual("Your name has been changed. You're welcome");
        })
        cy.url().should('include', 'Admin')
    })
    it('Delete button', ()=>{
        LoginAsCypress()
        cy.get('#NavigateEditUser').click();
        cy.get('input[name="fName"').invoke('attr', 'placeholder').should('contain', 'Cypress')
        cy.get('input[name="lName"').invoke('attr', 'placeholder').should('contain', 'Tester')
        cy.get('input[name="username"').invoke('attr', 'placeholder').should('contain', 'cypress@test.com')
        cy.get('input[name="password"').invoke('attr', 'placeholder').should('contain', '**********')
        cy.get('#delete').click();
        cy.on('window:alert',($txt)=>{
            expect($txt).toEqual('User successfully deleted.');
        })
        cy.wait(1000);
        cy.url().should('include', 'Admin')
    })
});