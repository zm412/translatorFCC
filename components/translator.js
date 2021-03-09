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
    //console.log(this.caseChecking('Mr.', this.dictTitle), 'caseChecking')
    return answer;
  }


  americanToBritish(str){
    let sentenceArr = str.split(' ')  ;
    let newSentenceArr = [];

    for(let i = 0; i < sentenceArr.length; i++){
      
      if(sentenceArr.length == 1){
        let tempArr = sentenceArr[0].split('')  ;
        tempArr[0] = tempArr[0].toUpperCase();
        return tempArr.join('');

      }else if(this.checkingCase(sentenceArr[i], this.dictSpell)){
        newSentenceArr.push(this.checkingCase(sentenceArr[i], this.dictSpell));
      }else if(this.checkingCase(sentenceArr[i], this.dictTitle)){
        newSentenceArr.push(this.checkingCase(sentenceArr[i], this.dictTitle))
      }else if(this.checkingCase(sentenceArr[i], this.americanOnly)){
        newSentenceArr.push(this.checkingCase(sentenceArr[i], this.americanOnly))
      }else{
        newSentenceArr.push(this.checkingCase(sentenceArr[i]))
      }

    }
    console.log(newSentenceArr, 'sentence')
    return newSentenceArr.join(' ');
  }


  checkingCase(str, obj){
    //let arrSting = str.split('');
    //let isCaseLow = arrString[0] == arrString[0].toLowerCase();
    let isCaseLow = str[0] == str[0].toLowerCase();
    let lowCaseStr = str.toLowerCase();
    let changedStr, arrStr;
    

    if(!obj){
      //arrStr = str.split('');
      //arrStr[0] = arrStr[0].toUpperCase();
//      changedStr = arrStr.join('');
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

}

module.exports = Translator;
