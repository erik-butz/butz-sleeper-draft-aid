import React from 'react'
import {
  GridItem,
  Heading,
  WrapItem,
  Wrap
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
      <Wrap>
        <WrapItem>
          <Quarterback />
        </WrapItem>
        <WrapItem>
          <RunningBack />
        </WrapItem>
        <WrapItem>
          <WideReceiver />
        </WrapItem>
        <WrapItem>
          <TightEnd></TightEnd>
        </WrapItem>
        <WrapItem>
          <Defense></Defense>
        </WrapItem>
        <WrapItem>
          <Kicker></Kicker>
        </WrapItem>
      </Wrap>
    </GridItem >
  )
}

export default Positions
