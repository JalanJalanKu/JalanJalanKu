const { User } = require('../models')
const hashPassword = require('../helpers/hashPassword')
const {generateToken} = require('../helpers/jwt')

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
            res.status(201).json({msg: 'berhasil register', data})
        })
        .catch(next)
    }
    static loginUser(req, res, next) {
        const { email, password } = req.body
        const obj = { email, password }
        User.findOne({where: {email}})
        .then(data => {
            if (!data || hashPassword(password) != data.password) throw {name: 'UnAuthorized', msg: 'invalid email or password'}
            let payload = {
                id: data.id,
                email: data.email
            }
            let token = generateToken(payload)
            res.status(200).json({msg: 'berhasil login', token})
        })
        .catch(next)
    }
}

module.exports = Controller