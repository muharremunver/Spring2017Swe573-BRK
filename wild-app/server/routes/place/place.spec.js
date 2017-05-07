var chai = require('chai'),
	chaiHttp = require('chai-http'),
	assert = chai.assert,
	app = require('../../../server');



	chai.should();
	chai.use(chaiHttp);

	/**
	 *	/places endpoint
	 *	It returns list of places around specified location.
	 */
	describe('/GET /places', () => {

		it('it should return 500 if latitude parameter is not provided.', (done) => {

			chai.request(app)
			.get('/api/places')
		    .end((err, res) => {
      			
      			res.body.should.be.a('object');
      			res.body.should.have.property('code');
      			res.body.should.have.property('message');
      			res.body.should.not.have.property('data');
      			assert.equal(res.body.code, '500');
      			assert.equal(res.body.message, 'Place location must be provided!');
      
		    	done();
		    });

		});

		it('it should return 500 if longitude parameter is not provided.', (done) => {

			chai.request(app)
			.get('/api/places')
		    .end((err, res) => {
      			
      			res.body.should.be.a('object');
      			res.body.should.have.property('code');
      			res.body.should.have.property('message');
      			res.body.should.not.have.property('data');
      			assert.equal(res.body.code, '500');
      			assert.equal(res.body.message, 'Place location must be provided!');
      
		    	done();
		    });
			
		});

		it('it should return list of places around.', (done) => {
			
			chai.request(app)
			.get('/api/places')
			.query({
				lat: 33,
			 	long: 33
			})
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
	 *	/places/detail/ endpoint
	 *	It returns list of tweets posted and media shared around specified place.
	 */
	describe('/GET /places/detail/', () => {

		it('it should return 500 if latitude parameter is not provided.', (done) => {

			chai.request(app)
			.get('/api/places/detail/')
		    .end((err, res) => {
      			
      			res.body.should.be.a('object');
      			res.body.should.have.property('code');
      			res.body.should.have.property('message');
      			res.body.should.not.have.property('data');
      			assert.equal(res.body.code, '500');
      			assert.equal(res.body.message, 'Place location must be provided!');
      
		    	done();
		    });
		});

		it('it should return 500 if longitude parameter is not provided.', (done) => {

			chai.request(app)
			.get('/api/places/detail/')
		    .end((err, res) => {
      			
      			res.body.should.be.a('object');
      			res.body.should.have.property('code');
      			res.body.should.have.property('message');
      			res.body.should.not.have.property('data');
      			assert.equal(res.body.code, '500');
      			assert.equal(res.body.message, 'Place location must be provided!');
      
		    	done();
		    });

		});

		it('it should return list of places around.', (done) => {

			chai.request(app)
			.get('/api/places/detail/')
			.query({
				lat: 33,
			 	long: 33
			})
		    .end((err, res) => {
      		
      			res.body.should.be.a('object');
      			res.body.should.have.property('code');
      			res.body.should.have.property('message');
      			res.body.should.have.property('data');
      			res.body.data.should.be.an('object');
      			res.body.data.should.have.property('tweets');
      			res.body.data.should.have.property('media');
      			res.body.data.tweets.should.be.an('array');
      			res.body.data.media.should.be.an('array');
      			assert.equal(res.body.code, '200');
      			assert.equal(res.body.message, 'SUCCESS');
      
		    	done();
		    });			

		});		

	});		
