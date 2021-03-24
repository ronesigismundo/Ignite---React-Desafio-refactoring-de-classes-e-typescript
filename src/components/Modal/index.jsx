import { useState, useEffect } from 'react';
import ReactModal from 'react-modal';

export function Modal ({children, isOpen, setIsOpen}) {
  const [state, setState] = useState(isOpen);
  /*constructor(props) {
    super(props);

    const { isOpen } = props;
    this.state = {
      modalStatus: isOpen
    }
  }*/

  /*
  componentDidUpdate(prevProps) {
    const { isOpen } = this.props;

    if (prevProps.isOpen !== isOpen) {
      this.setState({ modalStatus: isOpen })
    }
  }*/

  useEffect(() => {
    setState(isOpen)

  },[isOpen])  

    return (
      <ReactModal
        shouldCloseOnOverlayClick={!false}
        onRequestClose={setIsOpen}
        isOpen={state}
        ariaHideApp={false}
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            background: '#F0F0F5',
            color: '#000000',
            borderRadius: '8px',
            width: '736px',
            border: 'none',
          },
          overlay: {
            backgroundColor: '#121214e6',
          },
        }}
      >
        {children}
      </ReactModal>
    );
  }
