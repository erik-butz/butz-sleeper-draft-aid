import React from 'react'
import { Wrap } from '@chakra-ui/react'
import SiteName from './SiteName'
import Search from './Search'

const Header = () => {
  return (
    <Wrap >
      <SiteName />
      <Search />
    </Wrap>
  )
}

export default Header
