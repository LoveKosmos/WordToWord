import React from 'react'
import {HashRouter as Router, Route} from 'react-router-dom'
import Navbar from './Navbar'
import Definitions from './Definitions'
import Synonyms from './Synonyms'
import Antonyms from './Antonyms'
import WhatIs from './WhatIs'
import Recognition from './Recognition'

export default class Main extends React.Component {
  render() {
    return (
      <Router>
        <div id="main">
          <div className="column container">
            <div id="header">
              <h1>Word To Word</h1>
            </div>
            <Navbar />
          </div>
          <Route path="/definitions" component={Definitions} />
          <Route path="/synonyms" component={Synonyms} />
          <Route path="/recognition" component={Recognition} />
          {/* <Route path="/antononyms" component={Antonyms} /> */}
          <Route path="/whatis" component={WhatIs} />
        </div>
      </Router>
    )
  }
}
