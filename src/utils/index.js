export const geoClient = {
  client: import('../wasm/geoclient.js')
  .then(client => {
    return client;
  })
}

export function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
      return response
  } else {
      var error = new Error(response.statusText)
      error.response = response
      throw error
  }
}

export function parseJSON(response) {
  return response.json()
}
