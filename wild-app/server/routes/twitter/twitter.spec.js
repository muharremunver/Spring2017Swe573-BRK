var chai = require('chai'),
	chaiHttp = require('chai-http'),
	assert = chai.assert,
	app = require('../../app/app.spec');



	chai.should();
	chai.use(chaiHttp);

	/**
	 *	/twitter/send endpoint
	 *	It posts a new tweet with given body.
	 */
	describe('/POST /twitter/send', () => {

		it('it should return 500 if body is empty.', (done) => {

			chai.request(app)
			.post('/api/twitter/send')
		  	.send({})
		    .end((err, res) => {
		
      			res.body.should.be.a('object');
      			res.body.should.have.property('code');
      			res.body.should.have.property('message');
      			res.body.should.not.have.property('data');
      			assert.equal(res.body.code, '500');
      			assert.equal(res.body.message, 'Request body cannot be null!');
      
		    	done();
		    });

		});		

	});

	/**
	 *	/twitter/profile endpoint
	 *	It returns basic profile information of specified user.
	 */
	describe('/GET /twitter/profile', () => {

		it('it should return 500 if id parameter is not provided in query.', (done) => {

			chai.request(app)
			.get('/api/twitter/profile')
		    .end((err, res) => {
		
      			res.body.should.be.a('object');
      			res.body.should.have.property('code');
      			res.body.should.have.property('message');
      			res.body.should.not.have.property('data');
      			assert.equal(res.body.code, '500');
      			assert.equal(res.body.message, 'User id must be provided!');
      
		    	done();
		    });

		});


		it('it should return profile information of user.', (done) => {

			chai.request(app)
			.get('/api/twitter/profile?id=2174258325')
		    .end((err, res) => {

      			res.body.should.be.a('object');
      			res.body.should.have.property('code');
      			res.body.should.have.property('message');
      			res.body.should.have.property('data');
      			res.body.data.should.be.a('object');
      			res.body.data.should.have.property('id');
      			res.body.data.should.have.property('name');
      			res.body.data.should.have.property('name');
      			res.body.data.should.have.property('screen_name');
      			res.body.data.should.have.property('profile_image_url');
      			assert.equal(res.body.code, '200');
      			assert.equal(res.body.message, 'SUCCESS');
      
		    	done();
		    });			

		});		

	});	

	/**
	 *	/twitter/profile/tweets endpoint
	 *	It returns tweets posted by specified user.
	 */
	describe('/GET /twitter/profile/tweets', () => {

		it('it should return 500 if id parameter is not provided in query.', (done) => {

			chai.request(app)
			.get('/api/twitter/profile/tweets')
		    .end((err, res) => {
		
      			res.body.should.be.a('object');
      			res.body.should.have.property('code');
      			res.body.should.have.property('message');
      			res.body.should.not.have.property('data');
      			assert.equal(res.body.code, '500');
      			assert.equal(res.body.message, 'User id must be provided!');
      
		    	done();
		    });

		});


		it('it should return list of tweets posted by user.', (done) => {

			chai.request(app)
			.get('/api/twitter/profile/tweets?id=2174258325')
		    .end((err, res) => {

      			res.body.should.be.a('object');
      			res.body.should.have.property('code');
      			res.body.should.have.property('message');
      			res.body.should.have.property('data');
      			res.body.data.should.be.a('array');
      			assert.equal(res.body.code, '200');
      			assert.equal(res.body.message, 'SUCCESS');
      
		    	done();
		    });			

		});		

	});	

	/**
	 *	/twitter/follow endpoint
	 *	It makes a request to follow specified user on Twitter.
	 */
	describe('/POST /twitter/follow', () => {

		it('it should return 500 if id parameter is not provided on body.', (done) => {

			chai.request(app)
			.post('/api/twitter/follow')
		  	.send({})
		    .end((err, res) => {

      			res.body.should.be.a('object');
      			res.body.should.have.property('code');
      			res.body.should.have.property('message');
      			res.body.should.not.have.property('data');
      			assert.equal(res.body.code, '500');
      			assert.equal(res.body.message, 'User id must be provided!');
      
		    	done();
		    });

		});	

	});		