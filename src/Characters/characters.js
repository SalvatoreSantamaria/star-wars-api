import useGetCharacterData from "../CharacterHooks/useGetCharacterData";

export default function Characters() {
  const [error, isLoaded, characters, planets] = useGetCharacterData();

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        <h1>Characters List</h1>
        <ul>
          {characters.results.map((c, i) => (
            <li key={i}>{c.name}</li>
          ))}
        </ul>
      </div>
    );
  }
}
