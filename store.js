import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import axios from 'axios';
import AppConfig from './lib/AppConfig';
import photos from './api-server/data/photos';

const exampleInitialState = {
  loadingComments: false,
  photoComments: [],
  photos
}

export const actionTypes = {
  LOAD_COMMENTS: 'LOAD_COMMENTS',
  LOAD_COMMENTS_SUCCESS: 'LOAD_COMMENTS_SUCCESS'
}

// REDUCERS
export const reducer = (state = exampleInitialState, action) => {
  switch (action.type) {
    case actionTypes.LOAD_COMMENTS:
      return Object.assign({}, state, {
        loadingComments: true,
      })
    case actionTypes.LOAD_COMMENTS_SUCCESS:
      return Object.assign({}, state, {
        photoComments: action.payload,
        loadingComments: false,
      })
    default: return state
  }
}

// ACTIONS
export const getPhotoComments = (data) => {
  data.dispatch({ type: actionTypes.LOAD_COMMENTS, id: data.id });
  axios.get(`${AppConfig.appUrl}/api/comments/`+data.id, {
    headers: {"Access-Control-Allow-Origin": "*", 'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH',}
  })
  .then(function (response) {
    data.dispatch({ type: actionTypes.LOAD_COMMENTS_SUCCESS, payload: response.data })
  })
  .catch(function (error) {
    console.log(error);
  });
}

export function initializeStore (initialState = exampleInitialState) {
  return createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunkMiddleware)))
}
