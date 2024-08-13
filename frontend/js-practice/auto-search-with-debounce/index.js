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
const debounce = (func,delay) => {
  let timer;
  return function() { 
    clearTimeout(timer)
    timer = setTimeout(() => {
      func();
    }, delay);
  }
}

const debounceWithLeadingAndTrailing = (func,delay, options = { leading : false, trailing : true}) => {
  let timer;
  let isLeading = false;
  return function() { 
    clearTimeout(timer)
    const callNow = options.leading && !timer;
    if(callNow) {
      isLeading = true;
      func();
    } else {
      isLeading = false
    }
    timer = setTimeout(() => {
      if(options.trailing && !isLeading) { 
        func();
      }
      isLeading = false;
    }, delay);
  }
}


const throttle = (func, delay) => {
  let lastCall = 0;
  let timer;
  return function() {
    const now = Date.now();
    if(!lastCall || now - lastCall >= delay) {
      clearTimeout(timer);
      timer = null;
      func();
      lastCall = now;
    } else {
      if(!timer) {
        clearTimeout(timer);
        timer = setTimeout(() => {
          func();
          lastCall = Date.now();
        }, delay - (now - lastCall));
      }
    }
  }
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

inputBox.addEventListener('focus', debounce(onChange, 2000));
inputBox.addEventListener('input', noValue);
inputBox.addEventListener('blur', onBlur);
inputBox.addEventListener('keyup', debounce(onChange, 2000));


//Refer https://youtu.be/_XOToOfrwtc?si=MKky5XFlYy18cdTk for more details