import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import styled from 'styled-components'

const NameInput = styled.input`
  width: max-content;
  flex-grow: 1;
  margin: 20px 10px;
  height: 40px;
  padding: 5px 10px;
  border-radius: 10px;
  font-size: 20px;
  outline: none;
  border: none;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
`

export default function DeletePopUp({showState, notebookName, deleteNotebook}) {
  const [show, setShow] = showState

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);

  return (
    <>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure you want to delete {notebookName}?</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="secondary" className='btn btn-secondary' onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" className='btn btn-danger' onClick={()=>{handleClose(); deleteNotebook()}}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}