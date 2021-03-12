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
        temp = this.searchingForWords(objBody.text, this.americanOnly, this.checkAmericanTo);
      }else{
        temp = this.searchingForWords(objBody.text, this.britishOnly, this.checkBritishTo);
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
    if(answer.translation == objBody.text){
      answer.translation = 'Everything looks good to me!'
    }

    console.log(answer)
    return answer;
  }


  searchingForWords(str, dictOnly, funcCheck){
    let sentenceArr = str.split(' ');
    let newSentenceArr = [];
    
    for(let i = 0; i < sentenceArr.length; i++){
      let coupleWords = sentenceArr[i] + ' ' + sentenceArr[i+1]
      let threeWords = sentenceArr[i] + ' ' + sentenceArr[i+1] + ' ' + sentenceArr[i+2];
      
      let amerOnlyDict = funcCheck(sentenceArr[i], dictOnly)
      let spellDict =  funcCheck(sentenceArr[i], this.dictSpell);
      let titleDict = funcCheck(sentenceArr[i], this.dictTitle);
      let couple = funcCheck(coupleWords, dictOnly);
      let three = funcCheck(threeWords, dictOnly);

     if(three){
        newSentenceArr.push(three);
        i += 2;

      }else if(couple){
        newSentenceArr.push(couple);
        i++;

      }else if(sentenceArr.length == 1 && !amerOnlyDict && !spellDict && !titleDict ){
        let tempArr = sentenceArr[0].split('')  ;
        tempArr[0] = tempArr[0].toUpperCase();
        return tempArr.join('');

      } else if(sentenceArr.length == 1 && amerOnlyDict){
        newSentenceArr.push(amerOnlyDict)

      }else if(sentenceArr.length > 1 && amerOnlyDict){
        newSentenceArr.push(amerOnlyDict)
        
      }else if(spellDict){
        newSentenceArr.push(spellDict);

      }else if(titleDict){
        newSentenceArr.push(titleDict);

      }else{
        newSentenceArr.push(funcCheck(sentenceArr[i]))
      }

    }
    return newSentenceArr.join(' ');
  }


  checkAmericanTo(str, obj){
    
    let isDot = /[.|,|!|?|...]$/.test(str) && !americanToBritishTitles.hasOwnProperty(str.toLowerCase());
    let isTime = /^[0|1][0-12]:[0-5][0-9]$/.test(str);
    let tempStr = str;
    let word, dots;
    
    if(isDot){
      word = tempStr.match(/^(.+)([.|,|!|?|...])$/)[1]; 
      dots = tempStr.match(/^(.+)([.|,|!|?|...])$/)[2]; 
      tempStr = word;
    } 

    let isCaseLow = tempStr[0] == tempStr[0].toLowerCase();
    let lowCaseStr = tempStr.toLowerCase();
    let changedStr, arrStr;

    if(isTime){
      let regTime = tempStr.match(/^([0|1][0-12]):([0-5][0-9])$/);
      changedStr = String(regTime[1]) + '.' + regTime[2];
    }

    
    if(!obj){
      changedStr = tempStr;

    }else if(obj.hasOwnProperty(lowCaseStr) && isCaseLow){
      changedStr = obj[tempStr];

    }else if(obj.hasOwnProperty(lowCaseStr) && !isCaseLow){
      arrStr = obj[lowCaseStr].split('');
      arrStr[0] = arrStr[0].toUpperCase();
      changedStr = arrStr.join('')
    }


    if(isDot && changedStr){
      changedStr = changedStr + dots;
    } 

    return changedStr;
    }


  checkBritishTo(str, obj){
    
    let flagDot = true;
    
    for(let key in americanToBritishTitles){
      if(americanToBritishTitles[key] == str.toLowerCase()){
        flagDot = false;
        break;
      }
    }

    let word, dots;
    let tempStr = str;
    let isDot = /[.|,|!|?|...]$/.test(str) && flagDot; 
    
    if(isDot){
      word = tempStr.match(/^(.+)([.|,|!|?|...])$/)[1]; 
      dots = tempStr.match(/^(.+)([.|,|!|?|...])$/)[2]; 
      tempStr = word;
    } 

    let isTime = /^[0|1]?[1-9].[0-5][0-9]$/.test(tempStr);

    let isCaseLow = tempStr[0] == tempStr[0].toLowerCase();
    let lowCaseStr = tempStr.toLowerCase();
    let changedStr, arrStr;
    
    
    if(isTime){
      let regTime = tempStr.match(/^([0|1]?[1-9]).([0-5][0-9])$/);
      changedStr = String(regTime[1]) + ':' + regTime[2];
      console.log(isTime, 'isTime', changedStr, 'changStr')
    }

    if(!obj) changedStr = tempStr;

    for(let key in obj){

      if(obj[key] == lowCaseStr && isCaseLow && obj != britishOnly){
        changedStr = key;

      }else if(obj[key] == lowCaseStr && !isCaseLow && obj != britishOnly){
        arrStr = key.split('');
        arrStr[0] = arrStr[0].toUpperCase();
        changedStr = arrStr.join('')

      }else if(obj == britishOnly && key == lowCaseStr && isCaseLow ){
        changedStr = obj[key]

      }else if(obj == britishOnly && key == lowCaseStr && !isCaseLow ){
        arrStr = obj[key].split('');
        arrStr[0] = arrStr[0].toUpperCase();
        changedStr = arrStr.join('')
      }

    }

    if(isDot && changedStr){
      changedStr = changedStr + dots;
      console.log(isDot, 'isDot', changedStr)
    } 
        return changedStr;
  }



}

module.exports = Translator;
