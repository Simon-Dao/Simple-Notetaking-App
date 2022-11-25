import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Button } from 'react-bootstrap'
import PopUp from './AddPopUp'

import { useRecoilState } from 'recoil'
import SelectedNotebook from '../../state/SelectedNotebookState'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faFileCirclePlus} from '@fortawesome/free-solid-svg-icons'
import PagesState from '../../state/PagesState'

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

function PagesComponent({selectPage, selectedPage }) {

  const formatPageName = (name) => {
    if (name.length > 14)
      return name.substring(0, 5) + '...'

    return name
  }

  const [pages, setPages] = useRecoilState(PagesState)
  const [show, setShow] = useState();
  const [selectedNotebook, setSelectedNotebook] = useRecoilState(SelectedNotebook)

  const content = pages.length === 0 ? 'No Pages' :
    pages.map((item, index) => {
      return (
        <Page key={index} className="" selected={selectedPage === item.name} onClick={() => selectPage(item.name)}>{formatPageName(item.name)}</Page>
      )
    })

  return (
    <Container>
      <PopUp showState={[show, setShow]}></PopUp>
      <PagesContainer>
        {content}
      </PagesContainer>
      <Button style={{width:'100px', alignSelf:'flex-end', margin:'20px'}} onClick={() => setShow(!show)}>
        <FontAwesomeIcon style={{height:'20px',width:'20px'}} icon={faFileCirclePlus} />
      </Button>
    </Container>
  )
}
export default PagesComponent