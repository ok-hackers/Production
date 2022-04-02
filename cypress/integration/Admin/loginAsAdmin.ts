/*
    Author: Nate Fabian
    Date: 2/15/22
    Purpose: cypress login as admin export function to be used in other tests
*/

export default function loginAsAdmin() {
    cy.visit('http://localhost:3000/');
    cy.get('#TempLoginButton').click();
    cy.wait(200);
    cy.get('#email').type('nathan.fabian@stvincent.edu');
    cy.get('#password').type('testing');
    cy.wait(1000);
    cy.get('#quickstart-sign-in').click();
}