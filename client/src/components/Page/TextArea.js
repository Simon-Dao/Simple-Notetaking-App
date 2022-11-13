import React from 'react'
import styled from 'styled-components'
import { Button } from 'react-bootstrap'

const Container = styled.div`
box-sizing: border-box;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`
const Label = styled.div`
  padding-left: 20px;
  overflow-wrap: break-word;
  margin-bottom: 10px;
  font-size: 30px;
  font-weight: bold;
  user-select: none;
`
const Text = styled.textarea`
  flex-grow: 1;
  margin: 20px;
  padding: 20px;
  font-size: 40px;
  border: none;
  outline: 0;
  box-shadow: rgba(50, 50, 93, 0.75) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  border-radius: 20px;
`

function TextArea({selectedPage, saveContent, pages}) {

  const content = pages.filter(content => content.name === selectedPage)

  console.log(content)

  return (
      <Container>
        <Label>{selectedPage}</Label>
        <Text value={content ? content[0].content : ''}></Text>
        <Button onClick={saveContent} style={{height:'50px',width:'200px', margin:"0px 20px 20px 20px", alignSelf:"flex-end"}} >save</Button>
      </Container>
  )
}

export default TextArea