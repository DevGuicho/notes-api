const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
const boom = require('@hapi/boom');
const { config } = require('../../../config');
const User = require('../../../models/User');

passport.use(
  new Strategy(
    {
      secretOrKey: config.secret,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    },
    async function (tokenPayload, cb) {
      try {
        const user = await User.findOne({ username: tokenPayload.username });
        if (!user) {
          return cb(boom.unauthorized(), false);
        }
        delete user.password;
        cb(null, user);
      } catch (error) {
        cb(error);
      }
    }
  )
);
