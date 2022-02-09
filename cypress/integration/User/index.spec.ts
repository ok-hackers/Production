describe('Homepage Test', ()=>{
    it('test home page', ()=>{
        cy.visit('http://localhost:3000/login'); //visit login page
        cy.get('#email').type('lane.wilkerson@stvincent.edu')
        cy.get('#password').type('testing123')
        cy.get('#quickstart-sign-in').click() //signing user in
        cy.get('#NaviagateUser').click() //going to user home page
        
        cy.get('title').then(($title)=>{
            const txt = $title.text();
            expect(txt).toEqual("SVC HackLabs Login Page")
        })
        
    })
})

export {}