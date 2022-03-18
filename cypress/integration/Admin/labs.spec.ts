//Author: Lane Wilkerson
//Last Modified: 3/17/2022
//DB Dependancies: "Delete me for tests" lab (Published: 0), "Unpublish me for tests" lab (Published: 1), "Publish me for tests" lab (Published: 0),
//                 and a lab that starts with "Wireshark" in the name
//RESTORE THE DB AFTER RUNNING THIS TEST

import LoginAsAdmin from './loginAsAdmin'

describe('Test Labs Page', ()=>{
    it('Create Lab button', ()=>{
        LoginAsAdmin()
        cy.get('#NavigateLabs').click()
        cy.get('#createLab').click()
        cy.url().should('include', 'createLab')
    })
    it('Publish Lab button', ()=>{
        LoginAsAdmin()
        cy.get('#NavigateLabs').click()
        cy.get('#searchBar').type('Publish{enter}')
        cy.get('#publishLab0').click()
        cy.wait(1500)
        cy.on('window:alert', (str)=>{
			expect(str).toEqual("Lab has been published");
		})
        cy.wait(1000)
        cy.visit('http://localhost:3000/login');
    })
    it('Unpublish Lab button', ()=>{
        LoginAsAdmin()
        cy.get('#NavigateLabs').click()
        cy.get('#searchBar').type('Unpublish{enter}')
        cy.get('#unpublishLab0').click()
        cy.wait(1500)
        cy.on('window:alert', (str)=>{
			expect(str).toEqual("Lab has been unpublished");
		})
        cy.wait(1000)
        cy.visit('http://localhost:3000/login');
    })
    //Note: this test will delete the 4th lab in the DB
    it('Delete Lab button', ()=>{
        LoginAsAdmin()
        cy.get('#NavigateLabs').click()
        cy.get('#searchBar').type('Delete{enter}')
        cy.get('#deleteLab0').click()
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
        cy.wait(1000)
        cy.visit('http://localhost:3000/login');
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