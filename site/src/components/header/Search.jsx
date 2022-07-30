import { Input, Button, Box, WrapItem } from '@chakra-ui/react'
import React from 'react'

const Search = () => {
  return (
    <WrapItem w='55%'>
      <Box width='100%' m='5px'>
        <Input placeholder='SleeperDraftId' variant='outline'></Input>
      </Box>
      <Box w='20%' m='5px'>
        <Button colorScheme='teal' variant='solid'>Submit</Button>
      </Box >
    </WrapItem >
  )
}

export default Search