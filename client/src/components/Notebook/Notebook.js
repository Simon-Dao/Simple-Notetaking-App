import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTrash} from '@fortawesome/free-solid-svg-icons'
import {faBook} from '@fortawesome/free-solid-svg-icons'
import DeletePopUp from './DeletePopUp'

const NotebookDiv = styled.div`
    display: flex;
    border-radius: 30px;
    font-size: 20px;
    height: 230px;
    min-width: 200px;
    max-width: 400px;
    padding: 20px 20px 0px 20px;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    cursor: pointer;
    transition: 200ms ease-in-out;

    &:hover {
        transition: 200ms ease-in-out;
        transform: translateY(-6px);
    }
`

const NameField = styled.input`
    margin-top: 10px;
    font-size: 25px;
    width: 110px;
    height: 20px;
    outline: none;
    border: none;
    flex-grow: 1;
    user-select: none;
    cursor: ${props => props.editing};
`
const SmallText = styled.p`
    font-size: 13px;
    margin: 0;
`

const InfoButton = styled.div`
    background-color: 'orange';
`

const DeleteButton = styled.button`
    width: 50px;
    height: 30px;
    font-size: 10px;
    align-self: flex-start;
    color: white;
    visibility: ${props => props.show};
`

const NameContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

const EditButton = styled.button`
    height: 20px;
    display: ${props => props.show};
    margin-left: 10px;
`

export default function Notebook({ openNotebook, removeNotebook, notebook, setNotebooks, notebooks }) {
    const [hovered, setHovered] = useState(false)
    const [showDeleteModal, setDeleteModalVisibility] = useState(false)
    const [newNotebookName, setNewNotebookName] = useState(notebook.name)
    const [editing, setEditing] = useState(false)

    useEffect(() => {
    },[notebooks])

    const mouseEnter = (e) => {
        setHovered(true)
    }

    const mouseLeave = (e) => {
        setHovered(false)
    }

    const toggleEditing = (e) => {
        setEditing(!editing)
        
        if(!editing) return
        
        e.preventDefault()
        
        try {
            axios.post('http://localhost:5000/notebook/rename-notebook', {
                notebookName: notebook.name,
                newNotebookName: newNotebookName
            })    

            for (let i = 0; i < notebooks.length; i++) {

                if (notebooks[i].name === notebook.name) {
                    notebooks[i].name = newNotebookName
                    break
                }
            }     
            setNotebooks(notebooks)

        } catch(err) {
            console.error(1,err);
        }           
    }

    const editNameField = (e) => {
        
        if(!editing) return
        
        setNewNotebookName(e.target.value)
    }

    return (
        <>
            <DeletePopUp deleteNotebook={()=>removeNotebook(notebook)} notebookName={newNotebookName} showState={[showDeleteModal, setDeleteModalVisibility]}></DeletePopUp>
            <NotebookDiv  className="card m-3" onMouseEnter={mouseEnter} onMouseLeave={mouseLeave} key={notebook.name}>
                <DeleteButton show={hovered ? 'visible' : 'hidden'} className="d-flex justify-content-center align-items-lg-center btn btn-danger" onClick={() => setDeleteModalVisibility(true)}>
                    <FontAwesomeIcon  style={{height:'20px'}} icon={faTrash} />
                </DeleteButton>
                <FontAwesomeIcon style={{color:notebook.color, height:'70px'}}  icon={faBook} />

                <NameContainer>
                    {/* <NameField editing={editing ? 'text' : 'pointer'} onChange={(e)=> editNameField(e)} value={newNotebookName}></NameField> */}
                    {/*<EditButton editing={editing ? 'static' : 'none'} onClick={toggleEditing} show={hovered ? 'inline' : 'none'}>{!editing ? 'rename' : 'save'}</EditButton>*/}
                    <div>{newNotebookName}</div>
                </NameContainer>
                <InfoButton onClick={() => openNotebook(notebook)} className="btn btn-primary m-3">Open</InfoButton>
            </NotebookDiv>
        </>
    )
}
