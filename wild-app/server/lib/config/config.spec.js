var chai = require('chai'),
	assert = chai.assert,
	expect = chai.expect,
	config = require('./config').getConfig();
	
	chai.should();

	/**
	 *	/places endpoint
	 *	It returns list of places around specified location.
	 */
	describe('CONFIG', () => {

		/**
		 *	Set operation.
		 */
		describe('SET', () => {

			// Set config value to null before each test.
			beforeEach((done) => {

				config.set('key', null);
				done();
			});

			it('it should return true for setting number.', (done) => {

				var result = config.set('key', 2);
				assert.equal(result, true);
				done();
			});

			it('it should return true for setting string.', (done) => {

				var result = config.set('key', 'value');
				assert.equal(result, true);
				done();
			});

			it('it should return true for setting object.', (done) => {

				var result = config.set('key', {foo: 'bar'});
				assert.equal(result, true);
				done();
			});						

			it('it should throw error if key is not specified.', (done) => {
				
				expect(()=>{

					config.set(null, 'value')

				}).to.throw('key parameter does not exist or not a string');
				
				done();
			});

			it('it should throw error if key is not type of string.', (done) => {
				
				expect(()=>{

					config.set(1, 'value')

				}).to.throw('key parameter does not exist or not a string');
				
				done();
			});	

			it('it should throw error if value is undefined.', (done) => {

				expect(()=>{

					config.set('key', undefined)

				}).to.throw('undefined value parameter');
				
				done();

			});									

		});

		/**
		 *	Get operation.
		 */
		describe('GET', () => {

			it('it should return null if key is not specified.', (done) => {

				var result = config.get();
				assert.equal(result, null);
				done();

			});

			it('it should return value matches with specified key.', (done) => {
				
				config.set('key', 'value');
				var result = config.get('key');
				assert.equal(result, 'value');
				done();

			});			

		}); 

	});