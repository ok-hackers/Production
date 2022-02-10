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

function LoginAsAdmin() {
    cy.visit('http://localhost:3000/');
    cy.get('#TempLoginButton').click();
    cy.wait(1000);
    cy.get('#email').type('nathan.fabian@stvincent.edu');
    cy.get('#password').type('testing');
    cy.wait(1000);
    cy.get('#quickstart-sign-in').click();
    cy.get('#NavigateAdmin').click();
}

export {}