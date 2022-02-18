describe('Login test', ()=>{
    it('test login page', ()=>{
        cy.visit('http://localhost:3000/login'); //visit login page
        cy.get('#email').type('lane.wilkerson@stvincent.edu')
        cy.get('#password').type('testing123')
        cy.get('#quickstart-sign-in').click() //signing user in
        
        cy.url().should('include', 'Bouncer')
        
    })
})


export {}