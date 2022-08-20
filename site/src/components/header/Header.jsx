import { useContext } from 'react'
import { Box, Flex } from '@chakra-ui/react'
import SiteName from './SiteName'
import Search from './Search'
import PlayerIdContext from '../../context/PlayerIdContext'

const Header = () => {

  const { uniqueDraftId } = useContext(PlayerIdContext)

  return (
    <Box ml='.8em'>
      <Flex justifyContent={'flex-start'} >
        <Box w={[
          '100vw',
          '100vw',
          '100vw',
          '30vw',
        ]} pl='.5em'>
          <SiteName />
          <Search />
          <Box color='#fded96' fontSize={['2xl']}>
            Sleeper Draft Id: {uniqueDraftId}
          </Box>

        </Box>
      </Flex >
    </Box >
  )
}

export default Header
