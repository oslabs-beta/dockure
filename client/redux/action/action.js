import * as types from './actionTypes';

export const getContainerInfo = (payload) => ({
  type: types.CONTAINER_INFO_GET,
  payload,
});
