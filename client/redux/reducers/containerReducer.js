import * as types from '../action/actionTypes';

const initialState = {
  containerList: [],
  metrics: [],
  time: 1
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
      const newMetrics = action.payload;
      return {
        ...state,
        metrics: newMetrics
      }
    case types.TIME_SELECTOR: {
      return {
        ...state,
        time: action.payload
      }
    }
    default: {
      return state;
    }
  }
};
