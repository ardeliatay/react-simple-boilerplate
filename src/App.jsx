import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';


class App extends Component {
  constructor(props) {
    super(props);
    this.socket = new WebSocket ("ws://localhost:3001");
    this.state = {
      currentUser: {name: "Anonymous"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [],
      userCount: 0,   
     }
     this.addMessage = this.addMessage.bind(this);
     this.addUser = this.addUser.bind(this);
  }


  
  addMessage(content){
    var json = JSON.stringify({username: this.state.currentUser.name, content: content, type: "postMessage"});
    this.socket.send(json);
  }

  addUser(e) {
    var json = JSON.stringify({content: (`${this.state.currentUser.name} changed their name to ${e}`), type: "postNotification"});
    this.setState((prevState) => {
    Object.assign(prevState.currentUser, {name: e})
    this.socket.send(json)
    })
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    
    setTimeout(() => {
      console.log("Simulating incoming message");
      this.addMessage('Hello there!')
    }, 3000);

    this.socket.onopen = function () {
      console.log("Connected to server")
    };
    
    this.socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.userCount) {
        this.setState({userCount: message.userCount})
      } else {
        const newMessages = [...this.state.messages, JSON.parse(event.data)];
        console.log(newMessages)
        this.setState({messages: newMessages})
      }
    }
  }



  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
          <a href="/" className="navbar-counter">{this.state.userCount} users online</a>
        </nav>
        < MessageList messages={this.state.messages} />
        < ChatBar onNewMessage={this.addMessage} onNewUser={this.addUser} currentUser={this.state.currentUser}/>
      </div>
    );
  }
}
export default App;


