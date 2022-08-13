import { useEffect, useState } from "react"
import useGetCharacterData from "../CharacterHooks/useGetCharacterData"

export default function Characters() {
  const [charactersWithPlanets, error, isLoaded] =
    useGetCharacterData()

  const [name, setName] = useState("")
  const [foundUsers, setFoundUsers] = useState([])

  const filter = (e) => {
    const keyword = e.target.value
    if (keyword !== "") {
      const results = charactersWithPlanets.filter((user) => {
        const splitName = user[1].name.split(" ")
        const lastName = splitName[splitName.length - 1]
          .toLowerCase()
          .startsWith(keyword.toLowerCase())
        const firstName = user[1].name
          .toLowerCase()
          .startsWith(keyword.toLowerCase())
        const planet = user[1].homeplanet
          .toLowerCase()
          .startsWith(keyword.toLowerCase())
        return planet || firstName || lastName
      })
      setFoundUsers(results)
    } else {
      setFoundUsers(charactersWithPlanets)
    }
    setName(keyword)
  }

  let charOutput = foundUsers.length > 0 ? foundUsers : charactersWithPlanets

  if (error) {
    return <div>Error: {error.message}</div>
  }

  // if (!isLoaded || !charactersWithPlanets.length) {
  //   return <div>Loading...</div>
  // }

  return (
    <div>
      <input
        type="search"
        value={name}
        onChange={filter}
        placeholder="Filter by Planet or Name"
      />
      <ul>
        {charOutput.map((char, key) => (
          <li key={key}>
            {char[1].name}, {char[1].homeplanet}
          </li>
        ))}
      </ul>
    </div>
  )
}
