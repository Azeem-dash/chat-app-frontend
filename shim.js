import './shim.js'
// ...the rest of your code
import crypto from 'crypto'
// use crypto
console.log(crypto.randomBytes(32).toString('hex'))