describe('Test', ()=>{
    it('test render app', ()=>{
        cy.visit('http://localhost:3000/'); //visit base site
        
        cy.get('#TempLoginButton').click();

        cy.wait(5000);

        cy.url().should('include', 'login');
    })
})

export {}