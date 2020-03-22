import React from 'react';
import logo from './logo.svg';
import GPIO from './model/GPIO';
import GPIOComponent from './components/GPIOComponent';
import './App.css';
import {URL} from 'url';
import { render } from '@testing-library/react';

enum Status {
  Loading,
  Running,
  Error
}

class App extends React.Component<{},{ status: Status, gpios: GPIO[] } >{

  constructor(props: Readonly<{}>) {
    super(props);

    this.state = { status: Status.Loading, gpios: [] }
  }
  
  componentDidMount() {
    fetch('/api/gpio')
    .then( response => response.json() )
    .then( data  => {
      const newGpios : GPIO[]= data;
     this.setState({status: Status.Running, gpios: newGpios});
    })
    .catch( error => {
      this.setState({status: Status.Error});
    });
  }

  renderRunning() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>
            <img src={logo} className="App-logo" alt="logo" />
            GPIO Web Console
          </h1>
        </header>
        <section className="GPIOList">
          {this.state.gpios.map( gpio => <GPIOComponent key={gpio.id} gpio={gpio}/>)}
        </section>
      </div>
    );
  }

  render()
  {
    switch( this.state.status ) {
      case Status.Loading:
        return <div>Loading...</div>;
      case Status.Running:
        return this.renderRunning();
      default:
        return <div>Error !</div>;
   }
  }
}

export default App;
