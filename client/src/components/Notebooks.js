import React, { useEffect, useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { ReactComponent as Icon } from '../svg/notebook-svg.svg'
import getDate from '../utils/Date'
import {useRecoilState} from 'recoil'
import selectedState1 from '../state/SelectedState'
import SelectedWindow from '../state/SelectedWindowState'
import SelectedNotebook from '../state/SelectedNotebook'

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

const Notebook = styled.div`
    box-sizing: border-box;
    display: flex;
    border-radius: 30px;
    font-size: 20px;
    height: 200px;
    width: 200px;
    padding: 20px 20px 0px 20px;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    cursor: pointer;
`

const NotebookIcon = styled(Icon)`
    width: 100px;
    height: 100px;
`

const Subtext = styled.h1`
    font-size: 20px;
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
    border-radius: 100px;
    right: 200px;
    bottom: 150px;
    width: 100px;
    height: 100px;
    background-color: orange;
    border: none;
    cursor: pointer;
`

const ModalContainer = styled.div`
    box-sizing: border-box;
    position: absolute;
    right: 250px;
    bottom: 200px;
    width: 200px;
    height: 220px;
    border-radius: 10px;
    background-color: orange;
    display: ${props => props.show ? 'flex' : 'none'};
    flex-direction: column;
    align-items: center;
`

const ModalTextField = styled.input`
    height: 20px;
    border-radius: 10px;
`

const ModalLabel = styled.h1`
    font-size: 20px;
    height: 20px;
`

const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
`

const ModalButton = styled.button`
    background-color: green;
    border-radius: 10px;
    border: none;
    width: 80px;
    height: 30px;
    margin: 5px;
    margin-top: 30px;
    cursor: pointer;
`

const ColorContainer = styled.div`
    display: flex;
`

const ColorOption = styled.div`
    height: 25px;
    width: 25px;
    border: black 3px;
    margin: 1px;
    background-color: ${props => props.color};
    cursor: pointer;
`

export default function Notebooks() {

    const [notebooks, setNotebooks] = useState([])
    const notebookColors = ['#eee8aa', '#add8e6', '#9acd32', '#ff1493', '#cd853f', '#dc143c']
    const [showModal, setModalVisibility] = useState(false)
    const [emptyMessage, setEmptyMessage] = useState('Add a notebook!')
    const [selectedWindow, setSelectedWindow] = useRecoilState(SelectedWindow)
    const [selectedNotebook, setSelectedNotebook] = useRecoilState(SelectedNotebook)

    const [currentProgramState, setProgramState] = useRecoilState(selectedState1) 

    const [color, setColor] = useState(notebookColors[Math.floor(Math.random() * notebookColors.length)])
    const [name, setName] = useState('')

    useEffect(() => {

        const fetchData = async () => {

            try {
                let result = await axios.post('http://localhost:5000/notebook/get-notebooks')
                setNotebooks(result.data)
            }
            catch(err) {
                console.log(err)
                setEmptyMessage('Network Error! Could not load notebooks')
            }

        }
        fetchData()
    }, [])

    const toggleModal = () => {
        setModalVisibility(!showModal)
        setColor(notebookColors[Math.floor(Math.random() * notebookColors.length)])
    }

    const addNotebook = () => {
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

        const newState = {  
            selectedWebpage:  'pages',
            selectedNotebook: notebook.name,
            selectedPage:     notebook.pages.length > 0 ? notebook.pages[0] : newPage
        }

        setSelectedWindow('pages')
        setSelectedNotebook(notebook.name)

        setProgramState(newState)

        console.log(currentProgramState)
    }

    const content = Array.isArray(notebooks) && notebooks.length > 0 ?
        (
            notebooks?.map((notebook, index) => {

                return (
                    <Notebook onClick={() => openNotebook(notebook)} key={notebook.name}>
                        <NotebookIcon fill={notebook.color} />
                        <Subtext>{notebook.name}</Subtext>
                    </Notebook>
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
            <SearchBar type='text' placeholder='Search'></SearchBar>
            <NotebookContainer>
                {
                    content
                }
            </NotebookContainer>
            <AddNotebookButton onClick={toggleModal}>Add</AddNotebookButton>

            <ModalContainer show={showModal}>
                <ModalLabel>Notebook Name</ModalLabel>
                <ModalTextField maxLength={20} value={name} onInput={(e) => { setName(e.target.value) }}></ModalTextField>
                <ModalLabel>pick a color</ModalLabel>
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
                <ButtonContainer>
                    <ModalButton onClick={toggleModal}>cancel</ModalButton>
                    <ModalButton onClick={addNotebook}>submit</ModalButton>
                </ButtonContainer>
            </ModalContainer>

        </Container>
    )
}
