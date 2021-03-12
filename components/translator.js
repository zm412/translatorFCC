const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')


function  toUpCaseTheFirstLetter(str){
    let tempArr = str.split('');
    tempArr[0] = tempArr[0].toUpperCase();
    return tempArr.join('');
  }



class Translator {

validationFunc(objBody){
  let err;

  if(!objBody.hasOwnProperty('text') || !objBody.hasOwnProperty('locale')){
    err = 'Required field(s) missing';

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

  }else{
    let temp;
    let amerTo = this.searchingForWords(objBody.text, americanOnly, this.checkAmericanTo);
    let britTo = this.searchingForWords(objBody.text, britishOnly, this.checkBritishTo);
    answer.text = objBody.text;
    answer.originalTranslate = objBody.locale == 'american-to-british' ? amerTo : britTo;
    answer.translation = this.addHighlight(objBody.text, answer.originalTranslate)
  }
  return answer; 
}

addHighlight(strBase,strResult){
  let tempArrTranslated = strResult.split(' ');
  let tempArrText = strBase.split(' ');
  let result;

  if(strResult == strBase){ 
    result = 'Everything looks good to me!'

  }else{
    for(let i = 0; i < tempArrTranslated.length; i++){
      if(tempArrTranslated[i] != tempArrText[i]){
        tempArrTranslated[i] = '<span class="highlight">'+tempArrTranslated[i] + '</span>'
      }
    }
    result = tempArrTranslated.join(' ');
  }
  return result;
}


searchingForWords(str, dictOnly, funcCheck){
  let sentenceArr = str.split(' ');
  let newSentenceArr = [];
  
  for(let i = 0; i < sentenceArr.length; i++){
    let coupleWords = sentenceArr[i] + ' ' + sentenceArr[i+1]
    let threeWords = sentenceArr[i] + ' ' + sentenceArr[i+1] + ' ' + sentenceArr[i+2];
    let amerOnlyDict = funcCheck(sentenceArr[i], dictOnly)
    let spellDict =  funcCheck(sentenceArr[i], americanToBritishSpelling);
    let titleDict = funcCheck(sentenceArr[i], americanToBritishTitles);
    let couple = funcCheck(coupleWords, dictOnly);
    let three = funcCheck(threeWords, dictOnly);

   if(three){
      newSentenceArr.push(three);
      i += 2;

    }else if(couple){
      newSentenceArr.push(couple);
      i++;

    }else if(sentenceArr.length == 1 && !amerOnlyDict && !spellDict && !titleDict ){
      return toUpCaseTheFirstLetter(sentenceArr[0]);

    }else if(sentenceArr.length == 1 && amerOnlyDict){
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
  let changedStr;

  if(isTime){
    let regTime = tempStr.match(/^([0|1][0-12]):([0-5][0-9])$/);
    changedStr = String(regTime[1]) + '.' + regTime[2];
  }

  
  if(!obj){
    changedStr = tempStr;

    }else if(obj.hasOwnProperty(lowCaseStr) && isCaseLow){
      changedStr = obj[tempStr];

    }else if(obj.hasOwnProperty(lowCaseStr) && !isCaseLow){
      changedStr = toUpCaseTheFirstLetter(obj[lowCaseStr])
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
  let changedStr;
  
  
  if(isTime){
    let regTime = tempStr.match(/^([0|1]?[1-9]).([0-5][0-9])$/);
    changedStr = String(regTime[1]) + ':' + regTime[2];
  }

  if(!obj) changedStr = tempStr;

  for(let key in obj){
    if(obj[key] == lowCaseStr && isCaseLow && obj != britishOnly){
      changedStr = key;

    }else if(obj[key] == lowCaseStr && !isCaseLow && obj != britishOnly){
      changedStr = toUpCaseTheFirstLetter(key);

    }else if(obj == britishOnly && key == lowCaseStr && isCaseLow ){
      changedStr = obj[key];

    }else if(obj == britishOnly && key == lowCaseStr && !isCaseLow ){
      changedStr = toUpCaseTheFirstLetter(obj[key]);
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
