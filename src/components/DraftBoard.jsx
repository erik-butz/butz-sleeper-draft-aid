import React from 'react'
import { GridItem } from '@chakra-ui/react'
import '../index.css'

function DraftBoard() {
  return (
    <GridItem w='100%' h='800px' bg='orange.400' colSpan={4}> 
      <div>DraftBoard</div>
    </GridItem>
  )
}

export default DraftBoard
