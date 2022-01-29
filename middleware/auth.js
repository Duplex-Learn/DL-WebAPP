export default function ({ store, redirect }) {
  if (!store.state.jwt) {
    redirect('/login')
  }
}
