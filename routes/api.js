'use strict';

const Translator = require('../components/translator.js');

module.exports = function (app) {
  
  const translator = new Translator();

  app.route('/api/translate')
    .post((req, res) => {
      //console.log()
      let obj = translator.translateFunc(req.body)
      console.log(obj, 'obj')
      res.json({text: obj.text, translation: obj.translation, error: obj.error})

      
    });
};
