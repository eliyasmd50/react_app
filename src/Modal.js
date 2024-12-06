import React from 'react';
import './Modal.css';

const Modal = ({ isModalOpen, children }) => {
    if(!isModalOpen) return null;

  return (
    <div className='modalOverlaystyles'>
        <div className='modalContentStyles'>
            {children}
        </div>
    </div>
  )
}

export default Modal