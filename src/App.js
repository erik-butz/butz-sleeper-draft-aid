import Positions from './components/body/Positions'
import PlayerRankings from './components/body/PlayerRankings'
import Team from './components/body/Team'
import Footer from './components/footer/Footer'
import { Grid } from '@chakra-ui/react'

function App() {
  return (
    <div>
      <Grid templateColumns='repeat(10, 1fr)' color='green' gap='2'>
        <Team></Team>
        <Positions></Positions>
        <PlayerRankings></PlayerRankings>
      </Grid>
      <Footer></Footer>
    </div>
  )
}

export default App
