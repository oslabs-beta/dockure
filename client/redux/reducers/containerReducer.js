import * as types from '../action/actionTypes';

const initialState = {
  containerList: [],
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
    default: {
      return state;
    }
  }
};
