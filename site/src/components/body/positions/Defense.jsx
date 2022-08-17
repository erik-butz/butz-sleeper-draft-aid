import { Flex, Heading, Box } from '@chakra-ui/react'
import React, { useEffect, useState, useContext } from 'react'
import PlayerIdContext from '../../../context/PlayerIdContext'
import { rankingEndpointHelper } from '../../../helper/rankingEndpointHelper'

const Defense = () => {
  const { draftedPlayersIds } = useContext(PlayerIdContext)
  const [defenses, setDefenses] = useState([])

  useEffect(() => {
    let filteredDefenseArray = []
    const url = rankingEndpointHelper()
    const fetchDefenses = async () => {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          rankings: 'ffballers',
          position: 'DST',
        }),
      })
      const data = await response.json()
      data.forEach((player) => {
        if (!draftedPlayersIds.includes(player.Team)) {
          filteredDefenseArray.push(player)
        }
      })
      setDefenses([...filteredDefenseArray])
    }
    fetchDefenses()
  }, [draftedPlayersIds])

  return (
    <Box pl='10px' pr='10px' display='flex'
      justify-content='center'
      align-items='center'
      flexDirection='column'
      width={
        ["100%", // base
          "100%", // 480px upwards
          "48%", // 768px upwards
          "32%", // 992px upwards
        ]}>
      <Heading size='lg' align='center' m='2'>
        D
      </Heading>
      <Box>
        {!defenses.length
          ? 'Loading....'
          : defenses.map((player) => (
            <Flex
              className={player.Tier % 2 === 0 ? 'evenTier' : 'oddTier'}
              border='1px'
              color='#57607e'
              borderColor='gray.200'
              key={player.Team}
            >
              <Flex ml='4'>
                {player.Rank}
                {') '}
                {player.Name}
              </Flex>
            </Flex>
          ))}
      </Box>
    </Box>
  )
}

export default Defense
