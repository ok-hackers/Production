// Author(s): Lane Wilkerson
// Last Modified: 4/5/2022
// Purpose: Tests the lab screen buttons (Back, Next, Complete Lab)
import signInAsUser from './loginuser';

describe('Lab Screen page test', ()=>{
    it('Test Next button', ()=>{
        signInAsUser();
        
        cy.get('#demo').click();
        cy.wait(500);
		cy.url().should('include', '/User/Lab');
        cy.get('#checkbox').click();
        cy.get('#nextButton').click();
    })
    it('Test Back button', ()=>{
        signInAsUser();

        cy.get('#demo').click();
        cy.wait(500);
		cy.url().should('include', '/User/Lab');
        cy.get('#checkbox').click();
        cy.get('#nextButton').click();
        cy.get('#backButton').click();
    })
    it('Test Complete Lab button (fail)', ()=>{
        signInAsUser();
        
        cy.get('#demo').click();
        cy.wait(500);
		cy.url().should('include', '/User/Lab');
        cy.get('#completeLab').click();
        cy.on('window:alert', (txt) => {
            expect(txt).toEqual("You must answer all questions on all pages")
        })
    })
    it('Test Complete Lab button (pass)', ()=>{
        signInAsUser();
        
        cy.get('#demo').click();
        cy.wait(500);
		cy.url().should('include', '/User/Lab');
        cy.get('#checkbox').click();
        cy.get('#nextButton').click();
        cy.get('#completeLab').click();
        cy.on('window:alert', (txt) => {
            expect(txt).toEqual("Lab Answers Saved")
        })
        cy.wait(500);
        cy.url().should('include', '/User/labComplete');
    })
})


export {}