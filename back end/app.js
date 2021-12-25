//#region All Variables The Server Is Need
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const expressSession = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
var app = express();
const port = process.env.PORT || 4000;
var doctor = require('./model/doctordb.js');
const patient = require('./model/Patientdb');
const appoint = require('./model/appointment');
const { findById } = require('./model/doctordb.js');
//connect db
mongoose.connect('mongodb://localhost/Care_Center', (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log("Connect Database")
    }
})
//connect db
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//
// view engine setup
const oneDay = 1000 * 60 * 60 * 24;
app.use(logger('dev'));
app.use(express.json());
app.use(
    cors({
        origin: "http://localhost:3000", // allow to server to accept request from different origin
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        credentials: true, // allow session cookie from browser to pass through
    })
);
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressSession({ secret: 'ahmed127653&*!', saveUninitialized: true, cookie: { maxAge: oneDay }, resave: true }));
app.use(flash());
require('./config/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());
//#endregion


//#region Routers

//#region Get Doctor Not Appointement
app.get('/doctorNotAss', Issignin, function (req, res, next) {
    doctor.find({}, (err, resulte) => {
        var drassigmnent = new Array();
        var countdr = 0;
        var drs = new Array();
        var drstem = new Array();
        if (err) {
            throw err;
        }
        if (req.user._appoint) {
            countdr = req.user._appoint.countdr;
            drassigmnent = req.user._appoint.dr;
            var match = false;
            //delete doctor  assignment from all doctors (for)
            for (let indexr = 0; indexr < resulte.length; indexr++) {
                for (let indexd = 0; indexd < drassigmnent.length; indexd++) {
                    if (resulte[indexr]._id === drassigmnent[indexd]._id) {
                        match = true;
                        break;
                    }
                    else {
                        match = false;
                    }
                }
                if (match === false) {
                    drstem.push(resulte[indexr]);
                }
            }
            for (let index = 0; index < drstem.length; index += 3) {
                drs.push(drstem.slice(index, index + 3));
            }

        } else {
            for (let index = 0; index < resulte.length; index += 3) {
                drs.push(resulte.slice(index, index + 3));
            }
        }

        res.send({ dr: drs, countdrassignment: countdr, countalldoctor: resulte.length });
        return;
    }).lean()
});
//#endregion

//#region signup post
app.post('/signup', Isnotsignin, (req, res, next) => {
    const phone = req.body.phone;
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    patient.findOne({ _id: phone }, (err, user) => {
        if (err) {
            throw err;
        }
        if (user) {
            res.send({ message: 'This Phone is Found' });
            return;
        }
        patient.findOne({ email: email }, (err, user) => {
            if (err) {
                throw err
            }
            if (user) {
                res.send({ message: 'This Email is Found' });
                return;
            }

            doctor.findOne({ _id: phone }, (err, user) => {
                if (err) {
                    throw err
                }
                if (user) {
                    res.send({ message: 'This Phone is Found' });
                    return;

                }
                doctor.findOne({ email: email }, (err, user) => {
                    if (err) {
                        throw err
                    }
                    if (user) {
                        res.send({ message: 'This Email is Found' });
                        return;

                    }
                    const dbpatient = new patient(
                        {
                            _id: phone,
                            name: name,
                            email: email,
                            password: password
                        }
                    );
                    ///////////////////////////////////////////////////////////////////////
                    dbpatient.save((err, user) => {
                        if (err) {
                            throw err
                        }
                        else {
                            res.send({ message: 'Success' });
                            return;
                        }
                    })
                    //////////////////////////////////////////////////////////////////////
                })
            })
        })

    })
})
//#endregion

// #region Get And Post Sign In
app.get('/signin', (req, res, next) => {
    var username = '';
    var countdrassignment = 0;
    if (req.isAuthenticated()) {
        username = req.user.name;
        if (req.user._appoint) {
            countdrassignment = req.user._appoint.countdr;
        }
        doctor.find({}, (err, doc) => {
            if (err) throw err;
            res.send({ isauthenticated: req.isAuthenticated(), username: username, countdrassignment: countdrassignment, countalldoctor: doc.length });
        }).lean();
    } else {
        res.send({ isauthenticated: req.isAuthenticated() });
    }
})

app.post('/signin', Isnotsignin, function (req, res, next) {
    passport.authenticate('localsignin', function (err, user, info) {
        if (err) { throw err }
        if (!user) { res.send('This User Not Exist'); return; }
        req.logIn(user, function (err) {
            if (err) { throw err; }
            res.send("Success");
            return;
        });
    })(req, res, next);
});
//#endregion

//#region Logout 
app.get('/logout', (req, res, next) => {
    req.logout();
    res.send('LogOut');
})
//#endregion

//#region Fun to sure isAuthenticated to display doctors
function Issignin(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.send('IsNotsAuthenticated');
        return;
    }
}
//#endregion

