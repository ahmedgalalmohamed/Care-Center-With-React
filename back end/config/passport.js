const patient = require('../model/Patientdb');
const doctor = require('../model/doctordb');
const appoint = require('../model/appointment');
const passport = require('passport');
const passportStrategy = require('passport-local').Strategy;
//#region passport Sign In


module.exports = function (passport) {
    passport.use('localsignin', new passportStrategy({
        usernameField: 'phone',
        passwordField: 'password',
        passReqToCallback: true
    }, (req, phone, password, done) => {
        patient.findOne({ _id: phone }, (err, user) => {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false);
            }
            if (user) {
                if (user.password === password) {
                    return done(null, user);
                }
                else {
                    return done(null, false);
                }
            }
        })
    }));
    passport.serializeUser((user, done) => {
        return done(null, user.id);
    })

    passport.deserializeUser((id, done) => {
        patient.findOne({ _id: id }, (err, user) => {
            appoint.findById(id, (err, _appoint) => {
                if (!_appoint) {
                    return done(err, user);
                }
                user._appoint = _appoint;
                return done(err, user);
            })
        })
    })
}

//#endregion