const router = require('express').Router()
const axios = require('axios')
const {Author, Comment, Story} = require('../db')

// GET /api/word
router.get('/', async (req, res, next) => {
  try {
  //   export default {
  //     getData: () =>
  //     axios({
  //         'method':'GET',
  //         'url':'https://example.com/query',
  //         'headers': {
  //             'content-type':'application/octet-stream',
  //             'x-rapidapi-host':'example.com',
  //             'x-rapidapi-key': process.env.RAPIDAPI_KEY
  //         },
  //         'params': {
  //             'search':'parameter',
  //         },
  //     })
  // }
    //  let word =
     fetch("https://wordsapiv1.p.rapidapi.com/words/love", {
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
        "x-rapidapi-key": "940d6eea4bmsh6adc01f24b0b776p1eb0aejsne0be82199283"
      }
    })
    .then(response => {
      console.log(response);
    })
//     .catch(err => {
//       console.log(err);
//     });
// //     .then((response) => response) 
//     console.log(response.data)
//     // // console.log()
    .then(data =>
      {console.log("DATA FROM RESPONSE ======>",data)
    return data
      })
//         //synonyms = data.synonyms))
//     //res.json(wordDefinitions)
  } catch (error) {
    next(error)
  }
})

// router.get('/', async (req, res, next) => {
//   try {
//     const authors = await Author.findAll({
//       attributes: ['id', 'name', 'imageUrl']
//     })
//     res.json(authors)
//   }
//   catch (error) {
//     next(error)
//   }
// })

router.get("/:word", async (req, res, next) => {
  try {
    const data = await axios({
      method: "GET",
      url: `https://wordsapiv1.p.rapidapi.com/words/${req.params.word}`,
      headers: {
        "content-type": "application/json",
        "x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
        "x-rapidapi-key": "940d6eea4bmsh6adc01f24b0b776p1eb0aejsne0be82199283",
      },
    })
      .then((response) => {
        console.log("data", response.data);
        console.log("WORD", response.data.word);
        console.log("DEFINITION", response.data.results[0].definition);
        console.log("SYNONYMS", response.data.results[0].synonyms[0]);
        // console.log("SYMILAR TO", response.data.results[0].similarTo[0]);
        var jsonObject = {          
          word: response.data.word,
          definition: response.data.results[0].definition,
          synonyms: response.data.results[0].synonyms[0],
          // similarTo: response.data.results[0].similarTo[0]
        }
        console.log("jsonObject",jsonObject)
        console.log("res",res)
        res.json(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    next(error);
  }
});

module.exports = router
