 (function () {
     'use strict';

     function PollDirective($timeout, PollFactory) {
         return {
             restrict: 'E',
             templateUrl: 'app/poll-directive/poll-template.html',
             scope: true,
             link: function (scope, element, attrs) {
                 scope.pollState = 'loading';
                 PollFactory.get({
                     id: attrs.pollId
                 }, scope.renderPoll, scope.renderLoadingError).$promise.finally(function () {});
             },

             controller: function ($scope) {
                 $scope.submitAnswer = function () {
                     console.log('submit answer[pollId, answerId]:', $scope.poll.pollId, $scope.poll.selectedAnswerId);
                     PollFactory.save({
                         pollId: 1,
                         answerId: 1
                     }, function () {
                         console.log('1');
                     });
                     //finished
                     $scope.pollState = 'finished';
                 };
                 $scope.renderPoll = function (poll) {
                     $scope.pollState = 'answering';
                     $scope.poll = poll;
                 };

                 $scope.renderLoadingError = function () {
                     $scope.pollState = 'error';
                 }
             }
         };
     }

     angular.module('app').directive('poll', ['$timeout', 'PollFactory', PollDirective]);
 })();