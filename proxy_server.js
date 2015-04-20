var express = require('express');
var app = express();

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


var pollData = [{
    pollId: 1,
    title: "What would you like to buy ... ?",
    answers: [{
        id: 1,
        text: "Mercedes S"
    }, {
        id: 2,
        text: "BMW e315"
    }, {
        id: 3,
        text: "Range Rover"
    }]
}, {
    pollId: 2,
    title: "If you had one billion dollars what would you do ... ?",
    answers: [{
        id: 1,
        text: "buy a car"
    }, {
        id: 2,
        text: "buy a home"
    }, {
        id: 3,
        text: "spent it asap"
    }]
}];

app.get('/', function (req, res) {
    return res.send(200);
});

function validationRequest(req, res, next) {
    'use strict';
    var requestPollId = req.query.id;
    if (isNaN(requestPollId)) {
        return res.status(500).send();
    }
    next();
}

app.get('/poll-data', validationRequest, function (req, res) {
    'use strict';
    var pollId = parseInt(req.query.id, 10);
    var found = null;

    for (var i = 0, max = pollData.length; i < max; i++) {
        if (pollData[i].pollId === parseInt(pollId, 10)) {
            found = pollData[i];
            break;
        }
    }

    if (found === null) {
        return res.status(404).send();
    }
    // setTimeout(function () {
    res.json(found);
    // }, 3000);
});

app.post('/poll-data', function (req, res) {
    var pollId = req.body.pollId;
    var answerId = req.body.answerId;
    console.log('pollId, answerId:', pollId, answerId);
    return res.send(200);
});

var server = app.listen(8081, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);

});