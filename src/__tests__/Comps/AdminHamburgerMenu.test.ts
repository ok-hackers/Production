/**
 * @jest-environment jsdom
 */

 import '@testing-library/jest-dom'
 import Hamburger from '../../Comps/AdminHamburgerMenu.svelte';
 import { render } from '@testing-library/svelte';
import { fireEvent } from '@testing-library/dom';
 
 describe("Test Hamburger Menu", ()=>{
     test('Test Expand Button', async ()=>{
        const { getByLabelText } = render(Hamburger);
        const button = getByLabelText('ExpandHamburgerMenu');
        const menu = getByLabelText('HamburgerMenu');

        await fireEvent.click(button);

        expect(menu.classList[1]).toEqual("expand");

        await fireEvent.click(button);

        expect(menu.classList[1]).toEqual(undefined);
     });
 });