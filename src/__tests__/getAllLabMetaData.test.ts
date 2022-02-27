/*
    Author: Nate Fabian
    Date: 2/13/22
    Purpose: Exercise the get all lab meta data API to make sure it returns something
*/

import {get} from '../routes/APIs/Labs/getAllLabMetaData'

describe('Test getting all Meta Data', ()=>{
    test('get all lab meta data and make sure it has values', async ()=>{
        let data = await get();

        expect(data).toBeDefined();
    })
})