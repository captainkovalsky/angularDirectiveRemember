 (function () {
     'use strict';

     function PollDirective($timeout, PollFactory) {
         return {
             restrict: 'E',
             templateUrl: 'poll-template.html',
             scope: {
                 styleClass: '@styleClass',
             },
             link: function (scope, element, attrs) {
                 scope.loading = true;
                 scope.error = false;
                 PollFactory.get({
                     id: attrs.pollId
                 }, scope.renderPoll, scope.renderLoadingError).$promise.finally(function () {
                     scope.loading = false;
                 });
             },

             controller: function ($scope) {
                 $scope.submitAnswer = function () {
                     console.log('submit answer[pollId, answerId]:', $scope.poll.pollId, $scope.poll.selectedAnswerId);
                 };
                 $scope.renderPoll = function (poll) {
                     $scope.poll = poll;
                 };

                 $scope.renderLoadingError = function () {
                     $scope.error = true;
                 }
             }
         };
     }

     angular.module('app').directive('poll', ['$timeout', 'PollFactory', PollDirective]);
 })();