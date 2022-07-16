import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { ReactComponent as Icon } from '../svg/notebook-svg.svg'
import { ReactComponent as EditIcon } from '../svg/edit.svg'
import axios from 'axios'

const NotebookDiv = styled.div`
    display: flex;
    border-radius: 30px;
    font-size: 20px;
    height: 230px;
    width: 200px;
    padding: 20px 20px 0px 20px;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    cursor: pointer;
    transition: 200ms ease-out;

    &:hover {
        transform: scale(1.2);
        transition: 200ms ease-in;
        outline: none;
        border-color: #9ecaed;
        box-shadow: 0 0 10px #9ecaed;
    }
`

const NameField = styled.input`
    margin-top: 10px;
    font-size: 20px;
    width: 110px;
    height: 20px;
    outline: none;
    border: none;
    flex-grow: 1;
    user-select: none;
    cursor: ${props => props.editing};
`
const SmallText = styled.p`
    font-size: 10px;
`

const NotebookIcon = styled(Icon)`
    width: 100px;
    height: 100px;
    min-height: 100px;
    min-width: 100px;
`

const DeleteButton = styled.button`
    width: 60px;
    height: 30px;
    border: none;
    border-radius: 30px;
    background-color: red;
    display: ${props => props.show};
    font-size: 10px;
    align-self: flex-start;
    color: white;
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
    const [showModal, setModalVisibility] = useState(false)
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
            <NotebookDiv onMouseEnter={mouseEnter} onMouseLeave={mouseLeave} key={notebook.name}>
                <DeleteButton onClick={() => removeNotebook(notebook)} show={hovered}>Remove</DeleteButton>
                <NotebookIcon fill={notebook.color} onClick={() => openNotebook(notebook)} />

                <NameContainer>
                    <NameField editing={editing ? 'text' : 'pointer'} onChange={(e)=> editNameField(e)} value={newNotebookName}></NameField>
                    <EditButton editing={editing ? 'static' : 'none'} onClick={toggleEditing} show={hovered ? 'inline' : 'none'}>{!editing ? 'rename' : 'save'}</EditButton>
                </NameContainer>
                <SmallText>{hovered ? 'created: ' + notebook.publishDate : ''}</SmallText>
                <SmallText>{hovered ? 'last edited: ' + notebook.lastEdited : ''}</SmallText>
            </NotebookDiv>
        </>
    )
}
