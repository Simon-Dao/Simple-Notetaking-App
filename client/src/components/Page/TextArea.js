import React, { useState } from 'react'
import styled from 'styled-components'
import { Button } from 'react-bootstrap'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil } from '@fortawesome/free-solid-svg-icons'
import EditPopUp from './EditPopUp';

const Container = styled.div`
box-sizing: border-box;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`
const TopContainer = styled.div`
  display: flex;
  padding: 20px;
`

const Label = styled.div`
  overflow-wrap: break-word;
  font-size: 30px;
  font-weight: bold;
  user-select: none;
  margin-left: 5px;
`
const Text = styled.div`
  display: flex;
  margin:20px;
  padding: 20px;
  font-size: 40px;
  border: none;
  outline: 0;
  box-shadow: rgba(50, 50, 93, 0.75) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  border-radius: 20px;
  overflow-y: scroll;
  flex:9
`
const SubText = styled.p`
  color: gray;
  font-size: 20px;
`

function TextArea({ selectedPage, saveContent, pages, contentState }) {

  const [content, setContent] = contentState
  const [saved, setSaved] = useState(false)
  const [showModal, setModalVisibility] = useState(false)

  function extractContent(s) {
    var span = document.createElement('span');
    span.innerHTML = s;
    return span.textContent || span.innerText;
  };

  const saveButtonClicked = () => {
    console.log(content)
    saveContent()
  }

  return (
    <Container>
      <EditPopUp showState={[showModal, setModalVisibility]}></EditPopUp>
      <TopContainer>
        <Button onClick={() => setModalVisibility(true)} className='btn btn-light' style={{ height: '50px' }}>
          <FontAwesomeIcon icon={faPencil} />
        </Button>
        <Label>{selectedPage} </Label>
      </TopContainer>
      <Text>
        <ReactQuill style={{ height: '80%', width: '100%' }} theme="snow" value={content} onChange={(c)=>{setContent(c)} }>
        </ReactQuill>
      </Text>
      <Button onClick={saveButtonClicked} style={{ flex: 1, height: '50px', width: '200px', margin: "0px 20px 20px 20px", alignSelf: "flex-end" }} >save</Button>
    </Container>
  )
}

/*
 <SubText>{saved ? "saved" : 'unsaved'}</SubText>
*/

export default TextArea