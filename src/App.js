import React from 'react';
import './App.css';
import commonConstants from './util/Constants.js';

const {  key, searchEngineId } = commonConstants;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
    }
  }

  fetchResults = async ({ value }) => {
    const searchResults = [];
    if(value.length > 2) {
      const res = await fetch(`https://www.googleapis.com/customsearch/v1?key=${key}&cx=${searchEngineId}&q=${value}`);
      const result = await res.json();
      if(result.items) {
        const items = result.items;
        items.map((item) => {
          const { title, link, snippet } = item;
          let img = '';
          console.log("KABoo: ", item);
          if(item.pagemap.cse_image) {
            img = item.pagemap.cse_image;
          } else if(item.pagemap.cse_thumbnail) {
            img = item.pagemap.cse_thumbnail;
          }
          searchResults.push({ title, link, cse_thumbnail: img[0].src, snippet });
        });
      }
      this.setState({
        searchResults,
      });
    }
  }

  renderResultsComponent = ({ searchResults }) => {
    if(searchResults.length > 0) {
      return searchResults.map((res) => {
        const { title, link, cse_image, snippet } = res;
        return (
        <div>
          <div className = "outerWrapper">
            <div className = 'leftSide'>
              <img src={cse_image} className='imgStyle' alt='img' />
            </div>
            <div className = 'rightSide'>
              <div> {link} </div>
              <div> {title} </div>
              <div> {snippet} </div>
            </div>
          </div>
      </div>
    )
    });
  }
    return 'No Results Found';
  }

  render () {
    const { state: { searchResults } }= this;
  
    return (
      <div className="App">
        <input
          type = 'search'
          onChange = {(e) => {
            const { target: { value } } = e; 
            this.fetchResults({ value });
          }}
        />
        <div
          className = 'resultsArea'
        >
          {this.renderResultsComponent({ searchResults })}
        </div>
      </div>
    );
  }
}

export default App;
