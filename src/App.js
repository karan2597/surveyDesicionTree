import React from 'react';
import './App.css';
import data from './util/Constants.js';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: null,
      questionInfo: data.question1,
      nextQuestionId: null,
      answeredQuestion: 0,
    }
  }

  handleChange = (e) => {
    this.setState({
      selectedOption: e.currentTarget.value,
    })
  }

  handleSubmit = () => {
    this.setState({
      questionInfo: data[this.state.nextQuestionId || 0], // load selected question in array
      answeredQuestion: this.state.answeredQuestion + 1,
    });
  }

  computePercent = () => {
    const currQuestionId = this.state.nextQuestionId || 'question1'; // default to question1Id
    let maxPossibleQues = 1;
    // This is a classic ex of finding maximum depth from a given node in a graph, till null (stopping condition is defined)



    // for(let i=0;i<data[currQuestionId].optionsInfo.length;i++) {
    //   let linkedQuestionId = data[currQuestionId].optionsInfo[i].linkedQuestion;
    //   while(linkedQuestionId) {
    //     maxPossibleQues = maxPossibleQues + 1;
    //     linkedQuestionId = data[linkedQuestionId]
    //   }
    // }
    // while(data[currQuestionId].optionsInfo) {
    //   if(!data[currQuestionId].optionsInfo){
    //     break;
    //   }
    //   maxPossibleQues = maxPossibleQues + 1;
    //   currQuestionId = data[currQuestionId]
    // }
  }

  render () {
    const { state: { questionInfo } } = this;
    const { text, optionsInfo } = questionInfo;

  
    return (
      <div className="App">
        <>
        <Progress percent={this.computePercent()} />
          <div> {text}</div>
          {optionsInfo.map((option) => {
            const { id, text, linkedQuestion } = option;
            <input
              type="radio"
              id={id}
              name={text}
              value={id}
              onChange={() => {
                this.handleChange();
                this.setState({
                  nextQuestionId: linkedQuestion,
                })
              }}
              checked={this.state.selectedOption === id}
            />
          })}
          <input type = "button" name="Submit" onClick={() => this.handleSubmit()} />
        </>
        )
      </div>
    );
  }
}

export default App;
