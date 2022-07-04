import { Flex, Spacer, Heading, Container } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

const Defense = () => {
  const [defenses, setDefenses] = useState([])
  const url = `http://localhost:8000/rankings`
  const fetchUsers = async () => {
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
    console.log(data)
    setDefenses(data)
  }
  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <Container>
      <Heading size='lg' align='center' m='2'>
        D
      </Heading>
      {!defenses.length
        ? 'Loading....'
        : defenses.map((player) => (
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
            </Flex>
          ))}
    </Container>
  )
}

export default Defense
