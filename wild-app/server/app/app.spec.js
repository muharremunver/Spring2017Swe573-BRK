var chai = require('chai'),
	chaiHttp = require('chai-http'),
	expect = chai.expect,
	assert = chai.assert,
	app = require('../../server');


	chai.should();
	chai.use(chaiHttp);

	describe('/GET /health', () => {

		it('it should return health status of app.', (done) => {

			chai.request(app)
			.get('/api/health')
		    .end((err, res) => {
      			
      			res.should.have.status(200);
      			res.body.should.be.a('object');
      			res.body.should.have.property('code');
      			res.body.should.have.property('message');
      			assert.equal(res.body.message, 'I am alive');
      
		    	done();
		    });
		});
	});


module.exports = exports = app;