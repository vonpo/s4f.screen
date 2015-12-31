angular.module("templates", []).run(["$templateCache", function($templateCache) {$templateCache.put("partials/vote-result.html","<div class=\"container container-column\">\r\n  <div ng-include=\"poll.poll.templateResults\"></div>\r\n</div>");
$templateCache.put("partials/vote-step.html","<div>\r\n    <div ng-include=\"step.template\"></div>\r\n</div>");
$templateCache.put("partials/vote.html","<div class=\"vote screen\">\r\n    <div ng-include=\"poll.poll.templateVote\"></div>\r\n</div>");
$templateCache.put("partials/ksw33/result.html","<div class=\"container container--space-around container--content-to-end screen-height\">\r\n    <div poll=\"ksw33\" options=\"materla\"></div>\r\n    <img class=\"poll-image\" src=\"img/materlavsmamedksw33.jpg\">\r\n    <div poll=\"ksw33\" options=\"mamed\"></div>\r\n</div>\r\n<div class=\"container container--center\">\r\n    <img src=\"img/qr.png\">\r\n    <button class=\"button button--vote\" ui-sref=\"vote({id: \'ksw33\'})\">Głosuj</button>\r\n</div>");
$templateCache.put("partials/ksw33/vote.html","<div  ng-controller=\"votePollCtrl as vote\">\r\n<button class=\"button button--vote button--vote-left\" ng-click=\"vote.vote(\'materla\')\">Głosuj na Materle</button>\r\n<div><img class=\"ui-display--block margin-auto\" src=\"img/materlavsmamedksw33.jpg\"></div>\r\n<button class=\"button button--vote button--vote-right\" ng-click=\"vote.vote(\'mamed\')\">Głosuj na Mameda</button>\r\n</div>");
$templateCache.put("partials/pages/main.html","<div>main</div>");
$templateCache.put("partials/tychy/konkurs1.html","<div class=\"container container-column screen--tychy ui-text--center\">\r\n    <div>Wygraj bilety w loży prezydenckiej na kolejny mecz!</div>\r\n    <div>Użyj smartfona, żeby wziąć udział w zabawie</div>\r\n</div>");
$templateCache.put("partials/tychy/result.html","<div class=\"container screen--tychy\">\r\n    <div class=\"tychy__players\">\r\n        <div roller class=\"container\">\r\n            <div ng-repeat=\"player in poll.poll.data\">\r\n                <div class=\"tychy__player container container--space-between container--content-to-end\">\r\n                    <img ng-src=\"{{player.picture}}\">\r\n                    <div poll=\"tychy\" options=\"{{player.option}}\"></div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>");
$templateCache.put("partials/tychy/step1.html","<div class=\"container container-column container--space-around screen--tychy ui-text--center\">\r\n    <div>Wygraj bilety w loży prezydenckiej na kolejny mecz!</div>\r\n    <div>Użyj smartfona, żeby wziąć udział w zabawie</div>\r\n</div>");
$templateCache.put("partials/tychy/step2.html","<div class=\"container container-column container--space-around screen--tychy ui-text--center\">\r\n    <div>Wejdź na adres <br/>\r\n        http://tychy-konkurs.pl\r\n    </div>\r\n</div>");
$templateCache.put("partials/tychy/step3.html","<div class=\"container container-column container--space-around screen--tychy ui-text--center\">\r\n    <div>Kto wygra dzisiejszy mecz ?</div>\r\n    <div><div poll=\"tychy-konkurs\" option=\"tychy\" orientation=\"horizontal\"><span class=\"ui-word--no-break\">GKS Tychy </span></div></div>\r\n    <div><div poll=\"tychy-konkurs\" option=\"kluczbork\" orientation=\"horizontal\"><span class=\"ui-word--no-break\">MKS Kluczbork </span></div></div>\r\n    <div>Głosuj teraz!</div>\r\n</div>");
$templateCache.put("partials/tychy/vote-konkurs1.html","<div class=\"container container-column\">\r\n    <div>\r\n\r\n    </div>\r\n</div>");
$templateCache.put("partials/tychy/vote.html","<div  ng-controller=\"votePollCtrl as vote\">\r\n    <div ng-repeat=\"player in poll.poll.data\">\r\n        <div style=\"width:500px;height: 640px;\"><button ng-click=\"vote.vote(player.option)\"><img  ng-src=\"{{player.picture}}\"></button></div>\r\n    </div>\r\n</div>");}]);