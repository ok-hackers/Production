/*
    Author: Nate Fabian
    Date: 1/18/22
    Purpose: Demo test to show how to spoof a backend api test with jest
*/

import {get} from "../routes/backend";

describe("Test Backend File", ()=>{
    test('Get API Hit', (done)=>{
        let expectedReturn = {body: {
            "Message":"Hello World"
        }};
        try {
            let testReturn = get({params:""});

            expect(testReturn).resolves.toStrictEqual(expectedReturn);
            done();
        } catch (error){
            done(error)
        }
    });
});