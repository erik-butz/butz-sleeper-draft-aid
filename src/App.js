import Positions from './components/body/Positions'
import Team from './components/body/Team'
import Footer from './components/footer/Footer'
import { Grid } from '@chakra-ui/react'
import Top200 from './components/body/positions/Top200'

function App() {
  return (
    <div>
      <Grid templateColumns='repeat(10, 1fr)' color='green' gap='2'>
        <Team></Team>
        <Positions></Positions>
        <Top200></Top200>
      </Grid>
      <Footer></Footer>
    </div>
  )
}

export default App
