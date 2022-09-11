




  //---------------------------------------------------------XHR REQUESTS

window.onload = () => {
  // alert("JS loaded");
}

const getBtn = document.querySelector("#get-btn");
const sendBtn = document.querySelector("#send-btn");


//GENERIC GET,POST REQUEST FUNCTION

const sendRequest = (method, url,data) => {   // .then() will be applied to this function since it returns it upon calling
  const promise = new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();       //create a new request
    xhr.open(method, url);                  //open a connection
    xhr.responseType = "json";              //response type you get back from the API will be a JSON object
    if (data) {                             //if you are POSTing data, you need to send header data with the request like this
      xhr.setRequestHeader("Content-Type", "application/json");
    }
    xhr.onload = () => {                    //add an event listener on the request when it comes back
      if (xhr.status >= 400) {              //if status of the response that came back is 404 or some other error, the reject value of the promise is this
        reject(xhr.response);
      } else {                              //otherwise 
        resolve(xhr.response);              //the resolve value of the promise will be the response of the request
      }
    };
    xhr.onerror = () => {
      reject("Oops, something went wrong"); //this is an event listener that should handle error responses and therefore set the reject value of the promise...??? 
     //didnt understand if is then still needed when already the previous id statement handles the error already https://www.youtube.com/watch?v=4K33w-0-p2c
    }
    xhr.send(JSON.stringify(data));         //and send the request with .send() if you are POSTing, you will send the POSTed data, you convert the data into a JSON object by JSON.stringify(data) it
  });                                       //the data can be a password for login or your email address for a newsletter or...
  return promise;                           // have to return, otherwise it does nothing
}


//this is the specific function that makes a specific request every time you press the GET button that has a event listener on it
const getData = () => {
  sendRequest("GET", "https://reqres.in/api/users").then((response=>{console.log(response)})); //here you attach the .then() method to the function
}

//this is the specific function that makes a specific request every time you press the POST button that has a event listener on it
const sendData = () => {
  sendRequest("POST", "https://reqres.in/api/register", { // this specific webpage API enpoint requires an object with email and password as the third param in the request
    email: "eve.holt@reqres.in",
    password: "pistol",
  }).then((response) => {
    console.log(response);
  });
}

getBtn.addEventListener("click", getData); // no () after function name
sendBtn.addEventListener("click", sendData);

// XHR AND API RESPONSE 

// Information to reach API
const apiKey = 'b267247d6fbe4b80bc3fc900c328b31c';
const url = 'https://api.rebrandly.com/v1/links';

// Some page elements
const inputField = document.querySelector('#input');
const shortenButton = document.querySelector('#shorten');
const responseField = document.querySelector('#responseField');

// AJAX functions
const shortenUrl = () => {
  const urlToShorten = inputField.value;
  const data = JSON.stringify({destination: urlToShorten});
  const xhr = new XMLHttpRequest();

  xhr.responseType = "json";
  xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
  renderResponse(xhr.response);
  }
}
xhr.open("POST",url);
xhr.setRequestHeader('Content-type', 'application/json');
xhr.setRequestHeader('apikey', apiKey);
xhr.send(data);
}


// Clear page and call AJAX functions
const displayShortUrl = (event) => {
  event.preventDefault();
  while(responseField.firstChild){
    responseField.removeChild(responseField.firstChild);
  }
  shortenUrl();
}

shortenButton.addEventListener('click', displayShortUrl);