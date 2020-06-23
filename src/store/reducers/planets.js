import {SET_PLANETS} from '../actions/planets'

const initialState = {
  allPlanets: []
}

function planets(state = initialState, action) {
  switch(action.type) {
    case SET_PLANETS:
      return {...state,
        allPlanets: action.planets
      };

    default:
      return state;
  }
}

export default planets;