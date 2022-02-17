import LoginAsAdmin from './logInAsAdmin'

describe('Test Labs Page', ()=>{
    it('Create Lab button', ()=>{
        LoginAsAdmin();
        cy.get('#NavigateLabs').click();
        cy.get('#createLab').click();
        cy.url().should('include', 'createLab')
    })

    it('Unpublish Lab button', ()=>{
        LoginAsAdmin();
        cy.get('#NavigateLabs').click();
        cy.get('#unpublishLab').then(($unpublish)=>{
            const txt = $unpublish.text();
            expect(txt).toEqual("Unpublish Lab")
        })
    })

    it('Edit Lab button', ()=>{
        LoginAsAdmin();
        cy.get('#NavigateLabs').click();
        cy.get('#editLab').then(($edit)=>{
            const txt = $edit.text();
            expect(txt).toEqual("Edit Lab")
        })
    })
});