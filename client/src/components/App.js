import styled from 'styled-components'
import TitleBar from './TitleBar'
import '../style/index.css'
import { useRecoilState } from 'recoil'
import SelectedWindow from '../state/SelectedWindowState'
import SelectedNotebook from '../state/SelectedNotebookState'
import titleState from '../state/CurrentTitleState'
import Notebooks from './Notebooks'
import Pages from './Pages'
import { useEffect, useState } from 'react'

const Window = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
`

const MainContentContainer = styled.div`
  flex-grow: 1;
  display: flex;
  box-sizing: border-box;
`

export default function App() {

  const [selectedWindow, setSelectedWindow] = useRecoilState(SelectedWindow)
  const [selectedNotebook, setSelectedNotebook] = useRecoilState(SelectedNotebook)
  const [title, setTitle] = useRecoilState(titleState)

  let MainContent = null

  switch (selectedWindow) {
    case 'notebooks':
      MainContent = ((<Notebooks/>))
      setTitle('Notebooks')
      break;

    case 'pages':
      MainContent = ((<Pages />))
      setTitle(selectedNotebook)
      break;
  }

  return (
    <Window>
      <TitleBar />
      <MainContentContainer>
        {MainContent}
      </MainContentContainer>
    </Window>
  )
}
//{MainContent}
//todo
//delete notebooks
//delete pages
//rename notebooks
//rename pages
//display last edited 
//display the publish date