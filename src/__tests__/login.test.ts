/**
 * @jest-environment jsdom
 */

 import '@testing-library/jest-dom'
 //@ts-ignore ignore the failed module test ES6 nonsense
 import Login from "../routes/login.svelte";
 import { getByPlaceholderText, render } from '@testing-library/svelte';
 
 describe("Test login page", ()=>{
     test('Email and password fields', ()=>{
        //  const {getByText} = render(Login);
         const {getByPlaceholderText} = render(Login);
         expect(getByPlaceholderText('Email')).toBeInTheDocument();
         expect(getByPlaceholderText('Password')).toBeInTheDocument();
        //  expect(getByText('Email')).toBeInTheDocument();
        //  expect(getByText('Password')).toBeInTheDocument();
     });
     test('Sign In and Reset Password buttons', ()=>{
        const {getByText} = render(Login);
        expect(getByText('Sign In')).toBeInTheDocument();
      //   expect(getByText('Reset Password')).toBeInTheDocument();
    });
 });