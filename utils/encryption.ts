class Encryption {
    private publicKey: any;
    private privateKey: any;
    constructor(){
        this.generateKey().then((keys) => {
            this.privateKey = keys.privateKey;
            this.publicKey = keys.publicKey;
        }).catch(err => console.log('error in generating keys')) 

    }
    generateKey = async () => {
        const { publicKey, privateKey } = await window.crypto.subtle.generateKey(
            {
              name: "RSA-OAEP",
              modulusLength: 2048, // can be 1024, 2048, or 4096
              publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
              hash: { name: "SHA-256" }, // can be "SHA-1", "SHA-256", "SHA-384", or "SHA-512"
            },
            true, // whether the key is extractable (i.e. can be used in exportKey)
            ["encrypt", "decrypt"] // can be any combination of "encrypt" and "decrypt"
          );

          return {
            publicKey,
            privateKey
          }
    }
    encrypt = async (data: any) => {
        try {
            const encryptedData = await crypto.subtle.encrypt('RSA-OAEP', this.publicKey, data)
            return encryptedData;
        }
        catch(err) {
            console.log('error in performing encryption', err);
        }
    }

    decrypt = async (data: any) => {
        try {
            const decryptedData = await crypto.subtle.decrypt('RSA-OAEP', this.privateKey, data);
            return decryptedData
        }
        catch(err) {
            console.log('error in performing decryption', err);
        }
    }
}

export default Encryption;