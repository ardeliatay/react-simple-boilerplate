import React, {Component} from 'react';

class Chatbar extends Component {
  render() {
    const onKeyPress = (event) => {
      if(event.key === 'Enter'){
        this.props.onNewMessage(event.target.value);
        // console.log(event.target.value)
      }
      event.target.value ='';
    }
    return (
      <footer className="chatbar">
        <input defaultValue={this.props.currentUser.name} className="chatbar-username" placeholder="Your Name (Optional)" />
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress={onKeyPress} />
      </footer>
    );
  }
}
export default Chatbar;