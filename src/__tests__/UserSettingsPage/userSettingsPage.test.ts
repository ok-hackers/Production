/**
 * @jest-environment jsdom
 */

import {get} from "../../routes/APIs/UserSettings/[newUser]-[currentUser]-[auth]"

import '@testing-library/jest-dom';
import userSettings from '../../routes/userSettings.svelte';
import { render } from '@testing-library/svelte';
import { fireEvent } from '@testing-library/dom';

describe("Test User Settings Page", ()=> {
    test('API test for name change function', (done)=> {
        let expectedReturn = {
            body: {
                data: "nameChanged"
            }
        };
        try {
            let testReturn = get({params: {newUser: "foo bar", currentUser: "testUser", auth: "authentication"}})

            expect(testReturn).resolves.toStrictEqual(expectedReturn);
            done();
        }
        catch(error){
            done(error);
        };
    })

    /*test('Save Settings Button Click Test', async () => {
        const { getByLabelText } = render(userSettings);
        const button = getByLabelText("Save Setting Button");
        const nameInput = getByLabelText("Change Password Button") as HTMLInputElement;

        nameInput.value= "bilbo baggins";
        await fireEvent.click(button);

        expect(alert.toString).toStrictEqual("Your name has been changed. You're welcome");

    })
    */
});