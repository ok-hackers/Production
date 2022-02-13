import LoginAsAdmin from './logInAsAdmin';
import 'cypress-file-upload'


let labData = {
	name: 'Cypress automated lab test',
	dueDate: '2022-05-05',
	description: 'This is what we would call a big brain move.',
	fileImageName: 'TempLabImage.JPG'
}

let createEditSwitch = true;

describe('Test create and edit lab pages', () => {
	it('Create Lab pass', () => {
		LoginAsAdmin();
		cy.get('#NavigateCreateLab').click();
		fillLabData();
		cy.get('#Next').click();
		cy.url().should('include',`documentLab-`);
	});
	it('Create Lab fail', () => {
		LoginAsAdmin();
		cy.get('#NavigateCreateLab').click();
		fillBadLabData();
	});
	it('Edit Lab pass', () => {
		LoginAsAdmin();
		cy.get('#NavigateEditLab').click();

		cy.get('.fileUpload').attachFile(labData.fileImageName);

		cy.get('#Next').click();
		cy.url().should('include',`documentLab-`);
	});
	it('Edit Lab fail', () => {
		LoginAsAdmin();
		cy.get('#NavigateEditLab').click();
		cy.get('#Next').click;
		cy.on('window:alert', (str)=>{
			expect(str).toEqual("please ensure that all fields are filled in");
		})
	});
});

function fillLabData() {
	cy.get('.name').type(labData.name);
	cy.get('.dueDate').type(labData.dueDate);
	cy.get('.description').type(labData.description);
	cy.get('.fileUpload').attachFile(labData.fileImageName);
	cy.wait(1000);
}

function fillBadLabData() {
	BadLabData(1)
	BadLabData(2)
	BadLabData(3)
	cy.get('#Next').click();
	cy.on('window:alert', (str)=>{
		expect(str).toEqual("please ensure that all fields are filled in");
	})
	cy.reload()
	LoginAsAdmin();
	cy.get('#NavigateCreateLab').click();
	BadLabData(1)
	BadLabData(3)
	BadLabData(4)
	cy.get('#Next').click();
	cy.on('window:alert', (str)=>{
		expect(str).toEqual("please ensure that all fields are filled in");
	})
}

function BadLabData(i) {
	switch (i) {
		case 1: {
			cy.get('.name').type(labData.name);
			break;
		}
		case 2: {
			cy.get('.dueDate').type(labData.dueDate);
			break;
		}
		case 3: {
			cy.get('.description').type(labData.description);
			break;
		}
		case 4: {
			cy.get('.fileUpload').attachFile(labData.fileImageName);
			break;
		}
	}
	cy.wait(1000);
}

export {}