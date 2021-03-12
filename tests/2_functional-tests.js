const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server.js');

chai.use(chaiHttp);

let Translator = require('../components/translator.js');

suite('Functional Tests', () => {

 suite('GET /api/translate', function() {
      
      test('empty fields', function(done) {
       chai.request(server)
        .post('/api/translate')
        .send({})
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.equal(res.body.error,'Required field(s) missing' );
          done();
        });
      });

 
      test('empty field text', function(done) {
       chai.request(server)
        .post('/api/translate')
          .send({
            text: "",
            locale: 'american-to-british'
          })
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.equal(res.body.error, 'No text to translate');
          done();
        });
      });


 
      test('not valid field local', function(done) {
       chai.request(server)
        .post('/api/translate')
          .send({
            text: "I ate yogurt for breakfast.",
            locale: 'americanlkjLLKJJLJ-to-british'
          })
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.equal(res.body.error, 'Invalid value for locale field');
          done();
        });
      });


 
      test('british-to-american', function(done) {
       chai.request(server)
        .post('/api/translate')
          .send({
            text: "We watched the footie match for a while.",
            locale: 'british-to-american'
          })
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.equal(res.body.translation,   'We watched the <span class="highlight">soccer</span> match for a while.');
          done();
        });
      });

 
      test('american-to-british', function(done) {
       chai.request(server)
        .post('/api/translate')
          .send({
            text: "We had a party at my friend's condo.",
            locale: 'american-to-british'
          })
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.equal(res.body.translation,"We had a party at my friend's <span class=\"highlight\">flat.</span>");
          done();
        });
      });

 
      test('no changes', function(done) {
       chai.request(server)
        .post('/api/translate')
          .send({
            text: "We had a party at my friend's condo.",
            locale: 'british-to-american'
          })
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.equal(res.body.translation,"Everything looks good to me!");
          done();
        });
      });



  });
});
