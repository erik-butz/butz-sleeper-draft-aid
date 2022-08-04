import { Box, Heading, Center, Flex } from '@chakra-ui/react'
import React, { useEffect, useState, useContext } from 'react'
import PlayerIdContext from '../../../context/PlayerIdContext'
import { rankingEndpointHelper } from '../../../helper/rankingEndpointHelper'

function Top200() {
  const { draftedPlayersIds } = useContext(PlayerIdContext)
  const [players, setPlayers] = useState([])

  useEffect(() => {
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
    fetchUsers()
  }, [draftedPlayersIds])

  return (
    <Box ml='auto' mr='auto' bg='#8a8b9e' flexDirection='column' overflow='hidden' width={
      [
        "100%", // base
        "100%", // 480px upwards
        "37%", // 768px upwards
        "24%", // 992px upwards
      ]} >
      <Center color='white' w='100%' borderBottom='2px solid black' mb='1'>
        <Heading as='h1' color='black'> Overall Rankings</Heading >
      </Center>
      <Box overflowY='scroll' maxH='100vh'>
        {
          !players.length
            ? 'Loading....'
            : players.map((player) => (
              <Flex
                color='#57607e'
                key={player.Name}
                bg='#bbbac1'
                w='100%'
                borderBottom='1px solid grey'
              >
                {player.Rank}  {player.Name}
              </Flex>
            ))
        }
      </Box>
    </Box >
  )
}
export default Top200
