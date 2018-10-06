import React, {Component} from 'react';

class Chatbar extends Component {
  render() {
    const onKeyPress = (event) => {  
      if(event.key === 'Enter'){ //listens for enter key
        this.props.onNewMessage(event.target.value);
        event.target.value ='';
      };
    };

    const onKeyPressUser = (event) => { 
      if(event.key === 'Enter'){ //listens for enter key
        this.props.onNewUser(event.target.value);
    };
  };

    return (
      <footer className="chatbar">
        <input defaultValue={this.props.currentUser.name} className="chatbar-username" onKeyPress={onKeyPressUser} placeholder="Your Name (Optional)" />
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress={onKeyPress} />
      </footer>
    );
  };
};

export default Chatbar;