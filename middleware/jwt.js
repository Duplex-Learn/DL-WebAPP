import utils from '~/utils/utils'

export default function ({ store, req }) {
  const isClient = process.client
  const isServer = process.server
  // server
  if (isServer) {
    const cookies = utils.getcookiesInServer(req)
    const jwt = cookies.jwt ? cookies.jwt : ''
    store.commit('setJwt', jwt)
  }
  // client
  if (isClient) {
    const jwt = utils.getcookiesInClient('jwt')
    store.commit('setJwt', jwt)
  }
}
