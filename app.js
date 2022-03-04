const firstPromise = (location) => {
  return new Promise((resolve, reject) => {
    if (location == "Google") {
      console.log(`Making request to ${location}. Please wait...`);
      resolve(`My location is ${location}`);
    } else {
      reject("My location is not known");
    }
  });
};

const secondPromise = (firstResolved) => {
  return new Promise((resolve, reject) => {
    console.log("Processing location response");
    resolve(`Location response resolved with ${firstResolved}`);
  });
};

// firstPromise("Google")
//   .then((response) => {
//     console.log(`Response received as: ${response}`);
//     return secondPromise(response); // IN ORDER TO CHAIN PROMISES, YOU HAVE TO return THE SECOND PROMISE AND PASS IN
//   })                                // THE resolve VALUES OF THE FIRST PROMISE AS THE PARAMETER FOR THE SECOND PROMISE
//   .then((secondResponse) => {
//     console.log(secondResponse);
//   })
//    .catch(error => {console.log(error)});



// INSTEAD DO async await SYNTAX

const doThis = async (msg) => {
  try {const response = await firstPromise(msg);
  console.log(`Response received as: ${response}`);
  const secondResponse = await secondPromise(response);
    console.log(secondResponse);
  } catch (error) {
    console.log(error)
  }
}

doThis('Facebook');