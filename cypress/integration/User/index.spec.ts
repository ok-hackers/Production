import signInAsUser from './loginuser'

describe('Homepage Test', ()=>{
    it('test home page', ()=>{
        signInAsUser();
        
        cy.get('title').then(($title)=>{
            const txt = $title.text();
            expect(txt).toEqual("SVC HackLabs Login Page")
        })
        
    })
})

export {}