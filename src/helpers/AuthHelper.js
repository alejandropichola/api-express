class AuthHelper {
  static jwtTokenParam (token) {
    return token.replace(/Bearer /i, '').trim()
  }
}

module.exports = AuthHelper
