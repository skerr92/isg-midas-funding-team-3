const jwt = require('express-jwt')

const getTokenFromHeaders = (req) => {
    const header = req.headers

    let authorization = header.authorization;

    if(authorization && authorization.split(' ')[0] === 'Token') {
        return authorization.split(' ')[1]
    }
    return null
}

const auth = {
    required: jwt( { secret: 'midas-touch', algorithms: ['HS256'],  userProperty: 'payload', getToken: getTokenFromHeaders
    }),
    optional: jwt( { secret: 'midas-touch', algorithms: ['HS256'], userProperty: 'payload', getToken: getTokenFromHeaders, credentialsRequired: false
    })
}

module.exports = auth