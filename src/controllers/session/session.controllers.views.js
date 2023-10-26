export const HandleRenderSignIn = (req, res) => {
  req.logger.debug('Render sign in')
  res.render('session/signin', { title: 'Sign In' })
}
export const HandleRenderSignUp = (req, res) => {
  req.logger.debug('Render sign up')
  res.render('session/signup', { title: 'Sign Up' })
}
