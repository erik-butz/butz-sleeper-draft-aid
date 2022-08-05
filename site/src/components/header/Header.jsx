import { useContext } from 'react'
import { Box, Flex } from '@chakra-ui/react'
import SiteName from './SiteName'
import Search from './Search'
import PlayerIdContext from '../../context/PlayerIdContext'

const Header = () => {

  const { uniqueDraftId } = useContext(PlayerIdContext)

  return (
    <Box ml='.8em' flexWrap={'wrap'} >
      <Flex justifyContent={'flex-start'} flexWrap={'wrap'} >
        <Box w={[
          '100vw',
          '100vw',
          '100vw',
          '30vw',
        ]} pl='.5em'>
          <SiteName />
          <Search />
        </Box>
        <Box color='57607e' w='50vw' display={'flex'} justifyContent='flex-start' alignItems={'center'} fontSize={['1x1', '2xl', '3x1', '4xl']} ml='.5em'>
          Sleeper Draft Id: {uniqueDraftId}
        </Box>
      </Flex >
    </Box >
  )
}

export default Header
