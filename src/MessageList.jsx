import React, {Component} from 'react';
import Message from './Message.jsx';
import Notifications from './Notifications.jsx';

class MessageList extends Component {
  render() {
    let messageList = this.props.messages.map(message => {
      if (message.type === "incomingNotification") {
        return <Notifications key={message.id} singleNotification={message}/>;
      } else {
        return <Message key={message.id} msg={message}/>;
      }
    });
    return (
      <main className="messages">
        {messageList}
      </main>
    );
  }
}
export default MessageList;