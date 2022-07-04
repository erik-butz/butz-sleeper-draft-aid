import React from 'react'
import {
  GridItem,
  Heading,
  SimpleGrid,
  Box,
  Container,
  Flex,
} from '@chakra-ui/react'
import '../../index.css'
import Quarterback from './positions/Quarterback'
import RunningBack from './positions/RunningBack'
import WideReceiver from './positions/WideReceiver'
import TightEnd from './positions/TightEnd'
import Defense from './positions/Defense'
import Kicker from './positions/Kicker'

function Positions() {
  return (
    <GridItem bg='orange.400' colSpan={6}>
      <Heading align='center'>Positions</Heading>
      <Flex>
        <Quarterback></Quarterback>
        <RunningBack></RunningBack>
        <WideReceiver></WideReceiver>
      </Flex>
      <Flex>
        <TightEnd></TightEnd>
        <Defense></Defense>
        <Kicker></Kicker>
      </Flex>
    </GridItem>
  )
}

export default Positions
