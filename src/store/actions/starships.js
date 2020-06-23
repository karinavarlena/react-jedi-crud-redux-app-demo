export const SET_STARSHIPS = 'SET_STARSHIPS'
export const DELETE_STARSHIP = 'DELETE_STARSHIP'

export function setStarships(starships) {
  return { type: SET_STARSHIPS, starships };
}

export function deleteStarship(id) {
  return { type: DELETE_STARSHIP, id };
}
