/* eslint-disable global-require */

import storeProd from './store.prod'
import storeDev from './store.dev'

const storeEnv = process.env.NODE_ENV === 'production'
  ? storeProd : storeDev;

export default storeEnv
