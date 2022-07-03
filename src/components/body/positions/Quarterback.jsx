import { GridItem, Box, Heading } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

const Quarterback = () => {
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
          "position": "QB"
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
      <Heading>QB</Heading>
      {!leagueUsers.length ? 'Loading....' : leagueUsers.map((player) => (
        <Box bgColor='orange.200' border='1px' color='black' borderColor='gray.200' m='1' key={player.player_id}>
          {player.metadata.first_name} {player.metadata.last_name}
        </Box>
      ))}
    </GridItem>
  )
}

export default Quarterback