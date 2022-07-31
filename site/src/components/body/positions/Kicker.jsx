import { Flex, Heading, Box } from '@chakra-ui/react'
import React, { useEffect, useState, useContext } from 'react'
import PlayerIdContext from '../../../context/PlayerIdContext'
import { rankingEndpointHelper } from '../../../helper/rankingEndpointHelper'

const Kicker = () => {
  const { draftedPlayersIds } = useContext(PlayerIdContext)
  const [kickers, setKickers] = useState([])

  useEffect(() => {
    let filteredKickersArray = []
    const url = rankingEndpointHelper()
    const fetchKickers = async () => {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          rankings: 'ffballers',
          position: 'K',
        }),
      })
      const data = await response.json()
      data.forEach((player) => {
        if (!draftedPlayersIds.includes(player.player_id)) {
          filteredKickersArray.push(player)
        }
      })
      setKickers([...filteredKickersArray])
    }
    fetchKickers()
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
        K
      </Heading>
      {!kickers.length
        ? 'Loading....'
        : kickers.map((player) => (
          <Flex
            className={player.Tier % 2 === 0 ? 'evenTier' : 'oddTier'}
            border='1px'
            color='black'
            borderColor='gray.200'
            key={player.Name}
          >
            <Flex ml='4'>
              {player.Rank}
              {') '}
              {player.Name}
            </Flex>
          </Flex>
        ))}
    </Box>
  )
}

export default Kicker
