import React from 'react';
import { connect, useSelector } from 'react-redux';

const Notification = ({ notification }) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  };
  if (notification.message)
    return <div style={style}>{notification.message}</div>;
  return null;
};
const mapStateToProps = (state) => {
  return {
    notification: state.notification,
  };
};

export default connect(mapStateToProps)(Notification);
