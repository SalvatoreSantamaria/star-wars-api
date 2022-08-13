import { useEffect, useState } from "react"

function useGetCharacterData() {
  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [people, setPeople] = useState()
  const [planets, setPlanets] = useState()
  let planetURL = "https://swapi.dev/api/planets/?page="
  let peopleURL = "https://swapi.dev/api/people/?page="

  async function paginated_fetch(url, options) {
    let { page = 1, previousResponse = [], signal } = options
    return fetch(`${url}&page=${page}`, {signal})
      .then((response) => response.json())
      .then((newResponse) => {
        const response = [...previousResponse, ...newResponse.results]

        if (newResponse.next) {
          page++
          return paginated_fetch(url, {page, previousResponse: response, signal})
        }
        return response
      })
  }

  useEffect(() => {
    const controller = new AbortController(); //this logic will prevent unneeded API calls
    const signal = controller.signal;

    paginated_fetch(planetURL, { signal }).then(
      (r) => {
        setPlanets([...r])
      },
      // (e) => {
      //   setError(e)
      // }
    )
    paginated_fetch(peopleURL, { signal }).then(
      (r) => {
        setPeople([...r])
      },
      // (e) => {
      //   setError(e)
      // }
    )
    //setIsLoaded(true)

    
    return function cleanup() {
      controller.abort();
      // paginated_fetch.abort(peopleURL)
    }  

  }, [])

  const newPlanetMap = new Map()
  const peopleMap = new Map()

  if (planets) {
    const planetMap = new Map(Object.entries(planets))
    for (let [key, value] of planetMap) {
      newPlanetMap.set(value.url, value.name)
    }
  }

  const updatePeople = (people) => {
    for (let i in people) {
      const homeplanet = newPlanetMap.get(people[i].homeworld)
      peopleMap.set(i, { ...people[i], homeplanet })
    }
  }
  updatePeople(people)
  const charactersWithPlanets = [...peopleMap.entries()]

  return [charactersWithPlanets, error, isLoaded]
}

export default useGetCharacterData
