import {get} from '../routes/APIs/Labs/getAllLabMetaData'

describe('Test getting all Meta Data', ()=>{
    test('get all lab meta data and make sure it has values', async ()=>{
        let data = await get();

        expect(data).toBeDefined();
    })
})