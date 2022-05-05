import DraftBoard from './components/DraftBoard'
import PlayerRankings from './components/PlayerRankings'
import { Grid, GridItem } from '@chakra-ui/react'

function App() {
  return (
    <div>
      <Grid templateColumns='repeat(6, 1fr)' color='green' gap='2' >
        <DraftBoard></DraftBoard>
        <PlayerRankings></PlayerRankings>
      </Grid>
    </div>
  )
}

export default App
