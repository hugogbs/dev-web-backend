const app = require("../server");
const request = require('supertest');

request(app)
  .get('/api/user/test')
  .expect('Content-Type', /json/)
  .expect('Content-Length', '21')
  .expect(200)
  .end(function(err, res) {
    
    if (err) throw err;
  });