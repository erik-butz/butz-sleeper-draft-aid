import { createContext, useEffect, useRef, useState } from "react"

const PlayerIdContext = createContext()

export const PlayerProvider = ({ children }) => {
  const [draftedPlayersId, setDraftedPlayerIds] = useState([])
  const [url, setUrl] = useState('')
  const isMounted = useRef(false)

  let newDraftedPlayerArray = []

  const fetchDraftedUsers = async () => {
    const response = await fetch(url)
    const data = await response.json()

    data.forEach((player) => {
      if (!newDraftedPlayerArray.includes(player.player_id))
        newDraftedPlayerArray.push(player.player_id)
    })
    setDraftedPlayerIds([...draftedPlayersId, ...newDraftedPlayerArray])
  }

  useEffect(() => {
    if (isMounted.current) {
      //Need to figure out how to cancel this if a new draft id is submitted
      //Is there a better way to constantly fetch the live draft data besides interval every 1s?
      setInterval(() => {
        fetchDraftedUsers()
      }, 1000)
    } else {
      isMounted.current = true
    }
  }, [url])

  const setSleeperDraftId = (sleeperDraftId) => {
    setUrl(`https://api.sleeper.app/v1/draft/${sleeperDraftId}/picks`)
  }

  return <PlayerIdContext.Provider value={{
    draftedPlayersIds: draftedPlayersId,
    setSleeperDraftId
  }}>
    {children}
  </PlayerIdContext.Provider>
}

export default PlayerIdContext