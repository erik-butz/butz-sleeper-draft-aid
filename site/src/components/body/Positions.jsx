import React from 'react'
import {
  Center,
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
    <WrapItem bg='orange.400' flexDirection='column' w='64%'>
      <Center color='white' w='100%' borderBottom='2px solid black' mb='1'>
        <Heading as='h1'>
          Positions
        </Heading>
      </Center>
      <Wrap display='flex' justify-content='center' align-items='center'>
        <Quarterback />
        <RunningBack />
        <WideReceiver />
        <TightEnd />
        <Defense />
        <Kicker />
      </Wrap>
    </WrapItem>
  )
}

export default Positions
