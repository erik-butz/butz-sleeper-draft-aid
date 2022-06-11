import React from 'react'
import { GridItem, Heading, SimpleGrid, Box } from '@chakra-ui/react'
import '../../index.css'

const positionsArray = ['QB', 'RB', 'WR', 'TE', 'D/ST', 'K']

//Player Object {
//   Player Name:
//   Postion:
//   Sleeper Id
//   Tier
//   
// }

function Positions() {
  return (
    <GridItem w='100%' h='100%' bg='orange.400' colSpan={6}>
      <Heading>Positions</Heading>
      <SimpleGrid columns={2} spacing={5}>
        {positionsArray.map((position) => (
          <Box key={position} bg='tomato' height='80px'>
            {position}
          </Box>
        ))}
      </SimpleGrid>
    </GridItem>
  )
}

export default Positions
