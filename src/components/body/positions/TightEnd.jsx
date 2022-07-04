import { Flex, Spacer, Heading, Container } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

const TightEnd = () => {
  const [tightEnds, setTightEnds] = useState([])
  const url = `http://localhost:8000/rankings`
  const fetchUsers = async () => {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        rankings: 'ffballers',
        position: 'TE',
      }),
    })
    const data = await response.json()
    console.log(data)
    setTightEnds(data)
  }
  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <Container>
      <Heading size='lg' align='center' m='2'>
        TE
      </Heading>
      {!tightEnds.length
        ? 'Loading....'
        : tightEnds.map((player) => (
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

export default TightEnd
