import { useState } from 'react';
import Modal from './Modal';


function App() {
  const [ isModalOpen, setisModalOpen ] = useState(false);

  const openModal = () => {
    setisModalOpen(true);
  }

  const closeModal = () => {
    setisModalOpen(false);
  }
  
  return (
    <div>
      {/* button to open modal */}
      <button onClick={openModal}>Open Modal</button>
      <Modal isModalOpen={isModalOpen}> 
        <h1>Modal</h1>
        <p>Thiis is the content of the modal</p>
        <button onClick={closeModal}>X</button>
      </Modal>
    </div>
  )
}

export default App;
