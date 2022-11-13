import React from 'react'
import styled from 'styled-components'
import { Button } from 'react-bootstrap'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faHouse} from '@fortawesome/free-solid-svg-icons'

const NavBarContainer = styled.div`
  height: 100%;
  width: 100px;
  display: flex;
  justify-content: center;
  padding: 10px;
`

function NavBar({backToNotebooks}) {
    return (
        <NavBarContainer>
            <Button style={{width:'100%',height:'50px'}} onClick={backToNotebooks}>
                <FontAwesomeIcon icon={faHouse} />   |
            </Button>
        </NavBarContainer>
    )
}

export default NavBar