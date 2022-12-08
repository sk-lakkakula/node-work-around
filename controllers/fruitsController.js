import asyncHandler from "express-async-handler";

const fruitBasket = {
  apple: 27,
  grape: 0,
  pear: 14
}
const getNumFruit = fruit => {
  return fruitBasket[fruit]
}

const sleep = ms => {
  return new Promise(resolve => setTimeout(resolve, ms))
}
const forLoop = async _ => {
  for (let index = 0; index < fruitBasket.length; index++) {
    console.log('fruitBasket [',i,']',fruitBasket[i])
  }
}
const getAll = async (req, res) => {
    console.log('Start')
    forLoop()
    }
  
export {
  getAll
}


