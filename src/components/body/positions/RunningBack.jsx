import { Flex, Heading, Container, Spacer } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

const RunningBack = () => {
  const [runningBacks, setRunningBacks] = useState([])
  const url = `http://localhost:8000/rankings`
  const fetchUsers = async () => {
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
    console.log(data)
    setRunningBacks(data)
  }
  useEffect(() => {
    fetchUsers()
  }, [])

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

export default RunningBack
