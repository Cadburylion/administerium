const Authentication = require('./backend/controllers/authentication');
// eslint-disable-next-line no-unused-vars
const passportService = require('./backend/services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', {
  successRedirect: '/banned',
  failureRedirect: '/signin',
  session: false
});
const requireSignin = passport.authenticate('local', { session: false });

module.exports = app => {
  app.get('/', requireAuth, (req, res) => {
    res.send({ access: 'granted' });
  });
  app.post('/signin', requireSignin, Authentication.signin);
  app.post('/signup', Authentication.signup);
};
