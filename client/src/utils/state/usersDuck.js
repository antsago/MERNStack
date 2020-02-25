export const actionTypes = {
  LOAD_USERS: 'LOAD_USERS',
}

export function loadUsers() {
  return { type: actionTypes.LOAD_USERS }
}

const initialState = { loadedUsers: 'fii' }

function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.LOAD_USERS:
      return {
        ...state,
        loadedUsers: true,
      }

    default:
      return state
  }
}

export const usersLoaded = (state) => state.loadedUsers;

export default reducer