// Author(s): Lane Wilkerson
// Last Modified: 02/22/2022
// Purpose: Logs in the 'cypress' user. This function can be called in any Cypress test
export default function LoginAsCypress() {
    cy.visit('http://localhost:3000/login');
    cy.wait(1000);
    cy.get('#email').type('cypress@test.com');
    cy.get('#password').type('testing');
    cy.wait(1000);
    cy.get('#quickstart-sign-in').click();
    cy.get('#NavigateAdmin').click();
}