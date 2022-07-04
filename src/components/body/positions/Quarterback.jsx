import { Text, Heading, Container, Flex, Box, Spacer } from '@chakra-ui/react'
import '../../../App.css'
import React, { useEffect, useState } from 'react'

const Quarterback = () => {
  const [quarterBacks, setQuarterBacks] = useState([])
  const url = `http://localhost:8000/rankings`
  const fetchUsers = async () => {
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
    console.log(data)
    setQuarterBacks(data)
  }
  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <Container>
      <Heading size='lg' align='center' m='2'>
        QB
      </Heading>
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
    </Container>
  )
}

export default Quarterback
