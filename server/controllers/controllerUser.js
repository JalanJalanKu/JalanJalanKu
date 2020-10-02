const { User } = require('../models')
const hashPassword = require('../helpers/hashPassword')
const { generateToken } = require('../helpers/jwt')
const { OAuth2Client } = require('google-auth-library');

class Controller {
    static registerUser(req, res, next) {
        const { email, password } = req.body
        const obj = { email, password }
        User.create(obj)
            .then(data => {
                data = {
                    id: data.id,
                    email: data.email
                }
                res.status(201).json({ msg: 'berhasil register', data })
            })
            .catch(next)
    }
    static loginUser(req, res, next) {
        const { email, password } = req.body
        const obj = { email, password }
        User.findOne({ where: { email } })
            .then(data => {
                if (!data || hashPassword(password) != data.password) throw { name: 'UnAuthorized', msg: 'invalid email or password' }
                let payload = {
                    id: data.id,
                    email: data.email
                }
                let token = generateToken(payload)
                res.status(200).json({ msg: 'berhasil login', token })
            })
            .catch(next)
    }

    static googleSign(req, res, next) {
        let email = null
        // console.log(req.body.tokenGoogle, '<<<<<<<token google nih')
        const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
        client.verifyIdToken({
            idToken: req.body.tokenGoogle,
            audience: process.env.GOOGLE_CLIENT_ID
        })
            .then(ticket => {
                let payload = ticket.getPayload();
                email = payload.email
                // console.log(payload, '<<<<payload verify googlenya')
                return User.findOne({
                    where: {
                        email
                    }
                })
            })
            .then(user => {
                if (user) return user //{id: 2, email:nablama@mail.com}, kalau user register manual
                else {
                    User.create({
                        email: email,
                        password: 'secretgg' + Math.round(Math.random() * 100)
                    }) //{id: 3, email:nabbaru@mail.com}
                }
            })
            .then(user => {
                let payload = {
                    email: user.email,
                    password: user.password
                }
                let token = generateToken(payload)

                res.status(200).json({
                    token,
                    msg: 'successfully login'
                })
            })
            .catch(err => {
                next(err)
            })
    }
}


module.exports = Controller