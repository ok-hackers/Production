/**
 * @jest-environment jsdom
 */

 import '@testing-library/jest-dom'
 //@ts-ignore ignore the failed module test ES6 nonsense
 import InitialPassword from "../routes/User/initialPassword.svelte";
 import { screen, getByRole, getByPlaceholderText, render } from '@testing-library/svelte';
 
 describe("Test initial password page", ()=>{
     test('Password and Confirm Password fields', ()=>{
         const {getByPlaceholderText} = render(InitialPassword);
         expect(getByPlaceholderText('Password')).toBeInTheDocument();
         expect(getByPlaceholderText('Confirm Password')).toBeInTheDocument();
     });
     test('Change Password button', ()=>{
        const {getByText} = render(InitialPassword);
        expect(getByText('Change Password')).toBeInTheDocument();
    });
    test('Change Password button', ()=>{
        const {getByText} = render(InitialPassword);
        const heading = screen.getByRole('heading', { 
            name: /Welcome to HackLabs! Please Create a New Password./
          });
          expect(heading).toBeInTheDocument();
    });
 });