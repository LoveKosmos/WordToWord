import React, {Component} from 'react'
import axios from 'axios'
import Synonyms from './Synonyms'

export default class Definitions extends Component {
  constructor() {
    super()
    this.state = {
      word: [],
      definition: [],
      synonyms: [],
      similarTo: []
    }
  }

  async componentDidMount() {
    try {
     const data = await 
     axios({
      "method":"GET",
        url: 'https://wordsapiv1.p.rapidapi.com/words/lovely',
        headers: {
          'content-type': 'application/json',
          'x-rapidapi-host': 'wordsapiv1.p.rapidapi.com',
          'x-rapidapi-key':
            '940d6eea4bmsh6adc01f24b0b776p1eb0aejsne0be82199283',
        },
      })
        .then((response) => {
          //this.setState({ definitions: response.data })
          this.setState({
            word: response.data.word,
            definition: response.data.results[0].definition,
            synonyms: response.data.results[0].synonyms,
            similarTo: response.data.results[0].similarTo[0]
          })
          console.log("data",response.data)
          console.log("WORD",response.data.word)
          console.log("DEFINITION",response.data.results[0].definition)
          console.log("SYNONYMS",response.data.results[0].synonyms[0])
          console.log("SYMILAR TO",response.data.results[0].similarTo[0])
        })
        .catch((error) => {
          console.log(error)
        })
    } catch (error) {
      console.trace(error)
    }
  }

  render(){
    const dataFromState= this.state

   
    console.log("here===>",this.state.synonyms)

    return (
      <div>
        <h2>HERE IS DEFINITIONS</h2>
        <br></br>
        <h1>WORD: {dataFromState.word}</h1>
        <br></br>
        <h1>DEFINITION: {dataFromState.definition}</h1>
        <br></br>
        <h1>SYNONYMS: {
        dataFromState.synonyms.forEach(synonym => 
          <li>{synonym}</li>)
          }</h1>
        <br></br>
        <h1>SIMILAR TO: {dataFromState.similarTo}</h1>

        {/* <Synonyms word={this.state} /> */}
      </div>
    )
  }
}
