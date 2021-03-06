export const SET_PLANETS = 'SET_PLANETS'
export const SET_PLANET = 'SET_PLANET'
export const DELETE_PLANET = 'DELETE_PLANET'

export function setPlanets(planets) {
  return { type: SET_PLANETS, planets };
}

export function createPlanet(planet) {
  return { type: SET_PLANET, planet };
}

export function deletePlanet(id) {
  return { type: DELETE_PLANET, id };
}
