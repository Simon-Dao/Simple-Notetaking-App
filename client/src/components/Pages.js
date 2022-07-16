import React, { useEffect, useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import getDate from '../utils/Date'
import { useRecoilState } from 'recoil'
import SelectedWindow from '../state/SelectedWindowState'
import SelectedNotebook from '../state/SelectedNotebook'
import SelectedPage from '../state/SelectedPageState'

const Container = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
`

const NavBarContainer = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.3);
  display: flex;
  width: 340px;
  height: 100%;
`

const SearchColumnContainer = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.3);
  width: 90px;
  display: flex;
  flex-direction: column;
`

const BackButton = styled.div`
  width: 100%;
  height: 50px;
  background-color: orange;
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
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

const PagesContainer = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding-left: 20px;
  padding-right: 20px;
  flex-grow: 1;
  border: 1px solid rgba(0, 0, 0, 0.3);
`
const PageContainer = styled.div`
  box-sizing: border-box;
  flex-grow: 1;
  height: 100%;
  font-size: 40px;
  padding: 20px;
  display: flex;
  flex-direction: column;
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

const ModalContainer = styled.div`
    box-sizing: border-box;
    position: absolute;
    left: 260px;
    bottom: 60px;
    width: 200px;
    height: 150px;
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

const TextArea = styled.textarea`
  width: 100%;
  flex-grow: 1;
  font-size: 40px;
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
      <NavBarContainer>
        <SearchColumnContainer>
          <BackButton onClick={backToNotebooks}>Notebooks</BackButton>
          <SearchBarButton>Search</SearchBarButton>
        </SearchColumnContainer>
        <PagesContainer>
          <PageName>{selectedPage}</PageName>

          {
            pages.map((page) => {

              return (
                <Page color={page.name === selectedPage ? 'gray' : 'white'} onClick={() => selectPage(page.name)} key={page.name}>{page.name}</Page>
              )
            })
          }

          <AddPageButton onClick={toggleModal}>Add a page</AddPageButton>
        </PagesContainer>
      </NavBarContainer>
      <PageContainer>
        <TextArea onChange={(e)=> setContent(e.target.value)} value={content}>
          
        </TextArea>
        <SaveButton onClick={saveContent}>Save</SaveButton>
      </PageContainer>

      <ModalContainer show={showModal}>
        <ModalLabel>Page Name</ModalLabel>
        <ModalTextField maxLength={20} value={name} onInput={(e) => { setName(e.target.value) }}></ModalTextField>
        <ButtonContainer>
          <ModalButton onClick={toggleModal}>cancel</ModalButton>
          <ModalButton onClick={addPage}>submit</ModalButton>
        </ButtonContainer>
      </ModalContainer>

    </Container>
  )
}
