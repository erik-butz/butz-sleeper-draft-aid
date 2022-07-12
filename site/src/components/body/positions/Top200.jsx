import { GridItem, Box, Heading } from '@chakra-ui/react'
import React, { useEffect, useState, useContext } from 'react'
import PlayerIdContext from '../../../context/PlayerIdContext'
import { rankingEndpointHelper } from '../../../helper/rankingEndpointHelper'

function Top200() {
  const { draftedPlayersIds } = useContext(PlayerIdContext)
  const [players, setPlayers] = useState([])
  const url = rankingEndpointHelper()
  let filteredPlayersArray = []
  const fetchUsers = async () => {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        rankings: 'ffballers',
        position: 'TOP200',
      }),
    })
    const data = await response.json()
    data.forEach((player) => {
      if (!draftedPlayersIds.includes(player.player_id)) {
        filteredPlayersArray.push(player)
      }
    })
    setPlayers([...filteredPlayersArray])
  }
  useEffect(() => {
    fetchUsers()
  }, [draftedPlayersIds])

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
            key={player.Name}
          >
            {player.Rank} {player.Name}
          </Box>
        ))}
    </GridItem>
  )
}

export default Top200
