import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Button } from 'react-bootstrap'
import PopUp from './AddPopUp'
import axios from 'axios'
import getDate from '../../utils/Date'
import { useRecoilState } from 'recoil'
import SelectedNotebook from '../../state/SelectedNotebook'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faFileCirclePlus} from '@fortawesome/free-solid-svg-icons'

const Container = styled.div`
  width: 200px;
  display: flex;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
  flex-direction: column;
`

const PagesContainer = styled.div`
  height: 100%;
  overflow-y: scroll;
  padding: 10px;
`

const Page = styled.div`
  width: 100%;
  padding: 10px;
  box-shadow: rgba(0, 0, 0, 0.08) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
  border-radius: 5px;
  padding-left: 20px;
  overflow-wrap: break-word;
  margin-top: 10px;
  margin-bottom: 10px;
  min-height: 0px;
  background-color: ${props => props.selected ? '#0D6EFD' : 'white'};
  color: ${props => props.selected ? 'white' : 'black'};
  align-self: flex-start;
  user-select: none;
  cursor: pointer;
  transition: color 400ms ease-in-out;
`

function PagesComponent({ pagesState, selectPage, selectedPage }) {

  const [pages,setPages] = pagesState

  const formatPageName = (name) => {
    if (name.length > 5)
      return name.substring(0, 5) + '...'

    return name
  }

  const [show, setShow] = useState();
  const [selectedNotebook, setSelectedNotebook] = useRecoilState(SelectedNotebook)

  const addPage = (name) => {
    if (name.length === 0) {
      alert('please enter a name for the page')
      return
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
  }
  return (
    <Container>
      <PopUp addPage={addPage} showState={[show, setShow]}></PopUp>
      <PagesContainer>
        {
          pages.map(item => {
            return (
              <Page className="" selected={selectedPage === item.name} onClick={() => selectPage(item.name)}>{formatPageName(item.name)}</Page>
            )
          })
        }
      </PagesContainer>
      <Button style={{width:'100px', alignSelf:'flex-end', margin:'20px'}} onClick={() => setShow(!show)}>
        <FontAwesomeIcon style={{height:'20px',width:'20px'}} icon={faFileCirclePlus} />
      </Button>
    </Container>
  )
}
export default PagesComponent