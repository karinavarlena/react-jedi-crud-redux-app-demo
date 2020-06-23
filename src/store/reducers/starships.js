import {SET_STARSHIPS, SET_STARSHIP, DELETE_STARSHIP} from '../actions/starships'

const initialState = {
  allStarships: []
}

function starships(state = initialState, action) {
  switch(action.type) {
    case SET_STARSHIPS:
      return {...state,
        allStarships: action.starships
      };
    case DELETE_STARSHIP:
      return {...state,
        allStarships: state.allStarships.filter(starship => starship.id !== action.id)
      };
    case SET_STARSHIP:
      return {...state,
        allStarships: [...state.allStarships, action.starship]
    };
    default:
      return state;
  }
}

export default starships;