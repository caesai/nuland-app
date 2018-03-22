const geoClient = import('../wasm/geoclient.js')
.then(client => {
  return client;
});

export const actions = {
  auth: (payload) => ({
    type: 'SIGNIN',
    payload
  }),
  login: (payload) => ({
    type: 'LOGIN',
    payload
  }),
  logout: () => ({
    type: 'LOGOUT'
  })
};

export default geoClient
