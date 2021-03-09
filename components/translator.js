const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

class Translator {

  constructor(){
    this.dictSpell = americanToBritishSpelling;
    this.dictTitle = americanToBritishTitles;
    this.americanOnly = americanOnly;
    this.britishOnly = britishOnly;
  }

  consoleFunc(objBody){
    console.log(objBody, 'obj')
  }
  
  translateFunc(objBody){
    let answer = {};
    if(objBody.locale == 'american-to-british'){
      answer.translation = this.americanToBritish(objBody.text)
    }
    console.log(answer)
    return answer;
  }

  americanToBritish(str){
    let sentenceArr = str.split(' ')  ;
    let newSentenceArr = [];

    for(let i = 0; i < sentenceArr.length; i++){
      if(this.dictSpell.hasOwnProperty(sentenceArr[i])){
        newSentenceArr.push(this.dictSpell[sentenceArr[i]])
      }else if(this.dictTitle.hasOwnProperty(sentenceArr[i])){
        newSentenceArr.push(this.dictTitle[sentenceArr[i]])
      }else if(this.americanOnly.hasOwnProperty(sentenceArr[i])){
        newSentenceArr.push(this.americanOnly[sentenceArr[i]])
      }else{
        newSentenceArr.push(sentenceArr[i])
      }

    }
    console.log(newSentenceArr, 'sentence')
    return newSentenceArr.join(' ');
  }

}

module.exports = Translator;
