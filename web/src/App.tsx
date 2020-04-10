import React from 'react';
import socketIo from 'socket.io-client';
import logo from './logo.svg';
import GPIO from './model/GPIO';
import GPIOComponent from './components/GPIOComponent';
import Api from './Api';
import './App.css';

enum Status {
  Loading,
  Running,
  Error
}

class App extends React.Component<{}, { status: Status, gpios: GPIO[] }>{

  constructor(props: Readonly<{}>) {
    super(props);
    this.state = { status: Status.Loading, gpios: [] }
  }

  componentDidMount() {
    Api.GetAllGpios()
      .then( gpio => {
        this.setState({ status: Status.Running, gpios: gpio });
          this.setupIO();
      })
      .catch(error => {
        this.setState({ status: Status.Error });
      });
  }

  setupIO() {
    const socket = socketIo();
    socket.on('update', (data: any) => {
      const newGpios = Api.processInputData(data);
      this.setState({ status: Status.Running, gpios: newGpios })
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
          {this.state.gpios.map(gpio => <GPIOComponent key={gpio.id} gpio={gpio} />)}
        </section>
      </div>
    );
  }

  render() {
    switch (this.state.status) {
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
