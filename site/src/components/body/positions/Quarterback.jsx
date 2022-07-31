import { Heading, Box, Flex, Spacer } from '@chakra-ui/react'
import '../../../App.css'
import React, { useEffect, useState, useContext } from 'react'
import PlayerIdContext from '../../../context/PlayerIdContext'
import { rankingEndpointHelper } from '../../../helper/rankingEndpointHelper'

const Quarterback = () => {
  const { draftedPlayersIds } = useContext(PlayerIdContext)
  const [quarterBacks, setQuarterBacks] = useState([])


  useEffect(() => {
    let filteredQuarterbackArray = []
    const url = rankingEndpointHelper()
    const fetchQuarterBacks = async () => {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          rankings: 'ffballers',
          position: 'QB',
        }),
      })
      const data = await response.json()
      data.forEach((player) => {
        if (!draftedPlayersIds.includes(player.player_id)) {
          filteredQuarterbackArray.push(player)
        }
      })
      setQuarterBacks([...filteredQuarterbackArray])
    }
    fetchQuarterBacks()
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
      < Heading size='lg' align='center' m='2' >
        QB
      </ Heading>
      {!quarterBacks.length
        ? 'Loading....'
        : quarterBacks.map((player) => (
          <Flex
            className={player.Tier % 2 === 0 ? 'evenTier' : 'oddTier'}
            border='1px'
            color='black'
            borderColor='gray.200'
            key={player.player_id}
          >
            <Flex ml='4'>
              {player.Rank}
              {') '}
              {player.Name}
            </Flex>
            <Spacer />
            <Flex mr='4'>
              {'Tier: '}
              {player.Tier}
            </Flex>
          </Flex>
        ))}
    </Box >
  )
}

export default Quarterback
