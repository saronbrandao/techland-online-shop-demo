import { Alert } from 'react-bootstrap';

const Message = ({ variant, children }) => {
  // 'variant' prop is related to the display color using bootstrap standarts
  // 'children' prop is whatever the message is wrapping
  return <Alert variant={variant}>{children}</Alert>;
};


// setting the defaults.
Message.defaultProps = {
  variant: 'info'
}

export default Message;
