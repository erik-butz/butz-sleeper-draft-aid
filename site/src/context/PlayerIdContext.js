import { createContext, useEffect, useRef, useState } from "react"

const PlayerIdContext = createContext()

export const PlayerProvider = ({ children }) => {
  const [draftedPlayersId, setDraftedPlayerIds] = useState([])
  const [url, setUrl] = useState('')
  const [uniqueDraftId, setUniqueDraftId] = useState('')
  const isMounted = useRef(false)

  useEffect(() => {
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

    if (isMounted.current) {
      const interval = setInterval(() => {
        fetchDraftedUsers()
      }, 1000)
      return () => clearInterval(interval)
    } else {
      isMounted.current = true
    }
  }, [draftedPlayersId, url])

  const setSleeperDraftId = (sleeperDraftId) => {
    setDraftedPlayerIds([])
    setUniqueDraftId(sleeperDraftId)
    setUrl(`https://api.sleeper.app/v1/draft/${sleeperDraftId}/picks`)
  }

  return <PlayerIdContext.Provider value={{
    draftedPlayersIds: draftedPlayersId,
    setSleeperDraftId,
    uniqueDraftId
  }}>
    {children}
  </PlayerIdContext.Provider>
}

export default PlayerIdContext