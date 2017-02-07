const LOAD = 'redux-example/guestbooks/LOAD';
const LOAD_SUCCESS = 'redux-example/guestbooks/LOAD_SUCCESS';
const LOAD_FAIL = 'redux-example/guestbooks/LOAD_FAIL';
const LOAD_DETAIL = 'redux-example/guestbooks/LOAD_DETAIL';
const LOAD_DETAIL_SUCCESS = 'redux-example/guestbooks/LOAD_DETAIL_SUCCESS';
const LOAD_DETAIL_FAIL = 'redux-example/guestbooks/LOAD_DETAIL_FAIL';
const EDIT_START = 'redux-example/guestbooks/EDIT_START';
const EDIT_STOP = 'redux-example/guestbooks/EDIT_STOP';
const SAVE_BLOG = 'redux-example/guestbooks/SAVE_BLOG';
const SAVE_BLOG_SUCCESS = 'redux-example/guestbooks/SAVE_BLOG_SUCCESS';
const SAVE_BLOG_FAIL = 'redux-example/guestbooks/SAVE_BLOG_FAIL';
const IS_SLUG_EXISTS = 'redux-example/guestbooks/IS_SLUG_EXISTS';
const IS_SLUG_EXISTS_SUCCESS = 'redux-example/guestbooks/IS_SLUG_EXISTS_SUCCESS';
const IS_SLUG_EXISTS_FAIL = 'redux-example/guestbooks/IS_SLUG_EXISTS_FAIL';
const LOAD_ONE = 'redux-example/guestbooks/LOAD_ONE';
const LOAD_ONE_SUCCESS = 'redux-example/guestbooks/LOAD_ONE_SUCCESS';
const LOAD_ONE_FAIL = 'redux-example/guestbooks/LOAD_ONE_FAIL';
const UPDATE_BLOG = 'redux-example/guestbooks/UPDATE_BLOG';
const UPDATE_BLOG_SUCCESS = 'redux-example/guestbooks/UPDATE_BLOG_SUCCESS';
const UPDATE_BLOG_FAIL = 'redux-example/guestbooks/UPDATE_BLOG_FAIL';

const initialState = {
  loaded: false,
  editing: {},
  detail: {},
  data: [],
  guestbook: {},
  saveError: {}
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true,
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result.data,
        error: null
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        data: null,
        error: typeof action.error === 'string' ? action.error : 'Error'
      };
    case LOAD_DETAIL:
      return {
        ...state,
        loading: true
      };
    case LOAD_DETAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        detail: action.result,
        error: null
      };
    case LOAD_DETAIL_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        guestbook: null,
        error: typeof action.error === 'string' ? action.error : 'Error'
      };
    case LOAD_ONE:
      return {
        ...state,
        loading: true
      };
    case LOAD_ONE_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        guestbook: action.result,
        error: null
      };
    case LOAD_ONE_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        guestbook: null,
        error: typeof action.error === 'string' ? action.error : 'Error'
      };
    case EDIT_START:
      return {
        ...state,
        editing: {
          ...state.editing,
          [action.id]: true
        }
      };
    case EDIT_STOP:
      return {
        ...state,
        editing: {
          ...state.editing,
          [action.id]: false
        }
      };
    case SAVE_BLOG:
      return state;
    case SAVE_BLOG_SUCCESS:
      return {
        ...state,
        data: action.result
      };
    case SAVE_BLOG_FAIL:
      return typeof action.error === 'string' ? {
        ...state,
        saveError: {
          ...state.saveError,
          [action.id]: action.error
        }
      } : state;
    case UPDATE_BLOG:
      return state;
    case UPDATE_BLOG_SUCCESS:
      return {
        ...state,
        data: action.result
      };
    case UPDATE_BLOG_FAIL:
      return typeof action.error === 'string' ? {
        ...state,
        saveError: {
          ...state.saveError,
          [action.id]: action.error
        }
      } : state;
    case IS_SLUG_EXISTS:
      return {
        ...state,
        exist: true
      };
    case IS_SLUG_EXISTS_SUCCESS:
      return {
        ...state,
        slug: action.result.data,
        error: null
      };
    case IS_SLUG_EXISTS_FAIL:
      return {
        ...state,
        slug: null,
        error: typeof action.error === 'string' ? action.error : 'Error'
      };
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.blogs && globalState.guestbooks.loaded;
}

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: client => client.get('/guestbooks?&$sort[createdAt]=-1')
  };
}

export function loadDetail(slug) {
  return {
    types: [LOAD_DETAIL, LOAD_DETAIL_SUCCESS, LOAD_DETAIL_FAIL],
    promise: client => client.get(`/guestbook/${slug}`)
  };
}

export function loadOne(_id) {
  return {
    types: [LOAD_ONE, LOAD_ONE_SUCCESS, LOAD_ONE_FAIL],
    promise: client => client.get(`/guestbooks/${_id}`)
  };
}

export function save(guestbook) {
  return {
    types: [SAVE_BLOG, SAVE_BLOG_SUCCESS, SAVE_BLOG_FAIL],
    promise: client => client.post('/guestbooks', {
      data: guestbook
    })
  };
}

export function update(guestbook) {
  return {
    types: [UPDATE_BLOG, UPDATE_BLOG_SUCCESS, UPDATE_BLOG_FAIL],
    promise: client => client.patch(`/guestbooks/${guestbook._id}`, {
      data: guestbook
    })
  };
}

export function editStart(id) {
  return { type: EDIT_START, id };
}

export function editStop(id) {
  return { type: EDIT_STOP, id };
}

export function isSlugExists(slug) {
  return {
    types: [IS_SLUG_EXISTS, IS_SLUG_EXISTS_SUCCESS, IS_SLUG_EXISTS_FAIL],
    promise: client => client.get(`/guestbook/${slug}`, {
      slug
    })
  };
}
