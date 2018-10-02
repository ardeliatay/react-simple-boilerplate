import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    let messageArray = []
    this.props.messages.map(message => {
      messageArray.push(<Message key={message.id} msg={message}/>);
    });
    return (
      <main className="messages">
        {messageArray}
      </main>
    );
  }
}
export default MessageList;