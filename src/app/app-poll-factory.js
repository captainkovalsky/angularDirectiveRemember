function PollFactory($resource) {
    var api = $resource("http://localhost:8081/poll-data", {
        callback: "JSON_CALLBACK"
    }, {
        get: {
            method: "JSONP"
        }
    });

    return api;
}

angular.module('app').factory('PollFactory', ['$resource', PollFactory]);