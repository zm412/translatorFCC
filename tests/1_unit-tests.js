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


    test('1. to American', (done) => {

    let objBody = {
      text: 'We watched the footie match for a while.',
      locale: 'british-to-american'
    }
      let answStr = 'We watched the soccer match for a while.'; 

      assert.equal(translator.translateFunc(objBody).originalTranslate, answStr )
      done();
    })

    test('2. to American', (done) => {

    let objBody = {
      text: 'Paracetamol takes up to an hour to work.',
      locale: 'british-to-american'
    }
      let answStr = 'Tylenol takes up to an hour to work.'; 

      assert.equal(translator.translateFunc(objBody).originalTranslate, answStr )
      done();
    })


    test('3. to American', (done) => {

    let objBody = {
      text: 'First, caramelise the onions.',
      locale: 'british-to-american'
    }
      let answStr = 'First, caramelize the onions.'; 

      assert.equal(translator.translateFunc(objBody).originalTranslate, answStr )
      done();
    })

    test('4. to American', (done) => {

    let objBody = {
      text: 'I spent the bank holiday at the funfair.',
      locale: 'british-to-american'
    }
      let answStr = 'I spent the public holiday at the carnival.'; 

      assert.equal(translator.translateFunc(objBody).originalTranslate, answStr )
      done();
    })


   test('5. to American', (done) => {

    let objBody = {
      text: 'I had a bicky then went to the chippy.',
      locale: 'british-to-american'
    }
      let answStr = 'I had a cookie then went to the fish-and-chip shop.'; 

      assert.equal(translator.translateFunc(objBody).originalTranslate, answStr )
      done();
    })


   test('6. to American', (done) => {

    let objBody = {
      text: "I've just got bits and bobs in my bum bag.",
      locale: 'british-to-american'
    }
      let answStr = "I've just got odds and ends in my fanny pack."; 

      assert.equal(translator.translateFunc(objBody).originalTranslate, answStr )
      done();
    })



   test('7. to American', (done) => {

    let objBody = {
      text: "The car boot sale at Boxted Airfield was called off.",
      locale: 'british-to-american'
    }
      let answStr = "The swap meet at Boxted Airfield was called off."; 

      assert.equal(translator.translateFunc(objBody).originalTranslate, answStr )
      done();
    })

   test('8. to American', (done) => {

    let objBody = {
      text: "Have you met Mrs Kalyani?",
      locale: 'british-to-american'
    }
      let answStr = "Have you met Mrs. Kalyani?"; 

      assert.equal(translator.translateFunc(objBody).originalTranslate, answStr )
      done();
    })


   test('9. to American', (done) => {

    let objBody = {
      text: "Prof Joyner of King's College, London.",
      locale: 'british-to-american'
    }
      let answStr = "Prof. Joyner of King's College, London."; 

      assert.equal(translator.translateFunc(objBody).originalTranslate, answStr )
      done();
    })


   test('10. to American', (done) => {

    let objBody = {
      text: "Tea time is usually around 4 or 4.30.",
      locale: 'british-to-american'
    }
      let answStr = "Tea time is usually around 4 or 4:30."; 

      assert.equal(translator.translateFunc(objBody).originalTranslate, answStr )
      done();
    })


   test('11. to American', (done) => {

    let objBody = {
      text: "Mangoes are my favorite fruit.",
      locale: 'american-to-british'
    }
      let answStr = 'Mangoes are my <span class="highlight">favourite</span> fruit.'; 

      assert.equal(translator.translateFunc(objBody).translation, answStr )
      done();
    })


   test('12. to American', (done) => {

    let objBody = {
      text: "I ate yogurt for breakfast.",
      locale: 'american-to-british'
    }
      let answStr = 'I ate <span class="highlight">yoghurt</span> for breakfast.'; 

      assert.equal(translator.translateFunc(objBody).translation, answStr )
      done();
    })


   test('13. to American', (done) => {

    let objBody = {
      text: "We watched the footie match for a while.",
      locale: 'british-to-american'
    }
      let answStr = 'We watched the <span class="highlight">soccer</span> match for a while.'; 

      assert.equal(translator.translateFunc(objBody).translation, answStr )
      done();
    })

   test('14. to American', (done) => {

    let objBody = {
      text: "Paracetamol takes up to an hour to work.",
      locale: 'british-to-american'
    }
      let answStr = '<span class="highlight">Tylenol</span> takes up to an hour to work.'; 

      assert.equal(translator.translateFunc(objBody).translation, answStr )
      done();
    })



  })
});
