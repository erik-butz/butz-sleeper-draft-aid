import Positions from './components/body/Positions'
import Footer from './components/footer/Footer'
import { Container, Flex } from '@chakra-ui/react'
import Top200 from './components/body/positions/Top200'
import { PlayerProvider } from './context/PlayerIdContext'
import Header from './components/header/Header'

function App() {
  return (
    <PlayerProvider bgColor='#203b60'>
      <Container bgColor='#203b60' maxW='100%' minH='100vh'>
        <Header maxH='10vh' />
        <Flex maxH='85.5vh' mb='5px' flexWrap={'wrap'} overflowY='scroll'>
          <Positions />
          <Top200 />
        </Flex>
        <Footer maxH='5vh' />
      </Container>
    </PlayerProvider>
  )
}

export default App