//#region Fun to sure isAuthenticated to enable sign up and sign in
function Isnotsignin(req, res, next) {
    if (req.isAuthenticated()) {
        res.send('isAuthenticated');
        return;
    } else {
        next();
    }
}
//#endregion

//#region Get User Profile
app.get('/userprofile', Issignin, (req, res, next) => {
    res.send({ user: req.user });
})
//#endregion

//#region  Get DoctorId Add
app.post('/doctorAdd', Issignin, function (req, res, next) {
    if (req.body.id == '' || req.body.id == '""' || req.body.email == '' || req.body.name == '') {
        res.send('is empty');
        return;
    }
    const date = new Date();
    date.setDate(date.getDate() + 3);
    datelo = date.toDateString();
    const appointid = req.user._id;
    const drs = {
        _id: req.body.id,
        name: req.body.name,
        email: req.body.email,
        datenow: datelo
    }

    appoint.findById(appointid, (err, _appoint) => {
        if (err) {
            throw err
        }
        if (!_appoint) {
            const newappoint = new appoint({
                _id: appointid,
                dr: [drs],
                countdr: 1,
            });
            newappoint.save((err, appoint_) => {
                if (err) {
                    throw err
                }
                else {
                    res.send({ appoint_: appoint_ });
                    return;
                }
            })
        }
        if (_appoint) {
            var indexcoun = -1;
            for (let index = 0; index < _appoint.dr.length; index++) {
                if (req.body.id === _appoint.dr[index]._id) {
                    indexcoun++;
                    break;
                }
            }
            if (indexcoun >= 0) {
                res.send("This Doctors Is Assignment");
                return;
            }
            else {
                _appoint.countdr += 1;
                _appoint.dr.push(drs);
                appoint.updateOne({ _id: appointid }, { $set: _appoint }, (err, __appoint) => {
                    if (err) {
                        throw err
                    }
                    if (__appoint) {
                        res.send({ __appoint: __appoint });
                    }
                })
            }
        }
    })
});
//#endregion

//#region Get Doctor  Appointement and Post
app.get('/doctorAss', (req, res, next) => {
    var drassigmnent = null;
    if (req.isAuthenticated() && req.user._appoint) {
        drassigmnent = req.user._appoint;
    }
    res.send({ drassigmnent: drassigmnent });
})

app.post('/doctorDelete', (req, res, next) => {
    deletedoctors(req, res, next);
})
//#endregion

//#region Function Doctor Delete 
function deletedoctors(req, res, next) {
    const drid = req.body.id;
    const appointid = req.user._id;
    if (req.isAuthenticated() && req.user._appoint) {
        const udpatedr = req.user._appoint;
        const drassigmnent = udpatedr.dr;
        for (let index = 0; index < drassigmnent.length; index++) {
            if (drassigmnent[index]._id === drid) {
                drassigmnent.splice(index, 1);
            }
        }
        udpatedr.countdr -= 1;
        udpatedr.dr = drassigmnent;
        appoint.updateOne({ _id: appointid }, { $set: udpatedr }, (err, __appoint) => {
            if (err) {
                throw err;
            }
            if (__appoint) {
                res.send({ __appoint: __appoint });
            }
        })
    }
}
//#endregion

//#region Udate Password
app.post('/updatePassword', Issignin, (req, res, next) => {
    const newpassword = req.body.password;
    const user = req.user;
    user.password = newpassword;
    patient.updateOne({ _id: req.user._id }, { $set: user }, (err, _user) => {
        if (err) throw err;
        else {
            res.send({ user: _user });
        }
    })
})
//#endregion

//#region Update UserName
app.post('/updateusername', Issignin, (req, res, next) => {
    const newusername = req.body.username;
    const user = req.user;
    user.name = newusername;
    patient.updateOne({ _id: req.user._id }, { $set: user }, (err, _user) => {
        if (err) throw err;
        else {
            res.send({ user: _user });
        }
    })
})
//#endregion

//#region Get Doctor Profile
app.post('/doctorprofile', Issignin, (req, res, next) => {
    const doctorid = req.body.doctorid;
    console.log(req.body.doctorid);
    doctor.findById(doctorid, (err, doc) => {
        if (err) throw err;
        res.send({ doctor: doc });
    }).lean()
})
//#endregion

//#endregion

app.listen(port, (err) => {
    if (err) console.log(err);
    console.log('Server is up and listening on', port);
});