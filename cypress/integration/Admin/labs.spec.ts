import LoginAsAdmin from './logInAsAdmin'

describe('Test Labs Page', ()=>{
    it('Create Lab button', ()=>{
        LoginAsAdmin()
        cy.get('#NavigateLabs').click()
        cy.get('#createLab').click()
        cy.url().should('include', 'createLab')
    })

    //Note: this test will delete the 4th lab in the DB
    it('Unpublish Lab button', ()=>{
        LoginAsAdmin()
        cy.get('#NavigateLabs').click()
        cy.get('#unpublishLab3').click()
        cy.wait(1500)
        cy.on('window:alert', (str)=>{
			expect(str).toEqual("Lab has been deleted");
		})
    })

    it('Edit Lab button', ()=>{
        LoginAsAdmin()
        cy.get('#NavigateLabs').click()
        cy.get('#editLab0').click()
        cy.url().should('include', 'editLab-')

    })
    //Note: This test will fail if there is no lab named "Wireshark ....."
    it('Search bar', ()=>{
        LoginAsAdmin()
        cy.get('#NavigateLabs').click()
        cy.get('#searchBar').type('Wireshark{enter}')
        cy.get('.labName0').then(($name)=>{
            const txt = $name.text();
            expect(txt).toContain("Wireshark")
        })
    })
});