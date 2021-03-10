
const translateHandler = async () => {
  const textArea = document.getElementById("text-input");
  const localeArea = document.getElementById("locale-select");
  const errorArea = document.getElementById("error-msg");
  const translatedArea = document.getElementById("translated-sentence");
  
  const stuff = {"text": textArea.value, "locale": localeArea.value};
  errorArea.innerText = "";
  translatedArea.innerText = "";

  const data = await fetch("/api/translate", {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-type": "application/json"
    },
    body: JSON.stringify(stuff)
  });

  const parsed = await data.json();
  if (parsed.error) {
    errorArea.innerText = JSON.stringify(parsed);
    return;
  }

  let tempArrTranslated = parsed.translation.split(' ');
  let tempArrText = parsed.text.split(' ');
  for(let i = 0; i < tempArrTranslated.length; i++){
    if(tempArrTranslated[i] != tempArrText[i]){
      tempArrTranslated[i] = '<span class="highlight">'+tempArrTranslated[i] + '</span>'
      console.log(parsed.translation[i], 'i')
    }
  }
  parsed.translation = tempArrTranslated.join(' ');

  console.log(parsed.translation, 'parsed')

  translatedArea.innerHTML = parsed.translation;
  return;
};

document.getElementById("translate-btn").addEventListener("click", translateHandler)
