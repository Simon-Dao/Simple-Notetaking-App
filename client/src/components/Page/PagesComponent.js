import React, { useEffect } from 'react'
import styled from 'styled-components'

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


function PagesComponent({pages, selectPage, selectedPage}) {

  const formatPageName = (name) => {
    if(name.length > 5) 
      return name.substring(0,5) + '...'
      
    return name
  }

  return (
    <Container>
      <PagesContainer>
          {
            pages.map(item => {
              return (
                <Page className="" selected={selectedPage === item.name} onClick={()=>selectPage(item.name)}>{formatPageName(item.name)}</Page>
              )
            })
          }
      </PagesContainer>
    </Container>
  )
}
export default PagesComponent