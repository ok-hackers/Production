//cypress test for the create groups pop-up

//author: Josh Secrist

//02-22-22

//pulls in logInAsAdmin function from the logInAsAdmin file

import LoginAsAdmin from './loginAsAdmin';

describe('Manage Groups Page Tests', () => {
	it('create groups x button', () => {
		LoginAsAdmin();
		cy.get('#ManageGroups').click();
		cy.get('#create_group_button').click();
		cy.get('#xButton').click();
	});
	it('create groups x button', () => {
		LoginAsAdmin();
		cy.get('#ManageGroups').click();
		cy.get('#create_group_button').click();
		cy.get('#groupName').type('testgroup789');
	});
	it('select user button test', () => {
		LoginAsAdmin();
		cy.get('#ManageGroups').click();
		cy.get('#create_group_button').click();
		cy.get('#userCheckbox0').click();
	});
});
