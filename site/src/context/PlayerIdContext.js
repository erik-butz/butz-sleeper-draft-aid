import { createContext, useEffect, useState } from "react"

const PlayerIdContext = createContext()

export const PlayerProvider = ({ children }) => {
  const [draftedPlayersId, setDraftedPlayerIds] = useState([])
  const draftId = '854816351599034368'
  const url = `https://api.sleeper.app/v1/draft/${draftId}/picks`
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
    setInterval(() => {
      fetchDraftedUsers()
    }, 1000)
  }, [])


  return <PlayerIdContext.Provider value={{
    draftedPlayersIds: draftedPlayersId
  }}>
    {children}
  </PlayerIdContext.Provider>
}

export default PlayerIdContext