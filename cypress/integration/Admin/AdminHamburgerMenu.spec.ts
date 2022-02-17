import LoginAsAdmin from './logInAsAdmin'

describe('Test Admin Hamburger Menu', ()=>{
    it('Open Close Function', ()=>{
        LoginAsAdmin();

        cy.get('.HamburgerCollapse').click();
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