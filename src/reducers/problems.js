'use strict'
import {
  actionTypes
} from '../actions/problems'

const {
  REQUEST_PROBLEMS, RECEIVE_PROBLEMS, REQUEST_FAILURE,
  CHANGE_USERNAME, FETCHED_DONE
} = actionTypes

const initialState = {
  0: {
    username: 'admin',
    status: 0,
    problems: []
  },
  1: {
    username: 'trevorjoker',
    status: 0,
    problems: []
  },
  data: {},
  status: 0
}

export default function problems (state = initialState, action) {
  switch (action.type) {
    case REQUEST_PROBLEMS:
      return {
        ...state,
        [action.userID]: {
          ...state[action.userID],
          status: 1,
          problems: []
        },
        data: {},
        status: 1
      }
    case RECEIVE_PROBLEMS:
      return {
        ...state,
        [action.userID]: {
          ...state[action.userID],
          status: 2,
          problems: action.problems
        },
        data: {}
      }
    case REQUEST_FAILURE: {
      return {
        ...state,
        [action.userID]: {
          ...state[action.userID],
          status: 3,
          problems: []
        },
        data: {},
        status: 2,
        err: action.err
      }
    }
    case CHANGE_USERNAME: {
      return {
        ...state,
        [action.userID]: {
          ...state[action.userID],
          status: 0,
          username: action.username
        },
        data: {},
        status: 0
      }
    }
    case FETCHED_DONE: {
      return {
        ...state,
        data: action.data,
        status: 2
      }
    }
    default:
      return state
  }
}
