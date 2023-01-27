import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import styled from 'styled-components'
import { useRecoilState } from 'recoil';
import PagesState from '../../state/PagesState';
import SelectedNotebookState from '../../state/SelectedNotebookState';
import SelectedPageState from '../../state/SelectedPageState';
import axios from 'axios';

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

export default function RemovePopUp({ showState }) {
    const [show, setShow] = showState
    const [selectedPage, setSelectedPage] = useRecoilState(SelectedPageState)
    const [pages, setPages] = useRecoilState(PagesState)
    const [selectedNotebook, setSelectedNotebook] = useRecoilState(SelectedNotebookState)
    
    const handleClose = () => {
        setShow(false);
    };

    const removePage = (pageToRemove) => {
        let currentPageIndex = pages.findIndex(page => page.name === pageToRemove)
        
        let newPages = pages.filter(page => page.name !== pageToRemove)
        setPages(newPages)

        axios.post('http://localhost:5000/page/remove-page', 
            {
                notebookName: selectedNotebook,
                pageName: selectedPage
            }
        )

        //set selected page
        if(currentPageIndex === 0 && pages.length < 2) {
            setSelectedPage('')
        }
        else if(currentPageIndex !== -1) {
            setSelectedPage(pages[currentPageIndex-1].name)
        }
    }
    
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete this page?</Modal.Title>
                </Modal.Header>
                <Modal.Footer className='d-flex justify-content-center'>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" className='btn btn-danger' onClick={() => { handleClose(); removePage(selectedPage);}}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}