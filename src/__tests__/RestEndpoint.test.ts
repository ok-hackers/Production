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