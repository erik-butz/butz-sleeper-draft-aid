import { GridItem, Box } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

function PlayerRankings() {
  const [leagueUsers, setLeagueUsers] = useState([])

  //WB League
  //const leagueId = '730849095425609728'
  //Dynasty League
  const leagueId = '784526741342461952'
  const url = `https://api.sleeper.app/v1/league/${leagueId}/users`
  const fetchUsers = async () => {
    const response = await fetch(url)
    const data = await response.json()
    setLeagueUsers(data)
  }
  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <GridItem w='100%' h='800px' bg='teal.50' colSpan={2}>
        {leagueUsers.map((user) => (
          <Box key={user.user_id}>
            {user.display_name}
          </Box>
        ))}
    </GridItem>
  )
}

export default PlayerRankings
