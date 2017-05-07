var chai = require('chai'),
	chaiHttp = require('chai-http'),
	app = require('../../app/app.spec');



	chai.should();
	chai.use(chaiHttp);

	/**
	 *	/places endpoint
	 *	It returns list of places around specified location.
	 */
	describe('/GET /places', () => {

		it('it should return 500 if latitude parameter is not provided.', (done) => {

			/*
			 * code = 500
			 * message = Place location must be provided!
			 * should not have data property
			 */

		});

		it('it should return 500 if longitude parameter is not provided.', (done) => {

			/*
			 * code = 500
			 * message = Place location must be provided!
			 * should not have data property
			 */
			
		});

		it('it should return list of places around.', (done) => {
			
			/*
			 * code = 200
			 * message = SUCCESS
			 * data is array
			 */


		});		

	});

	/**
	 *	/places/detail/ endpoint
	 *	It returns list of tweets posted and media shared around specified place.
	 */
	describe('/GET /places/detail/', () => {

		it('it should return 500 if latitude parameter is not provided.', (done) => {

			/*
			 * code = 500
			 * message = Place location must be provided!
			 * should not have data property
			 */
		});

		it('it should return 500 if longitude parameter is not provided.', (done) => {
			
			/*
			 * code = 500
			 * message = Place location must be provided!
			 * should not have data property
			 */			

		});

		it('it should return list of places around.', (done) => {
			
			/*
			 * code = 200
			 * message = SUCCESS
			 * data is array
			 * data should have prop tweets
			 * data should have prop media
			 */

		});		

	});	