import PubSub from '../patterns/pubsub';
import {getComponent} from '../di';

const STEP_TIMEOUT = 5000;
var cache = {};

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

class PollPubSub extends PubSub {
    static get VOTED() {
        return 'on_voted';
    }

    static get CHANGE_SCREEN() {
        return 'on_change_screen';
    }

    static get NEW_PARTICIPANT() {
        return 'on_newParticipant';
    }

    onVoted(callback) {
        return this.on(PollPubSub.VOTED, callback);
    }

    onChangeScreen(callback) {
        return this.on(PollPubSub.CHANGE_SCREEN, callback);
    }

    onNewParticipant(callback) {
        return this.on(PollPubSub.NEW_PARTICIPANT, callback);
    }

    voted(data) {
        this.emit(PollPubSub.VOTED, data);
    }

    changeScreen(data) {
        this.emit(PollPubSub.CHANGE_SCREEN, data);
    }

    newParticipant(data) {
        this.emit(PollPubSub.NEW_PARTICIPANT, data);
    }

}

export const pollPubSub = new PollPubSub();

pollPubSub.onVoted(data => {
    cache[data.id] = Promise.resolve(data);
});

export function calculate(options, poll) {
    if (poll.name !== options.id) {
        return null;
    }

    var horizontalOrientation = options.orientation === 'horizontal';
    var current = poll.data.votes[options.option] || 0;
    var keys = Object.keys(poll.data.votes);
    var all = keys.reduce((sum, next) => {
        sum += poll.data.votes[next];

        return sum;
    }, 0);

    var percentage = (current / all) * 100;
    var display = Math.round(percentage);

    percentage = isNaN(percentage) ? '0%' : percentage + '%';

    return {
        percentageWidth: horizontalOrientation ? percentage : 'auto',
        percentageHeight: !horizontalOrientation ? percentage : 'auto',
        display: isNaN(display) ? '0%' : display + '%',
        percentage: display
    };
}

export function getPolls(parent) {
    const restangular = getComponent('restangular');

    return restangular.all('api/poll').getList({parent: parent});
}

export function getPoll(id = null, fromCache = false) {
    const stateParams = getComponent('stateParams');
    const restangular = getComponent('restangular');

    id = id || (stateParams.pollName || stateParams.id);
    var cached = cache[id];

    if (fromCache && cached) {
        return cached;
    } else {
        cache[id] = restangular.one('api/poll/' + (id || stateParams.pollName)).get();
        return cache[id];
    }
}

export function goToNextStep($state, params, options = {}) {
    const timeout = getComponent('timeout');
    return timeout(() => $state.go('poll', params), options.timeout || STEP_TIMEOUT);
}

export function cancelNextStep(step) {
    if (!step) {
        return;
    }

    const timeout = getComponent('timeout');

    timeout.cancel(step);
}

export function getParticipants() {
    const stateParams = getComponent('stateParams');
    const restangular = getComponent('restangular');

    return restangular.all('api/poll/' + stateParams.id + '/participant').getList();
}

export function getAnswers() {
    const stateParams = getComponent('stateParams');
    const restangular = getComponent('restangular');

    return restangular.all('api/poll/' + stateParams.id + '/answer').getList();
}

export function rotateAnswers(answers) {
    var index = getRandomInt(0, answers.length);
    var answer = answers[index];

    if (!answer) {
        return null;
    }

    answer.user.photo = 'img/users/' + answer.user._id + '/profile.png';
    return answers[index];
}

export function setPollOptions(poll) {
    if (poll.data.backgroundStyle) {
        angular.element(document.querySelector('html')).addClass(poll.data.backgroundStyle);
    }

    if (poll.editable && poll.editable.position) {
        var root = angular.element(document.querySelector('body'));
        var left = poll.editable.position.left;
        var top = poll.editable.position.top;

        if (!isNaN(left)) {
            root.css('margin-left', left + 'px');
        }

        if (!isNaN(top)) {
            root.css('margin-top', top + 'px');
        }
    }
}

export function getStep(poll, step) {
    if (step) {
        return poll.data.stepTemplates[step];
    }

    if (poll.last && poll.data.stepTemplates[poll.last]) {
        return poll.data.stepTemplates[poll.last];
    }

    return poll.data.stepTemplates[Object.keys(poll.data.stepTemplates)[0]];
}

export function getActiveByParent(parent) {
    const restangular = getComponent('restangular');

    return restangular.all('api/poll/' + parent + '/active').getList();
}