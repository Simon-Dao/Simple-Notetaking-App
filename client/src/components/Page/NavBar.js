import React from 'react'
import styled from 'styled-components'
import { Button } from 'react-bootstrap'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons'
import {faBook} from '@fortawesome/free-solid-svg-icons'

const NavBarContainer = styled.div`
  height: 100%;
  width: 100px;
  display: flex;
  flex-direction: column; 
  padding: 10px;
`

function NavBar({backToNotebooks, editNotebooks}) {
    return (
        <NavBarContainer>
            <Button className='btn btn-lg' style={{margin:'5px 0 ',width:'100%',height:'50px'}} onClick={backToNotebooks}>
                <FontAwesomeIcon icon={faArrowLeft} />   |
            </Button>
            <Button className='btn btn-lg' style={{margin:'5px 0 ',width:'100%',height:'50px'}} onClick={()=>{}}>
                <FontAwesomeIcon icon={faBook} />   |
            </Button>
        </NavBarContainer>
    )
}

export default NavBar