const axios = require('axios')

const instance = axios.create({
  baseURL: 'https://myhacktivoverflow-server.nadhiljanitra.xyz'
})

export default instance
