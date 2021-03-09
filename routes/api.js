'use strict';

const Translator = require('../components/translator.js');

module.exports = function (app) {
  
  const translator = new Translator();

  app.route('/api/translate')
    .post((req, res) => {
      //console.log(req)
      let obj = translator.translateFunc(req.body)
      console.log(obj, 'obj')
      res.json(obj)
      
    });
};
