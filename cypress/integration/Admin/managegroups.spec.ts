//cypress test for the manage groups page

//author: Josh Secrist

//02-10-22

//pulls in logInAsAdmin function from the logInAsAdmin file

import LoginAsAdmin from './loginAsAdmin';

describe('Manage Groups Page Tests', () => {
	it('manage groups create group button', () => {
		LoginAsAdmin();
		cy.get('#ManageGroups').click();
		cy.get('#create_group_button').click();
	});
	//beware that this actually deletes a group that will need replaced
	it('manage groups delete group button', () => {
		LoginAsAdmin();
		cy.get('#ManageGroups').click();
		cy.get('#deleteButton0').click();
	});
	it('manage groups confirm delete group button', () => {
		LoginAsAdmin();
		cy.get('#ManageGroups').click();
		cy.get('#deleteButton0').click();
		cy.get('#deletegroupsurebutton').click();
	});
	it('manage groups cancel delete group button', () => {
		LoginAsAdmin();
		cy.get('#ManageGroups').click();
		cy.get('#deleteButton0').click();
		cy.get('#cancelButton').click();
	});
	it('manage groups manage group button', () => {
		LoginAsAdmin();
		cy.get('#ManageGroups').click();
		cy.get('#manageButton0').click();
	});
	it('manage groups manage search bar failure', () => {
		LoginAsAdmin();
		cy.get('#ManageGroups').click();
		cy.get('#group0')
			.invoke('text')
			.then((text1) => {
				cy.get('#search_bar').type('nothere{enter}');
				cy.get('#group0')
					.invoke('text')
					.should((text2) => {
						expect(text1).toEqual(text2);
					});
			});
	});
	it('manage groups manage search bar success', () => {
		LoginAsAdmin();
		cy.get('#ManageGroups').click();
		cy.wait(5000);
		cy.get('.groupName1').then((element) => {
			let text = element.text();

			cy.get('#search_bar').type(text + '{enter}');
			cy.wait(500);

			cy.get('.groupName0').then((element2) => {
				expect(element2.text()).toEqual(text);
			});
		});
	});
});
