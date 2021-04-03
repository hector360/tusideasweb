const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Usuario = require('../database/models/Usuario');
const bcrypt = require('bcrypt-nodejs');


passport.serializeUser((user, done) => {
  done(null, user[0].id);
});

passport.deserializeUser(async (id, done) => {
  const user = await Usuario.findAll({
      where: {
        id: id
      }
  });
  done(null, user);
});

passport.use('local-signup', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, email, password,  done) => {
  const user = await Usuario.findAll({
        where: {'email': email
        }
    })
  console.log(user)
  if(user != "") {
    return done(null, false, req.flash('signupMessage', 'The Email is already Taken.'));
  } else {
    var nuevaPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const newUser = await Usuario.create({
        "nombre": req.body.nombre,
        "email": email,
        "password": nuevaPassword
    });

    done(null, newUser);
  }
}));

passport.use('local-signin', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, email, password, done) => {
  const user = await Usuario.findAll({ 
    where:{email: email}
  });
  // console.log(user)
  if(user == "") {
    return done(null, false, req.flash('signinMessage', 'Usuario no encontrado'));
  }
  if(bcrypt.compareSync(password, user[0].password) == "") {
    return done(null, false, req.flash('signinMessage', 'Contraseña Incorrecta'));
  }
  return done(null, user);
}));