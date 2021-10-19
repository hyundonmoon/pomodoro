import ReactDOM from 'react-dom';

const Portal = ({ children }) => {
  const modalContainer = document.getElementById('modal');
  return ReactDOM.createPortal(children, modalContainer);
};

export default Portal;
