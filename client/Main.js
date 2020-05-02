import React from 'react'
import {HashRouter as Router, Route} from 'react-router-dom'
import Navbar from './Navbar'
import Definitions from './Definitions'
import Synonyms from './Synonyms'
import Antonyms from './Antonyms'
import WhatIs from './WhatIs'
import Recognition from './Recognition'

export default class Main extends React.Component {
  constructor(){
    super()
      this.state = { word: 'snake'}
      this.setRootWord.bind(this)
  }
  logThis(){
    console.log(this.state)
  }
  setRootWord(word){
    this.setState({
      word: word
    })
    console.log('set root word',word)
    console.log("after", this.state)
  }
  render() {
console.log("What word", this.state.word)
    return (
      <Router>
        <div id="main">
          <div className="column container">
            <div id="header">
              <h1 onClick={()=>this.logThis()}>Word To Word</h1>
            </div>
            <Navbar />
          </div>
          <Route path="/definitions" component={() => <Definitions word= {this.state.word} setRootWord={this.setRootWord}/>} />
          <Route path="/synonyms" component={Synonyms} />
          <Route path="/recognition" component={() => <Recognition setRootWord={this.setRootWord}/>}  />
          {/* <Route path="/antononyms" component={Antonyms} /> */}
          <Route path="/whatis" component={WhatIs} />
        </div>
      </Router>
    )
  }
}
