import signInAsUser from './loginuser';

describe('Test', () => {
	it('user settings change password success', () => {
		signInAsUser();
		cy.get(
			'#svelte > div:nth-child(1) > div > main > div > div > div.mdl-card__supporting-text.mdl-color-text--grey-600.s-ybJkPrDeBJRj > a'
		).click();

		cy.get('#changepwbutton1').click();
		cy.get('#curPassword').type('test123');
		cy.get('#newPassword').type('test123');
		cy.get('#confirmPassword').type('test123');
		cy.get('#changepwbutton2').click();
		cy.on('window:alert', (txt) => {
			expect(txt).toEqual('Password Updated Successfully');
		});
	});

	it('user settings change password failed', () => {
		signInAsUser();
		cy.get(
			'#svelte > div:nth-child(1) > div > main > div > div > div.mdl-card__supporting-text.mdl-color-text--grey-600.s-ybJkPrDeBJRj > a'
		).click();

		cy.get('#changepwbutton1').click();
		cy.get('#curPassword').type('test123');
		cy.get('#newPassword').type('test123');
		cy.get('#confirmPassword').type('wrongpw');
		cy.get('#changepwbutton2').click();
		cy.on('window:alert', (txt) => {
			expect(txt).toEqual('Passwords do not match');
		});
	});
});

export {};
