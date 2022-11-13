import React, { useEffect, useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import getDate from '../utils/Date'
import { useRecoilState } from 'recoil'
import SelectedWindow from '../state/SelectedWindowState'
import SelectedNotebook from '../state/SelectedNotebook'
import SelectedPage from '../state/SelectedPageState'
import {Button} from 'react-bootstrap'
import NavBar from './Page/NavBar'
import PagesComponent from './Page/PagesComponent'
import TextArea from './Page/TextArea'

const Container = styled.div`
  display: flex;
  max-height: 100%;
  height: 100%;
  width: 100%;
  `

const PageContainer = styled.div`
  background-color: blue;
  height: 100%;
  flex-grow: 1;
`

const SearchColumnContainer = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.3);
  width: 90px;
  display: flex;
  flex-direction: column;
`

const SearchBarButton = styled.div`
  width: 100%;
  height: 50px;
  background-color: orange;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`


const PageName = styled.div`
  height: 60px;
  width: 100%;
  background-color: aliceblue;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`

const AddPageButton = styled.button`
  position: absolute;
  width: 60px;
  height: 40px;
  left: 240px;
  bottom: 50px;
  background-color: orange;
  border-radius: 10px;
  cursor: pointer;
`

const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
`

const Page = styled.div`
  padding-left: 20px;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  height: 40px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  background-color: ${props => props.color};
  cursor: pointer;
`

const SaveButton = styled.button`
    background-color: green;
    border-radius: 10px;
    border: none;
    width: 180px;
    height: 70px;
    margin: 5px;
    margin-top: 30px;
    cursor: pointer;
    align-self: flex-end;
    margin-right: 50px;
`

export default function Pages() {

  const [pages, setPages] = useState([])
  const [emptyMessage, setEmptyMessage] = useState('Add a notebook!')
  const [selectedWindow, setSelectedWindow] = useRecoilState(SelectedWindow)
  const [selectedNotebook, setSelectedNotebook] = useRecoilState(SelectedNotebook)
  const [selectedPage, setSelectedPage] = useRecoilState(SelectedPage)
  const [showModal, setModalVisibility] = useState(false)
  const [name, setName] = useState('')
  const [content, setContent] = useState('')
  useEffect(() => {
    const fetchData = async () => {
      try {
        let result = await axios.post('http://localhost:5000/page/get-pages', { notebookName: selectedNotebook })
        setPages(result.data)

        const p = result.data.length > 0 ? result.data[0].name : 'none'

        setSelectedPage(p)
        selectPage(p)
      } 
      catch (err) {
        console.log(err)
        setEmptyMessage('Network Error! Could not load notebooks')
      }
    }
    fetchData()

  }, [])

  const toggleModal = () => {
    setModalVisibility(!showModal)
  }

  const addPage = () => {
    if (name.length === 0) {
      alert('please enter a name for the page')
      return
    }
    for (let i = 0; i < pages.length; i++) {
      if (pages[i].name === name) {
        alert('please enter a unique name')
        return
      }
    }

    //add the thing to the database
    axios.post('http://localhost:5000/page/add-page', {
      pageName: name,
      notebookName: selectedNotebook
    })

    //add it to array of pages
    pages.push({
      name: name,
      publishDate: getDate(),
      lastEdited: getDate(),
      content: ''
    })

    toggleModal()
  }

  const saveContent = () => {
    console.log('saving content')
    axios.post('http://localhost:5000/page/edit-page',{
      notebookName: selectedNotebook,
      pageName: selectedPage,
      content: content
    })
  }

  const selectPage = async (name) => {

    setSelectedPage(name)

    const result = await axios.post('http://localhost:5000/page/get-page', {
      notebookName: selectedNotebook,
      pageName: name
    })

    setContent(result.data.content)
  }

  const backToNotebooks = () => {
    setSelectedWindow('notebooks')
  }

  return (
    <Container>
      <NavBar backToNotebooks={backToNotebooks}>
      </NavBar>
      <PagesComponent pages={pages} selectPage={selectPage} selectedPage={selectedPage} ></PagesComponent>
      <TextArea pages={pages} selectedPage={selectedPage} saveContent={saveContent}></TextArea>
    </Container>
  )
}
