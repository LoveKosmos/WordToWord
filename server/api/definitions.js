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

// GET /api/authors/:authorId
router.get('/:authorId', async (req, res, next) => {
  try {
    const author = await Author.findById(req.params.authorId)
    res.json(author)
  } catch (error) {
    next(error)
  }
})

// GET /api/authors/:authorId/comments
router.get('/:authorId/comments', async (req, res, next) => {
  try {
    const comments = await Comment.findAll({
      where: {
        authorId: req.params.authorId,
      },
      include: [Author],
    })
    res.json(comments)
  } catch (error) {
    next(error)
  }
})

// GET /api/authors/:authorId/stories
router.get('/:authorId/stories', async (req, res, next) => {
  try {
    const story = await Story.findAll({
      where: {
        authorId: req.params.authorId,
      },
      include: [Author],
    })
    res.json(story)
  } catch (error) {
    next(error)
  }
})

module.exports = router
