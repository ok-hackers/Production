import loginAsAdmin from './loginAsAdmin';
import 'cypress-file-upload';

let defaultUserInfo = {
	FirstName: "cypress",
	LastName: "User",
	Email: "cypress@cy.com",
	Password: "testing",
}

describe('create User Page', ()=>{
	it('single create user', ()=>{
		loginAsAdmin();

		cy.get('#CreateUserPage').click();
		cy.wait(200);
		cy.get('#singleFirstName').type(defaultUserInfo.FirstName);
		cy.get('#singleLastName').type(defaultUserInfo.LastName);
		cy.get('#singleEmail').type(defaultUserInfo.Email);
		cy.get('#singleUserPassword').type(defaultUserInfo.Password);
		cy.get('#SingleGroupSelection').select('atestgroup');
		cy.wait(50);
		cy.get('#addSingle').click();

		cy.on('window:alert', ($txt) => {
			expect($txt).toEqual('User Created');
		});
	});

	it('multi create user', ()=>{
		loginAsAdmin();
		cy.get('#CreateUserPage').click();

		cy.get('#CSVUpload').attachFile('demoUser.csv');
		cy.wait(1000);
		cy.get('#addMany').click();
		cy.on('window:alert', ($txt) => {
			expect($txt).toEqual('User Created');
		});
	})
})