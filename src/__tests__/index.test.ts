/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom'
//@ts-ignore ignore the failed module test ES6 nonsense
import Index from '../routes/index.svelte';
import { render } from '@testing-library/svelte';

describe("Test if jest is working", ()=>{
    test('Welcome', ()=>{
        const {getByText} = render(Index);
        expect(getByText('Welcome to SvelteKit')).toBeInTheDocument();
    });
});