import {get} from "../../routes/LearnYourNumbers/[slug]";

describe("Test Backend File", ()=>{
    for (let i = 1; i < 5; i++) {
        test(`Test slug ${i}`, (done)=>{
            let expectedReturn = {body: {
                "Number":i
            }};
            try {
                let testReturn = get({params: {slug: i.toString()}});

                console.log(testReturn);

                expect(testReturn).resolves.toStrictEqual(expectedReturn);
                done();
            } catch (error){
                done(error)
            }
        });
    }

    test(`Test wrong Number Slug`, (done)=>{
        let expectedReturn = {body: {
            "Number":"We have no idea"
        }};
        try {
            let testReturn = get({params: {slug: "-1"}});

            console.log(testReturn);

            expect(testReturn).resolves.toStrictEqual(expectedReturn);
            done();
        } catch (error){
            done(error)
        }
    });

    test(`Test no Number Slug`, (done)=>{
        let expectedReturn = {body: {
            "Number":"We have no idea"
        }};
        try {
            let testReturn = get({params: {slug: ""}});

            console.log(testReturn);

            expect(testReturn).resolves.toStrictEqual(expectedReturn);
            done();
        } catch (error){
            done(error)
        }
    });
});