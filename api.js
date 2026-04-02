require('express');
require('mongodb');
const token = require('./createJWT.js');

exports.setApp = function (app, client, state) {
    app.post('/api/addcard', async (req, res, next) => {
        // incoming: userId, color
        // outgoing: error
        const { userId, card, jwtToken } = req.body;

        try {
            if (token.isExpired(jwtToken)) {
                var r = { error: 'The JWT is no longer valid', jwtToken: '' };
                res.status(200).json(r);
                return;
            }
        }
        catch (e) {
            console.log(e.message);
        }

        const newCard = { Card: card, UserId: userId };
        var error = '';
        try {
            const db = client.db('COP4331Cards');
            await db.collection('Cards').insertOne(newCard);
        }
        catch (e) {
            error = e.toString();
        }
        if (state && Array.isArray(state.cardList)) {
            state.cardList.push(card);
        }

        var refreshedToken = null;
        try {
            refreshedToken = token.refresh(jwtToken);
        }
        catch (e) {
            console.log(e.message);
        }

        var ret = { error: error, jwtToken: refreshedToken };
        res.status(200).json(ret);
    });

    app.post('/api/login', async (req, res, next) => {
        // incoming: login, password
        // outgoing: id, firstName, lastName, error
        const { login, password } = req.body;
        var id = -1;
        var fn = '';
        var ln = '';

        var ret;

        if (state && state.isMongoReady && state.isMongoReady()) {
            const db = client.db('COP4331Cards');
            const results = await db.collection('Users').find({ Login: login, Password: password }).toArray();

            if (results.length > 0) {
                id = results[0].UserID;
                fn = results[0].FirstName;
                ln = results[0].LastName;

                try {
                    ret = token.createToken(fn, ln, id);
                }
                catch (e) {
                    ret = { error: e.message };
                }
            }
            else {
                ret = { error: 'Login/Password incorrect' };
            }
        }
        else {
            if ((login || '').toLowerCase() == 'rickl' && password == 'COP4331') {
                id = 1;
                fn = 'Rick';
                ln = 'Leinecker';
                try {
                    ret = token.createToken(fn, ln, id);
                }
                catch (e) {
                    ret = { error: e.message };
                }
            }
            else {
                ret = { error: 'Login/Password incorrect' };
            }
        }

        res.status(200).json(ret);
    });
    
    app.post('/api/searchcards', async (req, res, next) => {
        // incoming: userId, search
        // outgoing: results[], error
        var error = '';
        const { userId, search, jwtToken } = req.body;

        try {
            if (token.isExpired(jwtToken)) {
                var r = { error: 'The JWT is no longer valid', jwtToken: '' };
                res.status(200).json(r);
                return;
            }
        }
        catch (e) {
            console.log(e.message);
        }

        var _ret = [];

        if (state && state.isMongoReady && state.isMongoReady()) {
            try {
                var _search = search.trim();
                const db = client.db('COP4331Cards');
                const results = await db.collection('Cards').find({ "Card": { $regex: _search + '.*', $options: 'i' } }).toArray();
                for (var i = 0; i < results.length; i++) {
                    _ret.push(results[i].Card);
                }
            }
            catch (e) {
                error = e.toString();
            }
        }
        else {
            var localSearch = String(search || '').toLowerCase().trim();
            if (state && Array.isArray(state.cardList)) {
                for (var j = 0; j < state.cardList.length; j++) {
                    var lowerFromList = state.cardList[j].toLowerCase();
                    if (lowerFromList.indexOf(localSearch) >= 0) {
                        _ret.push(state.cardList[j]);
                    }
                }
            }
        }

        var refreshedToken = null;
        try {
            refreshedToken = token.refresh(jwtToken);
        }
        catch (e) {
            console.log(e.message);
        }

        var ret = { results: _ret, error: error, jwtToken: refreshedToken };
        res.status(200).json(ret);
    });
    
}