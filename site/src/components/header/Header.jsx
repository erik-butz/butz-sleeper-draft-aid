import React from 'react'
import { Container, Wrap } from '@chakra-ui/react'
import SiteName from './SiteName'
import Search from './Search'

const Header = () => {
  return (
    <Wrap>
      <Container>
        <SiteName />
        <Search />
      </Container>
    </Wrap>
  )
}

export default Header
