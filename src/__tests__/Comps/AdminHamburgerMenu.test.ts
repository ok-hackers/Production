/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import Hamburger from '../../Comps/AdminHamburgerMenu.svelte';
import { render } from '@testing-library/svelte';
import { fireEvent } from '@testing-library/dom';

describe('Test Hamburger Menu', () => {
	test('Test Expand Button', async () => {
		const { getByLabelText } = render(Hamburger);
		const button = getByLabelText('ExpandHamburgerMenu');
		const menu = getByLabelText('HamburgerMenu');

		await fireEvent.click(button);

		expect(menu.classList[1]).toEqual('expand');

		await fireEvent.click(button);

		expect(menu.classList[1]).toEqual(undefined);
	});

    test('Test Create/Edit Lab Button', async () => {
		const { getByLabelText } = render(Hamburger);
		const expandButton = getByLabelText('ExpandHamburgerMenu');
		const link = getByLabelText('Create/Edit Labs') as HTMLAnchorElement;

        expect(link.href).toMatch(/\/Admin\/CreateLab/);

		await fireEvent.click(expandButton);

		expect(link.href).toMatch(/\/Admin\/CreateLab/);
	});

    test('Test Evaluate Labs Button', async () => {
		const { getByLabelText } = render(Hamburger);
		const expandButton = getByLabelText('ExpandHamburgerMenu');
		const link = getByLabelText('Evaluate Labs') as HTMLAnchorElement;

        expect(link.href).toMatch(/\/Admin\/EvaluateLabs/);

		await fireEvent.click(expandButton);

		expect(link.href).toMatch(/\/Admin\/EvaluateLabs/);
	});

    test('Test Manage Groups Button', async () => {
		const { getByLabelText } = render(Hamburger);
		const expandButton = getByLabelText('ExpandHamburgerMenu');
		const link = getByLabelText('Manage Groups') as HTMLAnchorElement;

        expect(link.href).toMatch(/\/Admin\/ManageGroup/);

		await fireEvent.click(expandButton);

		expect(link.href).toMatch(/\/Admin\/ManageGroup/);
	});

    test('Test Manage Users Lab Button', async () => {
		const { getByLabelText } = render(Hamburger);
		const expandButton = getByLabelText('ExpandHamburgerMenu');
		const link = getByLabelText('Manage Users') as HTMLAnchorElement;

        expect(link.href).toMatch(/\/Admin\/ManageUsers/);

		await fireEvent.click(expandButton);

		expect(link.href).toMatch(/\/Admin\/ManageUsers/);
	});

    test('Test Logout Button', async () => {
		const { getByLabelText } = render(Hamburger);
		const expandButton = getByLabelText('ExpandHamburgerMenu');
		const link = getByLabelText('Manage Users') as HTMLAnchorElement;

		await fireEvent.click(expandButton);

		//expect auth.current user to be null
        //expect location.href to be signin
	});
});
