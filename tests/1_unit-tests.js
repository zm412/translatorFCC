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

    test('4. To British', (done) => {

    let objBody = {
      text: 'Can you toss this in the trashcan for me?',
      locale: 'american-to-british'
    }
      let answStr = 'Can you toss this in the bin for me?'; 

      assert.equal(translator.translateFunc(objBody).originalTranslate, answStr )
      done();
    })


    test('5. To British', (done) => {

    let objBody = {
      text: 'The parking lot was full.',
      locale: 'american-to-british'
    }
      let answStr = 'The car park was full.'; 

      assert.equal(translator.translateFunc(objBody).originalTranslate, answStr )
      done();
    })


    test('6. To British', (done) => {

    let objBody = {
      text: 'Like a high tech Rube Goldberg machine.',
      locale: 'american-to-british'
    }
      let answStr = 'Like a high tech Heath Robinson device.'; 

      assert.equal(translator.translateFunc(objBody).originalTranslate, answStr )
      done();
    })


    test('7. To British', (done) => {

    let objBody = {
      text: 'To play hooky means to skip class or work.',
      locale: 'american-to-british'
    }
      let answStr = 'To bunk off means to skip class or work.'; 

      assert.equal(translator.translateFunc(objBody).originalTranslate, answStr )
      done();
    })



    test('8. To British', (done) => {

    let objBody = {
      text: 'No Mr. Bond, I expect you to die.',
      locale: 'american-to-british'
    }
      let answStr = 'No Mr Bond, I expect you to die.'; 

      assert.equal(translator.translateFunc(objBody).originalTranslate, answStr )
      done();
    })



    test('9. To British', (done) => {

    let objBody = {
      text: 'Dr. Grosh will see you now.',
      locale: 'american-to-british'
    }
      let answStr = 'Dr Grosh will see you now.'; 

      assert.equal(translator.translateFunc(objBody).originalTranslate, answStr )
      done();
    })


    test('10. To British', (done) => {

    let objBody = {
      text: 'Lunch is at 12:15 today.',
      locale: 'american-to-british'
    }
      let answStr = 'Lunch is at 12.15 today.'; 

      assert.equal(translator.translateFunc(objBody).originalTranslate, answStr )
      done();
    })


    test('11. To British', (done) => {

    let objBody = {
      text: 'We watched the footie match for a while.',
      locale: 'american-to-british'
    }
      let answStr = 'Everything looks good to me!'; 

      assert.equal(translator.translateFunc(objBody).translation, answStr )
      done();
    })

    test('12. To British', (done) => {

    let objBody = {
      text: 'Paracetamol takes up to an hour to work.',
      locale: 'american-to-british'
    }
      let answStr = 'Everything looks good to me!'; 

      assert.equal(translator.translateFunc(objBody).translation, answStr )
      done();
    })


  })
});
