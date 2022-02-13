import LoginAsAdmin from './logInAsAdmin';

describe('Manage Groups Page Tests', () => {
	it('manage groups create group button', () => {
		LoginAsAdmin();
		cy.get('#ManageGroups').click();
		cy.get('#create_group_button').click();
	});
	it('manage groups delete group button', () => {
		LoginAsAdmin();
		cy.get('#ManageGroups').click();
		cy.get('#deleteButton0').click();
	});
	it('manage groups manage group button', () => {
		LoginAsAdmin();
		cy.get('#ManageGroups').click();
		cy.get('#manageButton0').click();
	});
});
