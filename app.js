// ---------------------------------------------------------------------------------------PROMISES
// const firstPromise = (location) => {
//   return new Promise((resolve, reject) => {
//     if (location == "Google") {
//       console.log(`Making request to ${location}. Please wait...`);
//       resolve(`My location is ${location}`);
//     } else {
//       reject("My location is not known");
//     }
//   });
// };

// const secondPromise = (firstResolved) => {
//   return new Promise((resolve, reject) => {
//     console.log("Processing location response");
//     resolve(`Location response resolved with ${firstResolved}`);
//   });
// };

//  firstPromise("Google")
//   .then((response) => {
//     console.log(`Response received as: ${response}`);
//     return secondPromise(response); // IN ORDER TO CHAIN PROMISES, YOU HAVE TO return THE SECOND PROMISE AND PASS IN
//   })                                // THE resolve VALUES OF THE FIRST PROMISE AS THE PARAMETER FOR THE SECOND PROMISE
//   .then((secondResponse) => {
//     console.log(secondResponse);
//   })
//    .catch(error => {console.log(error)});















//--------------------------------------------------------------------------------ASYNC AWAIT EXCERCISES

// INSTEAD DO async await SYNTAX

// const doThis = async (msg) => {
//   try {const response = await firstPromise(msg);
//   console.log(`Response received as: ${response}`);
//   const secondResponse = await secondPromise(response);
//     console.log(secondResponse);
//   } catch (error) {
//     console.log(error)
//   }
// }

// doThis('Facebook');


// const promiseOne = location => {
//   return new Promise((resolve, reject) => {
//     if (location === 'Google') {
//       console.log(`Location resolved to ${location}`)
//       resolve(`LOCATION = ${location}`)
//     } else {
//       reject('My location could not be determined');
//     }
//   }
//   )
// }

// const promiseTwo = responseFromPromiseOne => {
//   return new Promise((resolve, reject) => {
//     resolve(`The response from promise One is: ${responseFromPromiseOne}`)
//   })
// }

// promiseOne('Google')
//   .then(responseOne => {
//   console.log("Resolving promise One");
//   return promiseTwo(responseOne)
//   })
//   .then(responseTwo => {
//     console.log("Resolving promise Two");
//     console.log(responseTwo)
//   }).catch(err => {
//         console.log(err)
//   })
      
// const bothPromises = async (msg) => {
//   try {const responseOne = await promiseOne(msg);
//   console.log('Resolving promise One');
//   console.log(responseOne);
//   const responseTwo = await promiseTwo(responseOne);
//     console.log('Resolving promise Two');
//   } catch(err) {
//      console.log(err)
//   }
// }

// bothPromises('fb');

// const promiseThree = () => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve('Resolved promise three')
//     },1000)
//   })
// }

// const noAwait = async () => {
//   const result = promiseThree();
//   console.log(result);
// }

// const withAwait = async () => {
//   const result = await promiseThree();
//   console.log(result);
// }

// noAwait();
// withAwait();

//----------------------------------------------------------------------------------RANDOM
// const chooseBeans = () => {
//   return new Promise((resolve, reject) => {
// setTimeout(() => {
//   let beans = ["black", "white", "kidney", "spring"];
//   let beansIndex = Math.floor(Math.random() * beans.length);
//   resolve("I am making " + beans[beansIndex] + ' beans.');
// }, 2000)
//     })
// }


// chooseBeans().then(result => { console.log(result) });

// const asyncChooseBeans = async () => {
//   const result = await chooseBeans();
//   console.log(result)
// }

// asyncChooseBeans();


// const hostDinnerParty = async () => {
//   try {
//     let result = await cookBeanSouffle();
//     console.log(`${result} is served!`)
//   } catch (error) {
//     console.log(error)
//   }
//   }

//-------------------------------------------------------------
// const pOne = () => {
//   return new Promise((resolve, reject) => {
//       resolve('Promise one resolved after 1 second!')
//     })
// }

// const pTwo = () => {
//     return new Promise((resolve, reject) => {
//       resolve('Promise two resolved after 2 seconds!')
//     })
// }

// const withAwait = async () => {
//   const firstP = await pOne();
//   const secondP = await pTwo();
//   console.log(await firstP,await secondP)
// }

// const withoutAwait = async () => {
//   const firstP = pOne();
//   const secondP = pTwo();
//   console.log(await firstP,await secondP)
// }

// withAwait();
// withoutAwait();

//---------------------------------------------------------XHR REQUESTS

window.onload = () => {
  // alert("JS loaded");
}

const getBtn = document.querySelector("#get-btn");
const sendBtn = document.querySelector("#send-btn");

//this will be a generic function for sending requests, GET,POST,...
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
