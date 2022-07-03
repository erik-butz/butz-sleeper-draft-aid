import { GridItem, Box, Heading } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

function Top200() {
  const [leagueUsers, setLeagueUsers] = useState([])

  const url = `http://localhost:8000/rankings`
  const fetchUsers = async () => {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        {
          "rankings": "ffballers",
          "position": "TOP200"
        }
      )
    })
    const data = await response.json()
    setLeagueUsers(data)
  }
  useEffect(() => {
    setInterval(() => {
      fetchUsers()
    }, 3000)
  }, [])

  return (
    <GridItem w='100%' h='100%' bg='teal.50' colSpan={2}>
      <Heading>Overall Rankings</Heading>
      {!leagueUsers.length ? 'Loading....' : leagueUsers.map((player) => (
        <Box bgColor='orange.200' border='1px' color='black' borderColor='gray.200' m='1' key={player.player_id}>
          {player.draft_slot} {player.metadata.first_name} {player.metadata.last_name} {player.player_id} {player.metadata.position}
        </Box>
      ))}
    </GridItem>
  )
}

export default Top200
