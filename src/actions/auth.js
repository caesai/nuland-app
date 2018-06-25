export const actions = {
  signin: (payload) => ({
    type: 'SIGNIN',
    payload
  }),
  signup: (payload) => ({
    type: 'SIGNUP',
    payload
  }),
  logout: () => ({
    type: 'LOGOUT'
  })
};
