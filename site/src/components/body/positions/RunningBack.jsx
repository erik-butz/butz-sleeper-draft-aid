import { Flex, Heading, Container, Spacer } from '@chakra-ui/react'
import React, { useEffect, useState, useContext } from 'react'
import PlayerIdContext from '../../../context/PlayerIdContext'
import { rankingEndpointHelper } from '../../../helper/rankingEndpointHelper'

const RunningBack = () => {
  const { draftedPlayersIds } = useContext(PlayerIdContext)
  const [runningBacks, setRunningBacks] = useState([])

  useEffect(() => {
    let filteredRunningbackArray = []
    const url = rankingEndpointHelper()
    const fetchRunningBacks = async () => {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          rankings: 'ffballers',
          position: 'RB',
        }),
      })
      const data = await response.json()
      data.forEach((player) => {
        if (!draftedPlayersIds.includes(player.player_id)) {
          filteredRunningbackArray.push(player)
        }
      })
      setRunningBacks([...filteredRunningbackArray])
    }

    fetchRunningBacks()
  }, [draftedPlayersIds])

  return (
    <Container>
      <Heading size='lg' align='center' m='2'>
        RB
      </Heading>
      {!runningBacks.length
        ? 'Loading....'
        : runningBacks.map((player) => (
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
            <Spacer />
            <Flex mr='4'>
              {'Tier: '}
              {player.Tier}
            </Flex>
          </Flex>
        ))}
    </Container>
  )
}

export default RunningBack
