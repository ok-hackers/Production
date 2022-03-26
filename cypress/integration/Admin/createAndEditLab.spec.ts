/*
    Author: Nate Fabian
    Date: 2/13/22
    Purpose: cypress test to create and edit a lab
*/

import LoginAsAdmin from './loginAsAdmin';
import 'cypress-file-upload';

let labData = {
	name: 'Cypress automated lab test',
	dueDate: '2022-05-05',
	description: 'This is what we would call a big brain move.',
	fileImageName: 'TempLabImage.JPG'
};

let createEditSwitch = true;

describe('Test create and edit lab pages', () => {
	it('Create Lab pass', () => {
		LoginAsAdmin();
		cy.get('#NavigateLabs').click();
		cy.get('#createLab').click();
		fillLabData();
		cy.get('#Next').click();
		cy.url().should('include', `documentLab-`);
	});
	it('Create Lab fail', () => {
		LoginAsAdmin();
		cy.get('#NavigateLabs').click();
		cy.get('#createLab').click();
		fillBadLabData();
	});
	it('Edit Lab pass', () => {
		LoginAsAdmin();
		cy.get('#NavigateLabs').click();
		cy.get('#editLab1').click();

		cy.get('.fileUpload').attachFile(labData.fileImageName);
		cy.wait(200);
		cy.get('#Next').click();
		cy.url().should('include', `documentLab-`);
	});
	it('Edit Lab fail', () => {
		LoginAsAdmin();
		cy.get('#NavigateLabs').click();
		cy.get('#editLab1').click();
		cy.get('#Next').click();
		cy.on('window:alert', (str) => {
			expect(str).toEqual('please ensure that all fields are filled in');
		});
	});

	it('Create Lab test save', () => {
		LoginAsAdmin();
		cy.get('#NavigateLabs').click();
		cy.get('#createLab').click();
		cy.get('.name').type('Save Button Test');
		cy.get('.saveButton').click();
		cy.wait(200);
		cy.url().should('eq', 'http://localhost:3000/Admin');
	});

	it('Edit Lab test save', () => {
		LoginAsAdmin();
		cy.get('#NavigateLabs').click();
		cy.get('#editLab1').click();
		cy.wait(200);
		cy.get('.saveButton').click();
		cy.wait(200);
		cy.url().should('eq', 'http://localhost:3000/Admin');
	});
});

function fillLabData() {
	//fill in lab data

	cy.get('.name').type(labData.name);
	cy.get('.dueDate').type(labData.dueDate);
	cy.get('.description').type(labData.description);
	cy.get('.fileUpload').attachFile(labData.fileImageName);
	cy.wait(200);
}

function fillBadLabData() {
	//fill in lab data missing one value each time to test fail condition

	BadLabData(1);
	BadLabData(2);
	BadLabData(3);
	cy.get('#Next').click();
	cy.on('window:alert', (str) => {
		expect(str).toEqual('please ensure that all fields are filled in');
	});
	cy.reload();
	LoginAsAdmin();
	cy.get('#NavigateLabs').click();
	cy.get('#createLab').click();
	BadLabData(1);
	BadLabData(3);
	BadLabData(4);
	cy.get('#Next').click();
	cy.on('window:alert', (str) => {
		expect(str).toEqual('please ensure that all fields are filled in');
	});
}

function BadLabData(i) {
	//fill in lab data based on the number provided from 1-4 for each field

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
	cy.wait(200);
}

export {};
