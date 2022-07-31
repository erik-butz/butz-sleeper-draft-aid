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
    <WrapItem bg='orange.400' flexDirection='column' width={[
      "100%", // base
      "100%", // 480px upwards
      "60%", // 768px upwards
      "74%", // 992px upwards
    ]}>
      <Center color='white' w='100%' borderBottom='2px solid black' mb='1'>
        <Heading as='h1'>
          Positions
        </Heading>
      </Center>
      <Wrap >
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
