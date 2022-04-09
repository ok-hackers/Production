/*
    Author: Nate Fabian
    Date: 2/8/22
    Purpose: cypress test to check the functanality of the hamburger menu
*/

import LoginAsAdmin from './loginAsAdmin'

describe('Test Admin Hamburger Menu', ()=>{
    it('Open Close Function', ()=>{
        LoginAsAdmin();

        cy.get('#hamburgerMenu').click();
        cy.get('#CollapseMenuText').then(($menuItem)=>{
            expect($menuItem.is(':visible')).toEqual(true);
        });
        cy.get('.HamburgerCollapse').click();
        cy.get('#CollapseMenuText').then(($menuItem)=>{
            expect($menuItem.is(':visible')).toEqual(false);
        });
    })

    it('Logout Function', ()=>{
        LoginAsAdmin();
        cy.get('.logOut').click();
        cy.url().should('include', 'login');
    })
});



export {}