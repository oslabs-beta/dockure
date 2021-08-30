import * as types from '../action/actionTypes';

const initialState = {
  containerList: [],
  metrics: [],
  //activeId?
};

export const containerReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.CONTAINER_INFO_GET: {
      return {
        ...state,
        containerList: action.payload,
      };
    }
    case types.SET_STATE_METRICS:
      console.log('Entered set_state_metrics');
      console.log(action.payload, 'payload')
      const newMetrics = action.payload;
      console.log(newMetrics, 'newMetrics')
      return {
        ...state,
        metrics: newMetrics
      }
    default: {
      return state;
    }
  }
};

//change reducer to include stats