export const SET_PEOPLE = 'SET_PEOPLE'
export const DELETE_PERSON = 'DELETE_PERSON'
export const CHANGE_BELOVED_STATUS = 'CHANGE_BELOVED_STATUS'
export const SET_PERSON = 'SET_PERSON'

export function setPeople(people) {
  return { type: SET_PEOPLE, people };
}

export function deletePerson(id) {
  return { type: DELETE_PERSON, id };
}

export function createPerson(person) {
  return { type: SET_PERSON, person };
}

export function changeBelovedStatus(id) {
  return { type: CHANGE_BELOVED_STATUS, id};
}