/* global fetch */
'use strict'

export const actionTypes = {
  REQUEST_PROBLEMS: 'REQUEST_PROBLEMS',
  RECEIVE_PROBLEMS: 'RECEIVE_PROBLEMS',
  REQUEST_FAILURE: 'REQUEST_FAILURE',

  CHANGE_USERNAME: 'CHANGE_USERNAME',
  FETCHED_DONE: 'FETCHED_DONE'
}

function loadProblems (userID) {
  return function (dispatch, getState) {
    const username = getState().problems[userID].username
    dispatch({
      type: actionTypes.REQUEST_PROBLEMS,
      username,
      userID
    })
    fetch(`http://acm.hungle.xyz/solved.php?username=${username}`)
    // fetch(`http://localhost:8080/public/${username}.json`)
      .then(response => response.json())
      .then(json => {
        dispatch({
          type: actionTypes.RECEIVE_PROBLEMS,
          username,
          userID,
          problems: json
        })
        const { problems } = getState()
        if (problems[0].status > 1 && problems[1].status > 1) {
          let data = {}
          for (const id in problems[0].problems) {
            const p = problems[0].problems[id]
            data[id] = {
              id, name: p.name,
              your: true, his: false
            }
          }
          for (const id in problems[1].problems) {
            const p = problems[1].problems[id]
            if (data[id]) {
              data[id].his = true
            } else {
              data[id] = {
                id, name: p.name,
                your: false, his: true
              }
            }
          }
          dispatch({
            type: actionTypes.FETCHED_DONE,
            data: data
          })
        }
      })
      .catch(error => dispatch({
        type: actionTypes.REQUEST_FAILURE,
        username,
        userID,
        error: error
      }))
  }
}

function changeUsername (username, userID) {
  return {
    type: actionTypes.CHANGE_USERNAME,
    username,
    userID
  }
}

export const actions = { loadProblems, changeUsername }
