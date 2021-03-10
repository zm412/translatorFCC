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
    let answer = {text: objBody.text};
    if(objBody.locale == 'american-to-british'){
      answer.translation = this.americanToBritish(objBody.text)
    }else{
      answer.translation = this.britishToAmerican(objBody.text)
    }
    console.log(answer)
    return answer;
  }



  americanToBritish(str){
    let sentenceArr = str.split(' ')  ;
    let newSentenceArr = [];

    for(let i = 0; i < sentenceArr.length; i++){
      
      let amerOnlyDict = this.checkAmericanTo(sentenceArr[i], this.americanOnly)
      let spellDict =  this.checkAmericanTo(sentenceArr[i], this.dictSpell);
      let titleDict = this.checkAmericanTo(sentenceArr[i], this.dictTitle);

      if(sentenceArr.length == 1 && !amerOnlyDict && !spellDict && !titleDict ){
        let tempArr = sentenceArr[0].split('')  ;
        tempArr[0] = tempArr[0].toUpperCase();
        return tempArr.join('');

      }else if(sentenceArr.length == 1 && amerOnlyDict){
        newSentenceArr.push(amerOnlyDict)
      } else if(spellDict){
        newSentenceArr.push(spellDict);
      }else if(titleDict){
        newSentenceArr.push(titleDict)
      }else{
        newSentenceArr.push(this.checkAmericanTo(sentenceArr[i]))
      }

    }
    console.log(newSentenceArr, 'sentence')
    return newSentenceArr.join(' ');
  }



  britishToAmerican(str){
    let sentenceArr = str.split(' ')  ;
    let newSentenceArr = [];

    for(let i = 0; i < sentenceArr.length; i++){
      let britOnlyDict = this.checkBritishTo(sentenceArr[i], this.britishOnly)
      let spellDict =  this.checkBritishTo(sentenceArr[i], this.dictSpell);
      let titleDict = this.checkBritishTo(sentenceArr[i], this.dictTitle);

      if(sentenceArr.length == 1 && !britOnlyDict && !spellDict && !titleDict ){
        let tempArr = sentenceArr[0].split('')  ;
        tempArr[0] = tempArr[0].toUpperCase();
        return tempArr.join('');

      }else if(sentenceArr.length == 1 && britOnlyDict){
        newSentenceArr.push(britOnlyDict)

      } else if(this.checkBritishTo(spellDict)){
        newSentenceArr.push(spellDict);

      }else if(titleDict){
        newSentenceArr.push(titleDict)

      }else{
        newSentenceArr.push(this.checkBritishTo(sentenceArr[i]))
      }

    }
    console.log(newSentenceArr, 'sentence')
    return newSentenceArr.join(' ');
  }


  checkAmericanTo(str, obj){
    let isCaseLow = str[0] == str[0].toLowerCase();
    let lowCaseStr = str.toLowerCase();
    let changedStr, arrStr;
    

    if(!obj){
      changedStr = str;
    }else if(obj.hasOwnProperty(lowCaseStr) && isCaseLow){
      changedStr = obj[str];
    }else if(obj.hasOwnProperty(lowCaseStr) && !isCaseLow){
      arrStr = obj[lowCaseStr].split('');
      arrStr[0] = arrStr[0].toUpperCase();
      changedStr = arrStr.join('')
    }

    return changedStr;
    }


  checkBritishTo(str, obj){
    let isCaseLow = str[0] == str[0].toLowerCase();
    let lowCaseStr = str.toLowerCase();
    let changedStr, arrStr;
    
    if(!obj) changedStr = str;

    for(let key in obj){

      if(obj[key] == lowCaseStr && isCaseLow){
        changedStr = key;
      }else if(obj[key] == lowCaseStr && !isCaseLow){
        arrStr = key.split('');
        arrStr[0] = arrStr[0].toUpperCase();
        changedStr = arrStr.join('')
      }
    }
        return changedStr;
  }



}

module.exports = Translator;
