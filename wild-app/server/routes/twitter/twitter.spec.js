var chai = require('chai'),
	chaiHttp = require('chai-http'),
	app = require('../../app/app.spec');



	chai.should();
	chai.use(chaiHttp);

	/**
	 *	/twitter/send endpoint
	 *	It posts a new tweet with given body.
	 */
	describe('/POST /twitter/send', () => {

		it('it should return 500 if body is empty.', (done) => {

			/*
			 * code = 500
			 * message = Request body cannot be null!
			 * should not have data property
			 */

		});


		it('it should post tweet.', (done) => {
			
			/*
			 * code = 200
			 * message = SUCCESS
			 * should not have data prop.
			 */


		});		

	});

	/**
	 *	/twitter/profile endpoint
	 *	It returns basic profile information of specified user.
	 */
	describe('/GET /twitter/profile', () => {

		it('it should return 500 if id parameter is not provided in query.', (done) => {

			/*
			 * code = 500
			 * message = User id must be provided!
			 * should not have data property
			 */

		});


		it('it should return profile information of user.', (done) => {
			
			/*
			 * code = 200
			 * message = SUCCESS
			 * data must be array
			 * data should include id prop
			 * data should include profile pic
			 * data should include name
			 * data should include full name
			 */


		});		

	});	

	/**
	 *	/twitter/profile/tweets endpoint
	 *	It returns tweets posted by specified user.
	 */
	describe('/GET /twitter/profile/tweets', () => {

		it('it should return 500 if id parameter is not provided in query.', (done) => {

			/*
			 * code = 500
			 * message = User id must be provided!
			 * should not have data property
			 */

		});


		it('it should return list of tweets posted by user.', (done) => {
			
			/*
			 * code = 200
			 * message = SUCCESS
			 * data must be array
			 */

		});		

	});	

	/**
	 *	/twitter/follow endpoint
	 *	It makes a request to follow specified user on Twitter.
	 */
	describe('/POST /twitter/follow', () => {

		it('it should return 500 if id parameter is not provided on body.', (done) => {

			/*
			 * code = 500
			 * message = User id must be provided!
			 * should not have data property
			 */

		});


		it('it should return profile information of followed user.', (done) => {
			
			/*
			 * code = 200
			 * message = SUCCESS
			 * data must be array
			 * data should include id prop
			 * data should include profile pic
			 * data should include name
			 * data should include full name
			 */

		});		

	});		