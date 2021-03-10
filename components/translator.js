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

  validationFunc(objBody){
    let err;
    if(!objBody.hasOwnProperty('text') || !objBody.hasOwnProperty('locale')){
      err = 'Requird field(s) missing';
    }else if(!objBody.text){
      err = 'No text to translate';
    }else if(objBody.locale != 'american-to-british' && objBody.locale != 'british-to-american'){
      err = 'Invalid value for locale field';
      console.log(objBody.locale, 'locale')
    }
    return err;
  }
  
  translateFunc(objBody){

    let answer = {};
    if(this.validationFunc(objBody)){
      answer.error = this.validationFunc(objBody);
      return answer; 
    }else{
      let temp;
      answer.text = objBody.text;

      if(objBody.locale == 'american-to-british'){
        temp = this.americanToBritish(objBody.text)
      }else{
        temp = this.britishToAmerican(objBody.text)
      }

      answer.originalTranslate = temp;
      let tempArrTranslated = temp.split(' ');
      let tempArrText = objBody.text.split(' ');

      for(let i = 0; i < tempArrTranslated.length; i++){
        if(tempArrTranslated[i] != tempArrText[i]){
          tempArrTranslated[i] = '<span class="highlight">'+tempArrTranslated[i] + '</span>'
        }
      }
      temp = tempArrTranslated.join(' ');
      answer.translation = temp;

    }

    console.log(answer)
    return answer;
  }





  americanToBritish(str){
    let sentenceArr = str.split(' ');
    let newSentenceArr = [];
    
    for(let i = 0; i < sentenceArr.length; i++){
      
      let amerOnlyDict = this.checkAmericanTo(sentenceArr[i], this.americanOnly)
      let spellDict =  this.checkAmericanTo(sentenceArr[i], this.dictSpell);
      let titleDict = this.checkAmericanTo(sentenceArr[i], this.dictTitle);

     
      if(sentenceArr.length == 1 && !amerOnlyDict && !spellDict && !titleDict ){
        let tempArr = sentenceArr[0].split('')  ;
        tempArr[0] = tempArr[0].toUpperCase();
        return tempArr.join('');

      } else if(sentenceArr[i] == '.' || sentenceArr[i] == ','){
        newSentenceArr.push(sentenceArr[i])
      }
      else if(sentenceArr.length == 1 && amerOnlyDict){
        newSentenceArr.push(amerOnlyDict)

      }else if(sentenceArr.length > 1 && amerOnlyDict){
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

      }else if(sentenceArr.length > 1 && britOnlyDict){
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
    let isDote = /[.|,]$/.test(str);
    let tempStr = str;
    let word, dote;
    
    if(isDote){
      word = tempStr.match(/^(.+)([,|.])$/)[1]; 
      dote = tempStr.match(/^(.+)([,|.])$/)[2]; 
      tempStr = word;
    } 

    let isCaseLow = tempStr[0] == tempStr[0].toLowerCase();
    let lowCaseStr = tempStr.toLowerCase();
    let changedStr, arrStr;
    
    if(!obj){
      changedStr = tempStr;
    }else if(obj.hasOwnProperty(lowCaseStr) && isCaseLow){
      changedStr = obj[tempStr];
    }else if(obj.hasOwnProperty(lowCaseStr) && !isCaseLow){
      arrStr = obj[lowCaseStr].split('');
      arrStr[0] = arrStr[0].toUpperCase();
      changedStr = arrStr.join('')
    }


    if(isDote && changedStr){
      changedStr = changedStr + dote;
    } 

    return changedStr;
    }


  checkBritishTo(str, obj){
    let isDote = /[.|,]$/.test(str);
    let tempStr = str;
    let word, dote;
    
    if(isDote){
      word = tempStr.match(/^(.+)([,|.])$/)[1]; 
      dote = tempStr.match(/^(.+)([,|.])$/)[2]; 
      tempStr = word;
    } 


    let isCaseLow = tempStr[0] == tempStr[0].toLowerCase();
    let lowCaseStr = tempStr.toLowerCase();
    let changedStr, arrStr;
    
    if(!obj) changedStr = tempStr;

    for(let key in obj){

      if(obj[key] == lowCaseStr && isCaseLow){
        changedStr = key;
      }else if(obj[key] == lowCaseStr && !isCaseLow){
        arrStr = key.split('');
        arrStr[0] = arrStr[0].toUpperCase();
        changedStr = arrStr.join('')
      }
    }

    if(isDote && changedStr){
      changedStr = changedStr + dote;
    } 


        return changedStr;
  }



}

module.exports = Translator;
