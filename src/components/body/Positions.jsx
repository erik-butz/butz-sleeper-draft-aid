import React from 'react'
import { GridItem, Heading, SimpleGrid, Box } from '@chakra-ui/react'
import '../../index.css'
import Quarterback from './positions/Quarterback'
import RunningBack from './positions/RunningBack'
import WideReceiver from './positions/WideReceiver'
import TightEnd from './positions/TightEnd'
import Defense from './positions/Defense'
import Kicker from './positions/Kicker'

function Positions() {
  return (
    <GridItem w='100%' h='100%' bg='orange.400' colSpan={6}>
      <Heading>Positions</Heading>
      <SimpleGrid columns={2} spacing={5}>
        <Box key='QB' bg='tomato' height='80px'>
          <Quarterback></Quarterback>
        </Box>
        <Box key='QB' bg='tomato' height='80px'>
          <RunningBack></RunningBack>
        </Box>
        <Box key='QB' bg='tomato' height='80px'>
          <WideReceiver></WideReceiver>
        </Box>
        <Box key='QB' bg='tomato' height='80px'>
          <TightEnd></TightEnd>
        </Box>
        <Box key='QB' bg='tomato' height='80px'>
          <Defense></Defense>
        </Box>
        <Box key='QB' bg='tomato' height='80px'>
          <Kicker></Kicker>
        </Box>
      </SimpleGrid>


    </GridItem>


  )
}

export default Positions
