import angular from 'angular';
import 'angular-sanitize';
import 'angular-ui-router';
import 'angular-animate';
import bootstrapSocketChannel from './socket/channel';
import PollDirective from './poll/directive.poll';
import Roller from './poll/directive.roller';
import VotePollCtrl from './poll/ctrl.vote';
import PollCtrl from './poll/ctrl.poll';
import StepCtrl from './poll/ctrl.step';
import 'restangular';
import setComponents from './di';
import './templates';

angular
    .module('app.projector', ['ngSanitize', 'ui.router', 'restangular', 'ngAnimate', 'templates'])
    .directive('poll', () => new PollDirective())
    .directive('roller', () => new Roller())
    .controller('votePollCtrl', VotePollCtrl)
	.controller('stepCtrl', StepCtrl)
    .controller('pollCtrl', PollCtrl)
    .config(['$stateProvider', '$locationProvider', '$urlRouterProvider',
        ($stateProvider, $locationProvider, $urlRouterProvider) => {
        $locationProvider.html5Mode(true);
        $stateProvider
            .state('poll', {
                url: '/projector/poll/:id',
                controller: 'pollCtrl as poll',
                templateUrl: 'partials/vote-result.html'
            })
            .state('pollStep', {
                url: '/projector/poll/:id/:step',
	            templateUrl: 'partials/vote-step.html',
	            controller: 'stepCtrl as step'
            });

        $urlRouterProvider.when('/','/poll/ksw33');
    }])
    .run((Restangular, $stateParams, $state, $timeout) => {
        setComponents({
            restangular: Restangular,
            stateParams: $stateParams,
            state: $state,
	        timeout: $timeout
        });

        console.info('app run - projector');
    });

angular
    .element(document)
    .ready(() => {
        bootstrapSocketChannel();
        angular.bootstrap(document, ['app.projector']);
    });