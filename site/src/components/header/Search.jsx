import { Input, Button, Box, WrapItem } from '@chakra-ui/react'
import React from 'react'

const Search = () => {
  return (
    <WrapItem w='100%'>
      <Box width='40%' m='5px' maxWidth='300px'>
        <Input placeholder='SleeperDraftId' variant='outline'></Input>
      </Box>
      <Box m='5px' ml='0px'>
        <Button colorScheme='teal' variant='solid'>Submit</Button>
      </Box >
    </WrapItem >
  )
}

export default Search