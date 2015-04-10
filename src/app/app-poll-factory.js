(function () {
    'use strict';

    function PollFactory($resource) {
        return $resource("http://localhost:8081/poll-data");
    }

    angular.module('app').factory('PollFactory', ['$resource', PollFactory]);
})();