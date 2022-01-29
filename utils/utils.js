import Cookie from 'js-cookie'

export default {
  // Get Cookies in server
  getcookiesInServer(req) {
    let service_cookie = {}
    req &&
      req.headers.cookie &&
      req.headers.cookie.split(';').forEach(function (val) {
        let parts = val.split('=')
        service_cookie[parts[0].trim()] = (parts[1] || '').trim()
      })
    return service_cookie
  },
  // Get Cookies in client
  getcookiesInClient(key) {
    return Cookie.get(key) ? Cookie.get(key) : ''
  },
}
