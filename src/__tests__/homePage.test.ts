/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom'
//@ts-ignore ignore the failed module test ES6 nonsense
import Homepage from "../routes/User/index.svelte";
import { render } from '@testing-library/svelte';

describe("Test home page", ()=>{
    test('Is a user signed in', ()=>{
        const {getByText} = render(Homepage);
        expect(getByText('Sign Out')).toBeInTheDocument();
    });
});