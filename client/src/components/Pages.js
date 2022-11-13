import React, { useEffect, useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { useRecoilState } from 'recoil'
import SelectedWindow from '../state/SelectedWindowState'
import SelectedNotebook from '../state/SelectedNotebook'
import SelectedPage from '../state/SelectedPageState'
import NavBar from './Page/NavBar'
import PagesComponent from './Page/PagesComponent'
import TextArea from './Page/TextArea'

const Container = styled.div`
  display: flex;
  max-height: 100%;
  height: 100%;
  width: 100%;
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

  const saveContent = () => {
    console.log('saving content')
    axios.post('http://localhost:5000/page/edit-page', {
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
      <PagesComponent pagesState={[pages, setPages]} selectPage={selectPage} selectedPage={selectedPage} ></PagesComponent>
      <TextArea contentState={[content, setContent]} pages={pages} selectedPage={selectedPage} saveContent={saveContent}></TextArea>
    </Container>
  )
}
