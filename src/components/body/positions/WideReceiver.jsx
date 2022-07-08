import { Flex, Spacer, Heading, Container } from '@chakra-ui/react'
import React, { useEffect, useState, useContext } from 'react'
import PlayerIdContext from '../../../context/PlayerIdContext'

const WideReceiver = () => {
  const { draftedPlayersIds } = useContext(PlayerIdContext)
  const [wideReceivers, setRunningBacks] = useState([])
  const url = `http://localhost:8000/rankings`
  let filteredWideReceiverArray = []
  const fetchWideReceivers = async () => {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        rankings: 'ffballers',
        position: 'WR',
      }),
    })
    const data = await response.json()
    data.forEach((player) => {
      if (!draftedPlayersIds.includes(player.player_id)) {
        filteredWideReceiverArray.push(player)
      }
    })
    setRunningBacks([...filteredWideReceiverArray])
  }
  useEffect(() => {
    fetchWideReceivers()
  }, [draftedPlayersIds])

  return (
    <Container>
      <Heading size='lg' align='center' m='2'>
        WR
      </Heading>
      {!wideReceivers.length
        ? 'Loading....'
        : wideReceivers.map((player) => (
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
    </Container>
  )
}

export default WideReceiver
