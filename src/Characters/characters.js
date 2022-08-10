import useGetCharacterData from "../CharacterHooks/useGetCharacterData"

export default function Characters() {
  const [charactersWithPlanets, error, isLoaded] = useGetCharacterData()

  if (error) {
    return <div>Error: {error.message}</div>
  } else if (!isLoaded) {
    return <div>Loading...</div>
  } else {
    return (
      <div>
        <h1>Characters List</h1>
        <ul>
          {charactersWithPlanets.map((char, key) => (
            <li key={key}>
              {char[1].name}, {char[1].homeplanet}
            </li>
          ))}
        </ul>
      </div>
    )
  }
}
