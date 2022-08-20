import React from 'react'
import {
  Center,
  Heading,
  Flex,
  Box,
  Container
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
    <Box bg='#8a8b9e' ml='auto' mr='auto' width={[
      "100%", // base
      "100%", // 480px upwards
      "60%", // 768px upwards
      "74%", // 992px upwards
    ]}>
      <Container maxW='100%'>
        <Center color='black' borderBottom='2px solid black' >
          <Heading as='h1'>
            Positions
          </Heading>
        </Center>
        <Flex flexWrap={['wrap', 'wrap', 'wrap', 'warp', 'nowarp', 'nowrap']} >
          <Quarterback />
          <RunningBack />
          <WideReceiver />
          <TightEnd />
          <Defense />
          <Kicker />
        </Flex>
      </Container>
    </Box>
  )
}

export default Positions
