// Written by Jake Swick 
// 
// This page is a test file for cypress. This test is used for all buttons on a page & search engine.
// This tests buttons shown on availableLabs.svelte

//DB Dependencies: Josh's user must be a part of a group with a lab named "Wireshark..." that is published
//If not, the lab will not exist on the Available Labs page and test will fail

import signInAsUser from './loginuser' //logins to the login page

describe('Test available labs page', ()=>{
    it('OpenLabButton', ()=>{  //this test is for the open lab button
        signInAsUser();

        cy.get('#availableLabs').click(); 
        cy.get('#openLab0').click(); 
        cy.on('window:alert', (txt) => {
            expect(txt).toEqual("Page coming soon") //Tests for the alert.
        })
    }) //test
    
    it('PerformanceReportButton', ()=>{
        signInAsUser();

        cy.get('#availableLabs').click(); 
        cy.get('#performanceResults0').click(); 
        cy.url().should('include', 'progressReport')
    })
   
    it('Search bar', ()=>{
        signInAsUser()
        
        cy.get('#availableLabs').click();
        cy.get('#searchBar').type('Wireshark{enter}')
         cy.get('.labName0').then(($name)=>{
            const txt = $name.text();
            expect(txt).toContain("Wireshark")
        }) 
    })
});
export {}