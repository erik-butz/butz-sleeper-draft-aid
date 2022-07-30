import Positions from './components/body/Positions'
import Footer from './components/footer/Footer'
import { Wrap } from '@chakra-ui/react'
import Top200 from './components/body/positions/Top200'
import { PlayerProvider } from './context/PlayerIdContext'
import Header from './components/header/Header'

function App() {
  return (
    <PlayerProvider>
      <Header ></Header >
      <Wrap >
        <Positions />
        <Top200 />
      </Wrap>
      <Footer></Footer>
    </PlayerProvider>
  )
}

export default App
