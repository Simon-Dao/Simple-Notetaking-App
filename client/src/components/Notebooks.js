import React, { useEffect, useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import getDate from '../utils/Date'
import {useRecoilState} from 'recoil'
import SelectedWindow from '../state/SelectedWindowState'
import SelectedNotebook from '../state/SelectedNotebook'
import NotebookComponent from './Notebook/Notebook'
import AddPopUp from './Notebook/AddPopUp'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faFolderPlus} from '@fortawesome/free-solid-svg-icons'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
`

const SearchBar = styled.input`
    width: 300px;
    height: 30px;
    border-radius: 20px;
    padding-left: 20px;
    padding-right: 20px;
    align-self: flex-end;
    margin-right: 200px;
    margin-top: 10px;
`

const NotebookContainer = styled.div`
    padding: 30px;
    display:flex;
    flex-wrap: wrap;
    flex-grow: 1;
    margin: 30px;
`

const Empty = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
    font-size: 50px;
    user-select: none;
`

const AddNotebookButton = styled.button`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    right: 200px;
    bottom: 150px;
    width: 100px;
    height: 50px;
    border: none;
    cursor: pointer;
`

export default function Notebooks() {

    const [notebooks, setNotebooks] = useState([])
    const notebookColors = ['#eee8aa', '#add8e6', '#9acd32', '#ff1493', '#cd853f', '#dc143c']
    const [showModal, setModalVisibility] = useState(false)
    const [emptyMessage, setEmptyMessage] = useState('Add a notebook!')
    const [selectedWindow, setSelectedWindow] = useRecoilState(SelectedWindow)
    const [selectedNotebook, setSelectedNotebook] = useRecoilState(SelectedNotebook)

    const [color, setColor] = useState(notebookColors[Math.floor(Math.random() * notebookColors.length)])

    useEffect(() => {

        const fetchData = async () => {

            try {
                let result = await axios.post('http://localhost:5000/notebook/get-notebooks')
                setNotebooks(result.data)
            }
            catch(err) {
                setEmptyMessage('Network Error! Could not load notebooks')
            }

        }
        fetchData()
    }, [])
    
    const toggleModal = () => {
        setModalVisibility(!showModal)
        setColor(notebookColors[Math.floor(Math.random() * notebookColors.length)])
    }

    const renameNotebook = (name, newName) => {
        
        for (let i = 0; i < notebooks.length; i++) {
            if (notebooks[i].name === name) {
                notebooks[i].name = newName
                break
            }
        }        

        setNotebooks(notebooks)
    }

    const addNotebook = (name) => {
        if (name.length === 0) {
            alert('please enter a name for the notebook')
            return
        }
        for (let i = 0; i < notebooks.length; i++) {
            if (notebooks[i].name === name) {
                alert('please enter a unique name')
                return
            }
        }
        //add the thing to the database
        axios.post('http://localhost:5000/notebook/add-notebook', {
            notebookName: name,
            color: color
        })


        //add it to array of notebooks
        notebooks.push({
            name: name,
            color: color,
            publishDate: getDate(),
            lastEdited: getDate(),
            pages: []
        })

        setNotebooks(notebooks)

        toggleModal()
    }

    const openNotebook = (notebook) => {

        const newPage = {
            name: 'page1',
            publishDate: getDate(),
            lastEdited: getDate(),
            content: ''
        }

        setSelectedWindow('pages')
        setSelectedNotebook(notebook.name)
    }

    const removeNotebook = (target) => {

        axios.post('http://localhost:5000/notebook/remove-notebook', 
            {
                notebookName: target.name
            }
        )
        setNotebooks(notebooks.filter((notebook) => notebook.name !== target.name))
    }

    const content = Array.isArray(notebooks) && notebooks.length > 0 ?
        (
            notebooks?.map((notebook, index) => {

                return (
                    <NotebookComponent key={notebook.name} notebook={notebook} setNotebooks={setNotebooks} notebooks={notebooks} openNotebook={openNotebook} removeNotebook={()=>removeNotebook(notebook)}></NotebookComponent>
                )
            })
        )
        :
        (
            <Empty>
                {emptyMessage}
            </Empty>
        )

    return (
        <Container>
            <AddPopUp addNotebook={addNotebook} setColor={setColor} showState={[showModal, setModalVisibility]}></AddPopUp>
            <SearchBar type='text' placeholder='Search'></SearchBar>
            <NotebookContainer>
                {
                    content
                }
            </NotebookContainer>
            <AddNotebookButton className="btn btn-primary" onClick={toggleModal}>
                <FontAwesomeIcon  style={{height:'20px'}} icon={faFolderPlus} />
            </AddNotebookButton>
        </Container>
    )
}
