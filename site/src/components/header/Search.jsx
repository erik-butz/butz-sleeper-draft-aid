import { Input, Button, Box, WrapItem } from '@chakra-ui/react'
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
      <WrapItem w='100%'>
        <Box m='5px'>
          <Input
            placeholder='SleeperDraftId'
            variant='outline'
            type='text'
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
      </WrapItem >
    </form>
  )
}

export default Search