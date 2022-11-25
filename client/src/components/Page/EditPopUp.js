import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import styled from 'styled-components'
import { useRecoilState } from 'recoil';
import PagesState from '../../state/PagesState';
import SelectedPageState from '../../state/SelectedPageState';
import axios from 'axios';
import SelectedNotebookState from '../../state/SelectedNotebookState';

const NameInput = styled.input`
  width: max-content;
  flex-grow: 1;
  height: 40px;
  padding: 5px 10px;
  margin-top: 10px;
  border-radius: 5px;
  font-size: 20px;
  outline: none;
  border: none;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
`

export default function EditPopUp({ showState }) {
  const [show, setShow] = showState
  const [selectedPage, setSelectedPage] = useRecoilState(SelectedPageState)
  const [pages, setPages] = useRecoilState(PagesState)
  const [selectedNotebook, setSelectedNotebook] = useRecoilState(SelectedNotebookState)
  const [name, setName] = useState('')

  const handleClose = () => {
    setShow(false);
  };

  const pageNameExists = (target) => {
    let exists = false

    pages.forEach((page)=>{

      if(exists) return
      if(page.name === target) exists = true
    }) 

    return exists
  }

  const renamePage = () => {

    if(pageNameExists(name.trim())) {
      alert("name already exists")
      return
    }

    let newPages = JSON.parse(JSON.stringify(pages))

    newPages.forEach((page,index) => {

      if(page.name !== selectedPage) return

      newPages[index].name = name.trim()

    })

    setPages(newPages)

    setSelectedPage(name)

    axios.post('http://localhost:5000/page/rename-page',
      {
        notebookName: selectedNotebook,
        pageName: selectedPage,
        newPageName: name
      })
  }
  return (
    <>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Page</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ padding: '0', display: 'flex', width: "100%", flexDirection: 'column', padding: '20px' }}>
          <Modal.Title style={{}}>
            rename
          </Modal.Title>
          <NameInput type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => { handleClose(); renamePage() }}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}