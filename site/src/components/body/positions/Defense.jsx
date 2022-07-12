import { Flex, Heading, Container } from '@chakra-ui/react'
import React, { useEffect, useState, useContext } from 'react'
import PlayerIdContext from '../../../context/PlayerIdContext'

const Defense = () => {
  const { draftedPlayersIds } = useContext(PlayerIdContext)
  const [defenses, setDefenses] = useState([])

  useEffect(() => {
    let url
    console.log('NODE ENV:' + process.env.NODE_ENV)
    switch (process.env.NODE_ENV) {
      case 'local':
      case 'development':
        url = `http://localhost:8000/rankings`
        break;
      case 'production':
        url = 'https://butz-sleeper-draft-aid-backend.herokuapp.com/rankings'
        break;
      default:
        url = 'http://localhost:8000/rankings'
        break
    }
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
      setDefenses(data)
    }

    fetchDefenses()
  }, [draftedPlayersIds])

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
            key={player.Team}
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
