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
        messages: [
          {
            id: generateRandomId(),
            username: "Bob",
            content: "Has anyone seen my marbles?",
          },
          {
            id: generateRandomId(),
            username: "Anonymous",
            content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
          }
        ]
      }      
     }
     this.addMessage = this.addMessage.bind(this);
  }
  addMessage(content){

    const newMessage = {id: generateRandomId(), username: this.state.data.currentUser.name, content};
    const messages = this.state.data.messages.concat(newMessage)
    this.setState({ data: { ...this.state.data, messages }})

  }
  componentDidMount() {
    console.log("componentDidMount <App />");
    
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      // const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
      // const messages = this.state.data.messages.concat(newMessage)
      // // Update the state of the app component.
      // // Calling setState will trigger a call to render() in App and all child components.
      // this.setState({ data: { currentUser: this.state.data.currentUser,
      //   messages: messages}})
      this.addMessage('Hello there!')
    }, 3000);


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
        < ChatBar onNewMessage={this.addMessage} currentUser={this.state.data.currentUser}/>
      </div>
    );
  }
}
export default App;


