import { GridItem, Box, Heading } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

function PlayerRankings() {
  const [leagueUsers, setLeagueUsers] = useState([])

  //WB League
  //const leagueId = '730849095425609728'
  //Dynasty League
  // const draftId = '845447437878411264'
  const draftId = '848709896873566208'
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

export default PlayerRankings
