import React from 'react'
import { useRecoilState } from 'recoil'
import styled from 'styled-components'
import titleState from '../state/CurrentTitle' 

const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80px;
  width: 100%;
  background-color: orange;
  font-size: 30px;
  user-select: none;
`

export default function TitleBar() {
  
  const [title, setTitle] = useRecoilState(titleState)
  
  return (
    <Content>{title}</Content>
  )
}
