export default function loginAsCypress() {
    cy.visit('http://localhost:3000/');
    //cy.get('#TempLoginButton').click();
    cy.wait(1000);
    cy.get('#email').type('cypress@test.com');
    cy.get('#password').type('testing');
    cy.wait(1000);
    cy.get('#quickstart-sign-in').click();
    cy.get('#NavigateAdmin').click();
}