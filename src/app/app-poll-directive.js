 (function () {
     'use strict';

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
                 }, scope.renderPoll, scope.renderLoadingError);

                 $timeout(function () {
                     scope.loadedPoll = true;
                 }, 3000);
             },

             controller: function ($scope) {
                 $scope.submitAnswer = function () {
                     console.log('submit answer[pollId, answerId]:', $scope.poll.pollId, $scope.poll.selectedAnswerId);
                 };
                 $scope.renderPoll = function (poll) {
                     $scope.poll = poll;
                 };

                 $scope.renderLoadingError = function () {
                     alert('error during loading poll');
                 }
             }
         };
     }

     angular.module('app').directive('poll', ['$timeout', 'PollFactory', PollDirective]);
 })();