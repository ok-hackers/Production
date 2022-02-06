/**
 * @jest-environment jsdom
 */

 import '@testing-library/jest-dom'
 //@ts-ignore ignore the failed module test ES6 nonsense
 import Results from "../Comps/resultsButton.svelte";
 import { render } from '@testing-library/svelte';
 
 describe("Test results button", ()=>{
     test('Does "Results" button exist', ()=>{
         const {getByText} = render(Results);
         expect(getByText('Results')).toBeInTheDocument();
     });
 });