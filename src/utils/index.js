import {PermissionsAndroid} from 'react-native';
//
// export const geoClient = {
//   client: import('../wasm/geoclient.js')
//   .then(client => {
//     return client;
//   })
// }

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

async function requestPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        'title': 'Nuland needs your permission.',
        'message': `Nuland App needs permission to use your location`
      }
    )
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("You can use the camera")
    } else {
      console.log("Camera permission denied")
    }
  } catch (err) {
    console.warn(err)
  }
}

export default requestPermission
