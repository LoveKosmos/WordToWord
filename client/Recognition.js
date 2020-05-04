import React from "react";
import { render } from "react-dom";

export default class Recognition extends React.Component {
  constructor() {
    super();
    // console.log("PROPS HERE",props)
    window.recognitionComponent = this;
    //console.log(window.recognitionComponent);
    this.state = {
      word: '',
      speechToText: "",
    };
  }
  handleClick() {
    //console.log("handleClick");
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    let recognition = new SpeechRecognition();
    //console.log("new recognition");
    recognition.start();
    recognition.onresult = (event) => {
      console.log("EVENT =====>", event);
      var speechToText = event.results[0][0].transcript;
      console.log("SPEECH TO TEXT =====>", speechToText);
      window.recognitionComponent.setState({ speechToText: speechToText });
      window.recognitionComponent.setState({ word: speechToText.slice(8) });

      //window.recognitionComponent.props.setRootWord(speechToText)

      if (speechToText.includes("what is")) {
        let inputWord = speechToText.slice(8);
        console.log("INPUT WORD =====>", inputWord);
        this.getSynonymsFromDictionary(inputWord);
      }

      if (speechToText.includes("definition of ")) {
        let inputWord = speechToText.slice(14);
        console.log("INPUT WORD =====>", inputWord);
        this.getDefinitionFromDictionary(inputWord);
      }
    };
  }
  speak(action) {
    console.log("speakkkkk")
    utterThis = new SpeechSynthesisUtterance(action());
    synth.speak(utterThis);
  }

  getSynonymsFromDictionary(inputWord) {
      
    console.log("I'M IN GET SYNONYMS FUNCTION");
    let synonyms = "";
    fetch(`https://wordsapiv1.p.rapidapi.com/words/${inputWord}/synonyms`, {
      method: "GET",
      headers: {
        "x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
        "x-rapidapi-key": "940d6eea4bmsh6adc01f24b0b776p1eb0aejsne0be82199283",
      },
    })
      .then((response) => response.json())
      .then(
        (data) => (synonyms = data.synonyms)
        //inputWord = data.word
      )

      .then((synonyms) => {
        console.log("DATA HERE====>", synonyms);
        if (synonyms[1] === undefined) {
          utterThis = new SpeechSynthesisUtterance(
            `I'm sorry, I couldn't find any synonyms for ${inputWord}`
          );
          synth.speak(utterThis);
        } else {
          utterThis = new SpeechSynthesisUtterance(
            `synonyms for ${inputWord} are ${synonyms[0]} and ${synonyms[1]}`
          );
          synth.speak(utterThis);
        }
      });
  }

  getDefinitionFromDictionary(inputWord) {
    let definitions = "";
    fetch(`https://wordsapiv1.p.rapidapi.com/words/${inputWord}/definitions`, {
      method: "GET",
      headers: {
        "x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
        "x-rapidapi-key": "940d6eea4bmsh6adc01f24b0b776p1eb0aejsne0be82199283",
      },
    })
      .then((response) => {
        let json = response.json();
        console.log(json);
        return json;
      })
      .then(
        (data) => {
          console.log("DATA FROM RESPONSE ======>", data);
          return data;
        }

        // (data) => (definitions = data.definitions)
        //inputWord = data.word
      )
      .then((data) => {
        console.log("DATA HERE====>", data);
        if (data.definitions[1] === undefined) {
          utterThis = new SpeechSynthesisUtterance(
            `I'm sorry, I couldn't find any difinitions for ${inputWord}`
          );
          synth.speak(utterThis);
        } else {
          utterThis = new SpeechSynthesisUtterance(
            `difinitions for ${inputWord} is ${data.definitions[0].definition} and ${data.definitions[1].definition} `
          );
          synth.speak(utterThis);
        }
      });
  }
  render() {
    const speechToText = this.state.speechToText;
    console.log("HERE state------>", this.state);
    return (
      <div id='paragraphButton'>
        <p className='speechParagraph'>{this.state.speechToText}</p>
        <button type="button" className="btn btn-primary btn-lg" onClick={this.handleClick}>Click to speak</button>
        <p className='speechParagraph'>_____</p>
      </div>
    );
  }
}
