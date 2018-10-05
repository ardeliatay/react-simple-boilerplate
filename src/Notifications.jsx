import React, {Component} from 'react';

class Notifications extends Component {
  render() {
    return (
      <div className="notification">
        <span className="notification-content">{this.props.singleNotification.content}</span>
      </div>
    );
  }
}
export default Notifications;