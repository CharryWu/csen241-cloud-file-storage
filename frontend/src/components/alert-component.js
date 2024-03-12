import { useState, useEffect } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

function AlertDismissible({children, type, title, err, msg, showing, onX}) {
  //const [show, setShow] = useState(false);
  console.log(type, msg, showing)
  
  const renderElAlert = function () {
    return React.cloneElement(children);
  };

  if (showing) {
    return (
      <Alert variant={type} onClose={onX} dismissible>
        <Alert.Heading>{title? title : '...'}</Alert.Heading>
        <p>
        {err ? err : ''}
        {children ? renderElAlert() : msg}
        </p>
      </Alert>
    );
  }
  
  return ;
}

export default AlertDismissible;