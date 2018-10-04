import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

const generateRandomId = (alphabet => {
  const alphabetLength = alphabet.length;
  const randoIter = (key, n) => {
    if (n === 0) {
      return key;
    }
    const randoIndex = Math.floor(Math.random() * alphabetLength);
    const randoLetter = alphabet[randoIndex];
    return randoIter(key + randoLetter, n - 1);
  };
  return () => randoIter("", 10);
})("0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ");


class App extends Component {
  constructor(props) {
    super(props);
    this.socket = new WebSocket ("ws://localhost:3001");
    this.state = { 
      data:
      {
        currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
        messages: []
      }      
     }
     this.addMessage = this.addMessage.bind(this);
     this.addUser = this.addUser.bind(this);
  }
  
  addMessage(content){
    var json = JSON.stringify({username: this.state.data.currentUser.name, content: content});
    this.socket.send(json);
  }

  addUser(e) {
    this.setState((prevState) => {
      Object.assign(prevState.data.currentUser, {name: e})
    })
  }


  componentDidMount() {
    console.log("componentDidMount <App />");
    
    setTimeout(() => {
      console.log("Simulating incoming message");
      this.addMessage('Hello there!')
    }, 3000);
    
    this.socket.onmessage = (event) => {
      console.log(event.data);
      const newMessage = JSON.parse(event.data);
      const messages = this.state.data.messages.concat(newMessage)
      this.setState({ data: { ...this.state.data, messages }})
    }

    this.socket.onopen = function () {
      console.log("Connected to server")
    };


  }



  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        < MessageList messages={this.state.data.messages} />
        < ChatBar onNewMessage={this.addMessage} onNewUser={this.addUser} currentUser={this.state.data.currentUser}/>
      </div>
    );
  }
}
export default App;


