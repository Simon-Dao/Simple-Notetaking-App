import React from 'react'
import { useRecoilState } from 'recoil'
import styled from 'styled-components'
import titleState from '../state/CurrentTitleState' 

const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  font-size: 30px;
  user-select: none;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
  color: white;
`

export default function TitleBar() {
  
  const [title, setTitle] = useRecoilState(titleState)
  
  return (
    <Content className="navbar navbar-dark bg-primary">{title}</Content>
  )
}
