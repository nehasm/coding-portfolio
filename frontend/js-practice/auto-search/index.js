// Mock Server
const FAILURE_COUNT = 10;
const LATENCY = 200;

function getRandomBool(n) {
  const threshold = 1000;
  if (n > threshold) n = threshold;
  return Math.floor(Math.random() * threshold) % n === 0;
}

function getSuggestions(text) {
  var pre = 'pre';
  var post = 'post';
  var results = [];
  if (getRandomBool(2)) {
    results.push(pre + text);
  }
  if (getRandomBool(2)) {
    results.push(text);
  }
  if (getRandomBool(2)) {
    results.push(text + post);
  }
  if (getRandomBool(2)) {
    results.push(pre + text + post);
  }
  return new Promise((resolve, reject) => {
    const randomTimeout = Math.random() * LATENCY;
    setTimeout(() => {
      if (getRandomBool(FAILURE_COUNT)) {
        reject();
      } else {
        resolve(results);
      }
    }, randomTimeout);
  });
}

// Create an Auto Suggestion Box in Vanilla JS
// Create a suggestion area bottom to the input box that shows the suggestion list.
// The list is visible when the input box is in focus or when user types, it hides when the input box is blurred
// getSuggestions(text); method will act as mock server and will return random text based on the inputs with 0 - 200 millisceond latency and may fail.
// if a suggestion is clicked, populate the input box with its value and bring input box in focus


const inputBox = document.getElementById('input-box');


const addSuggestions = (suggestions) => {
  const suggestionArea = document.getElementById('suggestions')
  const suggestionList = document.createElement('ul');
  suggestionList.id = 'suggestion-list';
  suggestions.forEach(suggestion => {
    const suggestionItem = document.createElement('li');
    suggestionItem.innerText = suggestion;
    suggestionItem.addEventListener('click', () => {
      inputBox.value = suggestion;
      inputBox.focus();
    });
    suggestionList.appendChild(suggestionItem);
  });
  suggestionArea.innerHTML = suggestionList.outerHTML
}

const fetchSuggestions = async (text) => {
  try {
    const suggestions = await getSuggestions(text);
    addSuggestions(suggestions);
  } catch (error) {
    console.log('Error fetching suggestions');
  }
}

const onBlur = () => {
  const suggestionArea = document.getElementById('suggestions');
  suggestionArea.innerHTML = '';
}
const onChange = async () => {
  const inputVal = inputBox.value;
  fetchSuggestions(inputVal);
}

const noValue = () => { 
  const inputquery = inputBox.value;  
  if(inputquery === '') {
    onBlur();
  }
}

inputBox.addEventListener('focus', onChange);
inputBox.addEventListener('input', noValue);
inputBox.addEventListener('blur', onBlur);
inputBox.addEventListener('keyup', onChange);


//Refer https://youtu.be/_XOToOfrwtc?si=MKky5XFlYy18cdTk for more details