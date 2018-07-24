import { createStore, applyMiddleware, combineReducers } from 'redux'
import { handleActions } from 'redux-actions'
import promise from 'redux-promise'
import logger from 'redux-logger'

const app = handleActions({
  APP: {
    USER: {
      FETCH: {
        next: (state, action) => ({
          ...state,
          user: action.payload
        }),
        throw: (state, action) => ({
          ...state,
          user: undefined
        })
      }
    }
  }
}, { user: undefined })

const howto = handleActions({
  ARTICLES: {
    FETCH: (state, action) => ({
      ...state,
      articles: action.payload.items.items,
    })
  }
}, {
  articles: [],
  articleCount: 0,
  allArticleCount: 0
})

const contents = handleActions({
  CONTENTS: {
    FETCH_NEWS: (state, action) => ({
      ...state,
      news: action.payload
    }),
    FETCH_ABOUT: (state, action) => ({
      ...state,
      about: action.payload
    }),
    FETCH_CONTACT: (state, action) => ({
      ...state,
      contact: action.payload
    })
  }
}, {
  news: undefined,
  about: undefined,
  contact: undefined
})

const reducer = combineReducers({ app, howto, contents })

// See https://github.com/kirill-konshin/next-redux-wrapper
export const makeStore = (state, _options) => {
  return createStore(reducer, state, applyMiddleware(promise, logger))
}
