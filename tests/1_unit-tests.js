const chai = require('chai');
const assert = chai.assert;

const Translator = require('../components/translator.js');

suite('Unit Tests', () => {
  suite('Translating', () => {
    

    let translator = new Translator();

    test('Mangoes are my favorite fruit. To British', (done) => {

    let objBody = {
      text: 'Mangoes are my favorite fruit.',
      locale: 'american-to-british'
    }
      let answStr = 'Mangoes are my favourite fruit.'; 

      assert.equal(translator.translateFunc(objBody).originalTranslate, answStr )
      done();
    })


    test('2 To British', (done) => {

    let objBody = {
      text: "We had a party at my friend's condo.",
      locale: 'american-to-british'
    }
      let answStr = "We had a party at my friend's flat."; 

      assert.equal(translator.translateFunc(objBody).originalTranslate, answStr )
      done();
    })


    test('3. To British', (done) => {

    let objBody = {
      text: 'I ate yogurt for breakfast.',
      locale: 'american-to-british'
    }
      let answStr = 'I ate yoghurt for breakfast.'; 

      assert.equal(translator.translateFunc(objBody).originalTranslate, answStr )
      done();
    })


  })
});
