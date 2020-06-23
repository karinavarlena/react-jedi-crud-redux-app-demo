import {SET_PLANETS, DELETE_PLANET} from '../actions/planets'

const initialState = {
  allPlanets: []
}

function planets(state = initialState, action) {
  switch(action.type) {
    case SET_PLANETS:
      return {...state,
        allPlanets: action.planets
      };
      case DELETE_PLANET:
        return {...state,
          allPlanets: state.allPlanets.filter(planet => planet.id !== action.id)
        };
    default:
      return state;
  }
}

export default planets;