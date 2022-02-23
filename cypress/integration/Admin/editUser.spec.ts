import LoginAsAdmin from './logInAsAdmin';

describe('Test Edit User Page', () => {
	it('Save button', () => {
		LoginAsAdmin();
		cy.get('#NavigateEditUser').click();
		cy.get('#fName').type('Cypress');
		cy.get('#lName').type('Tester');
		cy.get('#username').type('cypress@test.com');
		cy.get('#password').type('testing');
		cy.get('#saveUser').click();
		cy.on('window:alert', ($txt) => {
			expect($txt).toEqual('Profile name updated');
			expect($txt).toEqual('Username updated');
			expect($txt).toEqual('Password updated');
		});
		cy.url().should('include', 'Admin');
	});
	it('Delete button', () => {
		LoginAsAdmin();
		cy.get('#NavigateEditUser').click();
		cy.get('input[name="fName"').invoke('attr', 'placeholder').should('contain', 'Cypress');
		cy.get('input[name="lName"').invoke('attr', 'placeholder').should('contain', 'Tester');
		cy.get('input[name="username"')
			.invoke('attr', 'placeholder')
			.should('contain', 'cypress@test.com');
		cy.get('input[name="password"').invoke('attr', 'placeholder').should('contain', '**********');
		cy.get('#delete').click();
		cy.on('window:alert', ($txt) => {
			expect($txt).toEqual('User deleted');
		});
		cy.wait(1000);
		cy.url().should('include', 'Admin');
	});
});
