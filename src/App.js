import Positions from './components/body/Positions'
import Team from './components/body/Team'
import Footer from './components/footer/Footer'
import { Grid } from '@chakra-ui/react'
import Top200 from './components/body/positions/Top200'
import { PlayerProvider } from './context/PlayerIdContext'

function App() {
  return (
    <PlayerProvider>
      {/* <Header></Header> */}
      <Grid templateColumns='repeat(10, 1fr)' color='green' gap='1'>
        <Team></Team>
        <Positions></Positions>
        <Top200></Top200>
      </Grid>
      <Footer></Footer>
    </PlayerProvider>
  )
}

export default App
