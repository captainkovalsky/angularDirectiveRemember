// Code goes here
(function () {
    'use strict';

    var app = angular.module('app', ['ngResource']);

    function MainController($scope) {
        var thisCtrl = this;
    }

    app.controller('MainController', ['$scope', MainController]);

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

    app.factory('PollFactory', ['$resource', PollFactory]);

    function PollDirective($timeout, PollFactory) {
        return {
            restrict: 'E',
            templateUrl: 'poll-template.html',
            scope: {
                styleClass: '@styleClass'
            },
            link: function (scope, element, attrs) {
                scope.loadedPoll = false;
                PollFactory.get({
                    id: attrs.pollId
                });

                $timeout(function () {
                    scope.loadedPoll = true;
                }, 3000);
            },

            controller: function ($scope) {
                $scope.submitAnswer = function () {
                    alert('submit answer');
                }
            }
        };
    }

    app.directive('poll', ['$timeout', 'PollFactory', PollDirective]);
})();