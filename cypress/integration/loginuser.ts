export default function signInAsUser() {
	cy.visit('localhost:3000');
	cy.get('#login1').click();
	cy.wait(2000);

	cy.visit('localhost:3000/login');
	cy.get('#email').type('joshua.secrist@stvincent.edu');
	cy.get('#password').type('test123');
	cy.wait(2000);
	cy.get('#quickstart-sign-in').click();
	cy.wait(2000);
	cy.get('#User').click();
}
