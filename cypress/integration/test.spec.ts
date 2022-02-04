describe('Test', ()=>{
    it('test render app', ()=>{
        cy.visit('http://localhost:3000/'); //visit base site
        
        cy.get('h1').then(($heading)=>{
            const txt = $heading.text();
            expect(txt).toEqual("Welcome to SvelteKit")
        })
        
    })
})

export {}