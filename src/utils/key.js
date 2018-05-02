import { NativeModules } from 'react-native'
const { RNRandomBytes } = NativeModules

if (!global.Buffer) {
  global.Buffer = require('buffer/').Buffer;
}

const crypto = {

  randomBytes: (length:number) => new Promise((res, rej) => {
    RNRandomBytes.randomBytes(length, (err, base64String) => {
      if (err) {
        return rej(err);
      }

      res(Buffer.from(base64String, 'base64').toString('hex'));
    });
  })

};

export default crypto
