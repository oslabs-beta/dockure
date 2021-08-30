import * as types from './actionTypes';

export const getContainerInfo = (payload) => ({
  type: types.CONTAINER_INFO_GET,
  payload,
});

export const setStateMetrics = (payload) => ({
  type: types.SET_STATE_METRICS,
  payload,
});
