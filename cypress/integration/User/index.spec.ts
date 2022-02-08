describe('Homepage Test', ()=>{
    it('test home page', ()=>{
        cy.visit('http://localhost:3000/'); //visit base site
        cy.get('#email').type('lane.wilkerson@stvincent.edu')
        cy.get('#password').type('testing123')
        cy.get('')
        
        cy.get('h1').then(($heading)=>{
            const txt = $heading.text();
            expect(txt).toEqual("Welcome to SvelteKit")
        })
        
    })
})

export {}