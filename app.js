const firstPromise = (location) => {
  return new Promise((resolve, reject) => {
    if (location == "Google") {
      console.log(`Making request to ${location}. Please wait...`);
      resolve(`My location is ${location}`);
    } else {
      reject("My location is unknown");
    }
  });
};

const secondPromise = (firstResolved) => {
  return new Promise((resolve, reject) => {
    console.log("Processing location response");
    resolve(`Location response resolved with ${firstResolved}`);
  });
};

firstPromise("Google")
  .then((response) => {
    console.log(`Response received as: ${response}`);
    return secondPromise(response);
  })
  .then((secondResponse) => {
    console.log(secondResponse);
  });
