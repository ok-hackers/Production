import loginAsAdmin from './loginAsAdmin'

describe('Test Edit LabDocumentationPage',()=>{
	it('Test controlls', ()=>{
		loginAsAdmin();

		cy.get("#NavigateEditLab").click();
		cy.wait(500);
		cy.get('#Next').click();
		cy.wait(3000);
		cy.get('.deleteMe').each(($li, index, $lis)=>{
			$li.trigger('click');
		});

		cy.wait(200);

		cy.get('#AddQuestion').click();
		cy.get('.Question').should('be.visible');

		cy.get('#AddDocumentation').click();
		cy.get('.Documentation').should('be.visible');

		cy.get('.ql-editor').each(($li, index, $lis)=>{
			$li.text("this is data written by cypress");
		});

		/*
		cy.get('.Answer').then((elm)=>{
			cy.wrap(elm).type('cypress answer');
		});
		*/

		cy.get('.Answer').each(($li, index, $lis)=>{
			cy.wrap($li).type(`cypress answer ${index} `);
		});

		cy.get('.Answer').each(($li, index, $lis)=>{
			cy.wrap($li).type(`cypress answer ${index} `);
		});

		cy.get('.next').click();
		cy.url().should('include', '/Admin');
	})
})