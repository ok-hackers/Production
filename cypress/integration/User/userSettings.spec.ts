import signInAsUser from './loginuser';

describe('User Settings Page Tests', () => {
	it('user settings change password success', () => {
		signInAsUser();
		cy.get(
			'#userSettings'
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
			'#userSettings'
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

	it('user settings change username success', () => {
		signInAsUser();
		cy.get(
			'#userSettings'
		).click();

		cy.get('#namefield').type('bilbo baggins');
		cy.on('window:alert', (txt) => {
			expect(txt).toEqual("Your name has been changed. You're welcome");
		});
	});

	it('user settings change username failure', () => {
		signInAsUser();
		cy.get(
			'#userSettings'
		).click();

		cy.get('#namefield').type('bilbobaggins');
		cy.on('window:alert', (txt) => {
			expect(txt).toEqual(
				"Name must contain fistname followed by a space and then last name. Please don't include multiple spaces or a middle name. Thanks!"
			);
		});
	});
});

export {};
