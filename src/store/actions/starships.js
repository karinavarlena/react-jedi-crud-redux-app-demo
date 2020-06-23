export const SET_STARSHIPS = 'SET_STARSHIPS'
export const SET_STARSHIP = 'SET_STARSHIP'
export const DELETE_STARSHIP = 'DELETE_STARSHIP'

export function setStarships(starships) {
  return { type: SET_STARSHIPS, starships };
}

export function deleteStarship(id) {
  return { type: DELETE_STARSHIP, id };
}

export function createStarship(starship) {
  return { type: SET_STARSHIP, starship };
}