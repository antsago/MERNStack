import Duck from '../Duck'

const { actions, duck } = Duck.fromSlice({
  name: 'users/loading',
  initialState: false,
  reducers: {
    start: () => true,
    stop: () => false
  }
})

export const areUsersLoading = duck.selector(state => state)

export const startLoading = actions.start
export const stopLoading = actions.stop

export default duck
