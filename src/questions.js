(function() {
    'use strict';

    angular.module('mcq')
    .component('mcqKnowledgeAreas', {
            template: ['<md-list>',
                '<md-list-item>',
                '<md-button md-no-ink class="md-primary" ui-sref="questions({ tag: \'all\' })" ',
                'flex>All knowledge areas</md-button>',
                '</md-list-item>',
                '<md-list-item ng-repeat="item in vm.knowledgeAreas">',
                '<md-button md-no-ink class="md-primary" ui-sref="questions({ tag: item })" ',
                'flex>{{ item }} </md-button>',
                '</md-list-item>',
                '</md-list>'
            ].join(''),
            controller: KnowledgeAreas,
            controllerAs: 'vm'
        })
        .component('mcqQuestions', {
            template: [
                '<md-content>',
                '<mcq-question model="questions.current()"></mcq-question>',
                '</md-content>',
                '<md-bottom-sheet class="md-grid" layout="row">',
                '<md-button class="md-icon-button" aria-label="Previous" ng-click="questions.previous()" ',
                'ng-disable="!questions.enabledPrevious()">',
                '<md-icon md-svg-icon="img/icons/previous.svg"></md-icon>',
                '</md-button>',
                '<span flex style="text-align: center;">',
                '<span>{{questions.index+1}} of {{questions.questions.length}}</span>',
                '</span>',
                '<md-button class="md-icon-button" aria-label="Next" ng-click="questions.next" ',
                'ng-disable="!questions.enabledNext()">',
                '<md-icon md-svg-icon="img/icons/next.svg"></md-icon>',
                '</md-button>',
                '</md-bottom-sheet>'
            ].join(''),
            bindings: {
                questions: '<'
            }
        })
        .component('mcqQuestion', {
            template: [
                '<md-card>',
                '<md-card-title>',
                ' <md-card-title-text>{{$ctrl.model.stem}}{{$$id}}</md-card-title-text>',
                '</md-card-title>',
                '<md-card-content>',
                ' <md-radio-group ng-model="$ctrl.model.selectedIndex">',
                '<md-list>',
                '<md-list-item ng-repeat="selection in $ctrl.model.selections">',
                '<md-radio-button value="{{$index}}" ng-click="selection.select()" ',
                'class="md-body-1 md-primary" ng-class="{\'md-warn\': !selection.isCorrect()}" ',
                'area-label="{{selection.text}}">{{selection.text}}</md-radio-button>',
                '</md-list-item>',
                '</md-list>',
                '</md-radio-group>',
                '<p class="md-body-1">{{$ctrl.model.description}}</p>',
                '</md-card-content>',
                '</md-card>'
            ].join(''),
            binding: {
                question: '<'
            }
        });
        
        
    KnowledgeAreas.inject$ = ['mcqViewModelFactory'];

    function KnowledgeAreas(mcqViewModelFactory) {
        return mcqViewModelFactory.KnowledgeAreas();
    }
})();