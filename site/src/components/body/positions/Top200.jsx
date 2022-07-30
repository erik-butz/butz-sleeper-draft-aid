import { WrapItem, Box, Heading, Center } from '@chakra-ui/react'
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
    <WrapItem bg='teal.50' flexDirection='column' w='35%'>
      <Center color='white' w='100%' borderBottom='2px solid black' mb='1'>
        <Heading as='h1' color='black'> Overall Rankings</Heading >
      </Center>
      {
        !players.length
          ? 'Loading....'
          : players.map((player) => (
            <Box
              color='black'
              m='1'
              key={player.Name}
            >
              {player.Rank} {player.Name}
            </Box>
          ))
      }
    </WrapItem >
  )
}

export default Top200
