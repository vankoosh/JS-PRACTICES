// --------------------------------------------------------------------------------ASYNC AWAIT EXCERCISES


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

const promiseOne = location => {
  return new Promise((resolve, reject) => {
    if (location === 'Google') {
      console.log(`Location resolved to ${location}`)
      resolve(`LOCATION = ${location}`)
    } else {
      reject('My location could not be determined');
    }
  }
  )
}

const promiseTwo = responseFromPromiseOne => {
  return new Promise((resolve, reject) => {
    resolve(`The response from promise One is: ${responseFromPromiseOne}`)
  })
}

promiseOne('Google')
  .then(responseOne => {
  console.log("Resolving promise One");
  return promiseTwo(responseOne)
  })
  .then(responseTwo => {
    console.log("Resolving promise Two");
    console.log(responseTwo)
  }).catch(err => {
        console.log(err)
  })

const bothPromises = async (msg) => {
  try {const responseOne = await promiseOne(msg);
  console.log('Resolving promise One');
  console.log(responseOne);
  const responseTwo = await promiseTwo(responseOne);
    console.log('Resolving promise Two');
  } catch(err) {
     console.log(err)
  }
}

bothPromises('fb');

const promiseThree = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Resolved promise three')
    },1000)
  })
}

const noAwait = async () => {
  const result = promiseThree();
  console.log(result);
}

const withAwait = async () => {
  const result = await promiseThree();
  console.log(result);
}

noAwait();
withAwait();


// ANOTHER CODECADEMY EXCERCISE

const chooseBeans = () => {
  return new Promise((resolve, reject) => {
setTimeout(() => {
  let beans = ["black", "white", "kidney", "spring"];
  let beansIndex = Math.floor(Math.random() * beans.length);
  resolve("I am making " + beans[beansIndex] + ' beans.');
}, 2000)
    })
}


chooseBeans().then(result => { console.log(result) });

const asyncChooseBeans = async () => { // TAKE CHOOSEBEANS PROMISE FUNCTION AND MAKE ASYNC
  const result = await chooseBeans();
  console.log(result)
}

asyncChooseBeans();


const hostDinnerParty = async () => {
  try {
    let result = await cookBeanSouffle();
    console.log(`${result} is served!`)
  } catch (error) {
    console.log(error)
  }
  }

  
const pOne = () => {
  return new Promise((resolve, reject) => {
      resolve('Promise one resolved after 1 second!')
    })
}

const pTwo = () => {
    return new Promise((resolve, reject) => {
      resolve('Promise two resolved after 2 seconds!')
    })
}

const withAwait = async () => {
  const firstP = await pOne();
  const secondP = await pTwo();
  console.log(await firstP,await secondP)
}

const withoutAwait = async () => {
  const firstP = pOne();
  const secondP = pTwo();
  console.log(await firstP,await secondP)
}

withAwait();
withoutAwait();