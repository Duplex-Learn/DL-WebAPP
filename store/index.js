export const state = () => ({
  jwt: '',
})

export const mutations = {
  setJwt(state, jwt) {
    state.jwt = jwt
  },
}
