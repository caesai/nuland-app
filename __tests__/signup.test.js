const Exonum = require('exonum-client');
const crypto = require('crypto');
const secp256k1 = require('secp256k1');

describe('Create transacrion for signing up user', () => {
  it('should return transaction hash', () => {
    function generatePrivateKey() {
      return new Promise ((resolve, reject) => {
          crypto.randomBytes(32, (err, buf) => {
            if (err) reject(err);
            resolve(buf);
          });
        }
      )
    }

    let privKey;
    let pubKey;

    generatePrivateKey().then( key => {
      privKey = key;
      pubKey = secp256k1.publicKeyCreate(key);
      const CreateTransaction = {
        protocol_version: 0,
        service_id: 128,
        message_id: 2,
        fields: [
          { name: 'pub_key', type: Exonum.PublicKey },
          { name: 'name', type: Exonum.String }
        ]
      }

      const TxCreateWallet = Exonum.newMessage(CreateTransaction);

      const data = {
        pub_key: pubKey.toString('hex'),
        name: 'username'
      }

      const signature = TxCreateWallet.sign(privKey.toString('hex'), data)

      TxCreateWallet.signature = signature

      const hash = TxCreateWallet.hash(data)

      TxCreateWallet.send(TX_URL, '/api/explorer/v1/transactions/', data, signature)
      .then(() => {
        expect(data).toBeDefined();
        expect(data.tx_hash).toEqual(hash)
      })
    });

  })
})
