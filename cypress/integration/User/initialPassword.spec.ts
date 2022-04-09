// Author(s): Lane Wilkerson
// Last Modified: 02/22/2022
// Purpose: Tests that the initialPassword page displayed the correct prompts and options to the user
import loginuser from "../User/loginuser"

describe('initialPassword page test', ()=>{
    it('test initialPassword success', ()=>{
        loginuser();
        cy.get('#initialPassword').click();
        cy.get('#password').type('test123');
        cy.get('#confirmPassword').type('test123');
        cy.get('#change-password').click()
        cy.wait(1000)
        cy.get('#changePassword').then(($txt)=>{
            const txt = $txt.text();
            expect(txt).toContain("Successful")
        })
    })
    it('test initialPassword fail', ()=>{
        loginuser();
        cy.get('#initialPassword').click();
        cy.get('#password').type('testing');
        cy.get('#confirmPassword').type('testing');
        cy.get('#change-password').click()
        cy.wait(1000)
        cy.on('window:alert', (txt) => {
            expect(txt).toEqual("You must choose a NEW password.")
        })
    })
})


export {}