import React, {Component} from 'react'
import axios from 'axios'
import Synonyms from './Synonyms'

export default class Definitions extends Component {
  constructor(props) {
    super(props)
    console.log("props word", props.word)
    this.state = {
      word: [],
      definition: [],
      synonyms: [],
      similarTo: []
    }
  }

  async componentDidMount() {
    try {
     const data = await axios('/api/definitions/house')
        .then((response) => {
          //this.setState({ definitions: response.data })
          // this.setState({
          //   word: response.data.word,
          //   definition: response.data.results[0].definition,
          //   synonyms: response.data.results[0].synonyms,
          //   similarTo: response.data.results[0].similarTo[0]
          // })
          console.log("data",response.data)
          console.log("WORD",response.data.word)
          console.log("DEFINITION",response.data.results[0].definition)
          // console.log("SYNONYMS",response.data.results[0].synonyms[0])
          // console.log("SYMILAR TO",response.data.results[0].similarTo[0])
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
