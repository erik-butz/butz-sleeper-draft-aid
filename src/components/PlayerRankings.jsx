import { GridItem, Box } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

function PlayerRankings() {
  const [leagueUsers, setLeagueUsers] = useState([])

  //WB League
  //const leagueId = '730849095425609728'
  //Dynasty League
  const draftId = '827766781534920704'
  const url = `https://api.sleeper.app/v1/draft/${draftId}/picks`
  const fetchUsers = async () => {
    const response = await fetch(url)
    const data = await response.json()
    setLeagueUsers(data)
  }
  useEffect(() => {
      setInterval(() => {
          fetchUsers()
      }, 3000)
  }, [])

  return (
    <GridItem w='100%' h='800px' bg='teal.50' colSpan={2}>
        {leagueUsers.map((player) => (
          <Box key={player.player_id}>
            {player.metadata.first_name} {player.metadata.last_name} {player.player_id}
          </Box>
        ))}
    </GridItem>
  )
}

export default PlayerRankings
