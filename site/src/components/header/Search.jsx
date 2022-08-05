import { Input, Button, Box, Flex } from '@chakra-ui/react'
import { useContext, useState } from 'react'
import PlayerIdContext from '../../context/PlayerIdContext'

const Search = () => {
  const { setSleeperDraftId } = useContext(PlayerIdContext)
  const [inputText, setInputText] = useState('')

  const handleInputChange = ({ target: { value } }) => {
    setInputText(value)
  }

  const handleSubmit = (e) => {
    console.log(inputText)
    e.preventDefault()
    if (inputText.length === 0) {
      alert('Please enter a sleeper draft Id')
    }
    else {
      setSleeperDraftId(inputText)
    }
    setInputText('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <Flex w='100%'>
        <Box m='5px 5px 5px 0px'>
          <Input
            placeholder='SleeperDraftId'
            variant='outline'
            type='text'
            color='white'
            onChange={handleInputChange}
            value={inputText}
          />
        </Box>
        <Box m='5px' ml='0px'>
          <Button
            colorScheme='teal'
            variant='solid'
            type='submit'
          >Submit</Button>
        </Box >
      </Flex >
    </form>
  )
}

export default Search