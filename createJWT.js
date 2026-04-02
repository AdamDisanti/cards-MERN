const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.createToken = function (fn, ln, id) {
    return _createToken(fn, ln, id);
};

function _createToken(fn, ln, id) {
    if (!process.env.ACCESS_TOKEN_SECRET) {
        return { error: 'ACCESS_TOKEN_SECRET is not defined' };
    }

    try {
        const user = { userId: id, firstName: fn, lastName: ln };
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
        return { accessToken: accessToken };
    }
    catch (e) {
        return { error: e.message };
    }
}

exports.isExpired = function (token) {
    try {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        return false;
    }
    catch (err) {
        return true;
    }
};

exports.refresh = function (token) {
    try {
        const ud = jwt.decode(token, { complete: true });
        if (!ud || !ud.payload) {
            return { error: 'Invalid JWT payload' };
        }

        const userId = ud.payload.userId;
        const firstName = ud.payload.firstName;
        const lastName = ud.payload.lastName;
        return _createToken(firstName, lastName, userId);
    }
    catch (e) {
        return { error: e.message };
    }
};