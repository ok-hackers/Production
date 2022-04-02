//Author: Lane Wilkerson
//Last Modified: 03/24/2022
//Purpose: Ensure that the return home button exists, and returns the user to the home page when clicked.

//Note: Everytime a lab changes, the test will need updated. The test must go thru a lab to get to Return Home button

import loginUser from './loginuser';

describe('Completed Lab page', () => {
	it('Return Home button', () => {
		loginUser();
		cy.get('#demo').click();
		cy.get('#checkbox').click();
		cy.get('#nextButton').click();
		cy.get('#checkbox').click();
		cy.get('#nextButton').click();
		cy.get('#completeLab').click();
		cy.wait(500);
		cy.url().should('include', '/User/labComplete');
		cy.get('#returnHome').click();
		cy.url().should('include', '/User');
	});

	it('Back Button', () => {
		loginUser();
		cy.get('#demo').click();
		cy.get('#backButton').click();
	});
});
