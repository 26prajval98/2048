import React, { Component } from 'react';
import Grid from './components/grid'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="w3-container" style={{padding : "0px!important", margin : "0px!important"}}>
	  	<h1 className="w3-jumbo w3-center">2048</h1> 
		<Grid/>
      </div>
    );
  }
}

export default App;
