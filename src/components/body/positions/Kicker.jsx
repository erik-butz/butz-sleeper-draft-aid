import { Flex, Spacer, Heading, Container } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

const Kicker = () => {
  const [kickers, setKickers] = useState([])
  const url = `http://localhost:8000/rankings`
  const fetchUsers = async () => {
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
    console.log(data)
    setKickers(data)
  }
  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <Container>
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

export default Kicker
