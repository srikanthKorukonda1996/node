function onSuccess () {
  console.log('Success!')
}

function onError () {
  console.log('💩')
}

function onDone () {
  console.log('Done')
}


const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve()
  }, 2000)
})

promise.then(onSuccess,onError)
promise.catch(onError)
promise.finally(onDone)