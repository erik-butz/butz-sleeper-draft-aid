import { GridItem, Box, Heading } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

function Top200() {
  const [players, setPlayers] = useState([])

  const url = `http://localhost:8000/rankings`
  const fetchUsers = async () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ rankings: 'ffballers', position: 'TOP200' }),
    }
    const response = await fetch(url, requestOptions)
    const data = await response.json()
    setPlayers(data)
  }
  useEffect(() => {
      fetchUsers()
  }, [])

  return (
    <GridItem w='100%' h='100%' bg='teal.50' colSpan={2}>
      <Heading>Overall Rankings</Heading>
      {!players.length  
        ? 'Loading....'
        : players.map((player) => (
            <Box
              bgColor='orange.200'
              border='1px'
              color='black'
              borderColor='gray.200'
              m='1'
              key={player.player_id}
            >
              {player.Rank} {player.Name}
            </Box>
          ))}
    </GridItem>
  )
}

export default Top200
