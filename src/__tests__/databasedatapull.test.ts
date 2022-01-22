import { databaseGetCall } from '../Lib/DatabaseDatapull';

describe('Test database data pull', () => {
	test('Database pull test', (done) => {
		try {
			let userdata = databaseGetCall();

			userdata.then((result)=>{
				console.log(result);
				done();
			})

			//expect(userdata).toBe(!null);

			//done();
		} catch (databasePullError) {
			done(databasePullError);
		}
	});
});
