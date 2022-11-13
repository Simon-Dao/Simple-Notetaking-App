import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import styled from 'styled-components'

const ColorContainer = styled.div`
    display: flex;
    margin: 20px;
`

const ColorOption = styled.div`
    height: 50px;
    width: 50px;
    border: black 3px;
    margin: 5px;
    background-color: ${props => props.color};
    cursor: pointer;
`

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

export default function DeletePopUp({showState, addNotebook, setColor}) {
  const [show, setShow] = showState

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);
  const [name, setName] = useState('')
  const notebookColors = ['#eee8aa', '#add8e6', '#9acd32', '#ff1493', '#cd853f', '#dc143c']

  return (
    <>

<Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Enter a name for the new Notebook</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{padding:'0', display:'flex', width:"100%",flexDirection:'column', alignItems:'center'}}>
          <NameInput type="text" value={name} onChange={(e)=>setName(e.target.value)}/>
          <h3>Pick a color!</h3>
          <ColorContainer>
                    {
                        notebookColors.map((color) => {
                            return (
                                <ColorOption key={color} color={color} onClick={() => setColor(color)}>
                                </ColorOption>
                            )
                        })
                    }
                </ColorContainer>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={()=>{handleClose(); addNotebook(name)}}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}