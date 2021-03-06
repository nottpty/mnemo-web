import objectAssign from 'object-assign';
import * as actionTypes from '../../constants/profile/user'

const initialState = {
  gettingUser: false,
  getUserSuccess: false,
  getUserFailure: false,

  fetchingUser: false,
  fetchUserSuccess: false,
  fetchUserFailure: false,

  user: {},
  users: []
};

export default function tagReducer(state = initialState, action = {}) {
  let { type, user, users } = action;

  switch(type) {
    case actionTypes.USER_IS_GETTING:
      return objectAssign({}, state, {
        gettingUser: true,
        getUserSuccess: false,
        getUserFailure: false,
      });

    case actionTypes.USER_GET_SUCCESS:
      return objectAssign({}, state, {
        gettingUser: false,
        getUserSuccess: true,
        getUserFailure: false,
        user: user
      });

    case actionTypes.USER_GET_FAILURE:
      return objectAssign({}, state, {
        gettingUser: false,
        getUserSuccess: false,
        getUserFailure: true,
      });

    case actionTypes.USER_IS_FETCHING:
      return objectAssign({}, state, {
        fetchingUser: true,
        fetchUserSuccess: false,
        fetchUserFailure: false
      });

    case actionTypes.USER_FETCH_SUCCESS:
      return objectAssign({}, state, {
        fetchingUser: false,
        fetchUserSuccess: true,
        fetchUserFailure: false,
        users: users
      });

    case actionTypes.USER_FETCH_FAILURE:
      return objectAssign({}, state, {
        fetchingUser: false,
        fetchUserSuccess: false,
        fetchUserFailure: true,
      });

    default:
      return state;
  }
}
