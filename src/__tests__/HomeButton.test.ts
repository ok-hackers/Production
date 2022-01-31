/**
 * @jest-environment jsdom
 */

 import '@testing-library/jest-dom'
 //@ts-ignore ignore the failed module test ES6 nonsense
 import Index from '../Comps/HomeButton.svelte';
 import { render } from '@testing-library/svelte';
 
 describe("Test button controls", ()=>{
     test('"Did you?" button', ()=>{
         const {getByLabelText} = render(Index);
         let homebutton = getByLabelText('home button') as HTMLAnchorElement
         expect(homebutton.href).toEqual("http://localhost/Student_Homepage");
     })
    })