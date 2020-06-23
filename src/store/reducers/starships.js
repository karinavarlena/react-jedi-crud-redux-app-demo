import {SET_STARSHIPS} from '../actions/starships'

const initialState = {
  allStarships: []
}

function starships(state = initialState, action) {
  switch(action.type) {
    case SET_STARSHIPS:
      return {...state,
        allStarships: action.starships
      };

    default:
      return state;
  }
}

export default starships;