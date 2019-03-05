/* eslint-disable global-require */
const storeEnv = process.env.NODE_ENV === 'production'
    ? require('./store.prod') : require('./store.dev');

export default storeEnv
