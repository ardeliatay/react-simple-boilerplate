import React, {Component} from 'react';

class Chatbar extends Component {
  render() {
    return (
      <footer className="chatbar">
        <input defaultValue={this.props.name} className="chatbar-username" placeholder="Your Name (Optional)" />
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" />
      </footer>
    );
  }
}
export default Chatbar;