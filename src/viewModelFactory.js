(function() {
    'use strict';
    
    var
        ALL = 'all',
        numberQuestionSelections = 4;

    angular.module('mcq')
        .factory('mcqViewModelFactory', mcqViewModelFactory);

    mcqViewModelFactory.$inject = ['mcqData', 'mcqShuffle'];

    function mcqViewModelFactory(mcqData, shuffle) {


        var QuestionSelection = function(data, parent, index) {
            this.text = data.text;
            this.description = data.description;
            this.id = data.id;
            this.index = index;
            this.parent = parent;
        };

        QuestionSelection.prototype.select = function() {
            this.parent.selectedIndex = this.index;
            this.parent.description = this.description;
        };

        QuestionSelection.prototype.isCorrect = function() {
            return (this.parent.selectedIndex.toString() === this.parent.correctIndex.toString());
        };


        var Question = function(data) {
            this.data = data;
            this.numberQuestionSelections = numberQuestionSelections;
            this.createQuestion();
            return this;
        };

        Question.prototype.createQuestion = function() {
            var alts = shuffle(this.data.alternates, this.numberQuestionSelections - 1),
                correct = angular.isArray(this.data.correct) ?
                shuffle(this.data.correct, 1)[0] :
                this.data.correct,
                i,
                j = 0;

            this.correctIndex = Math.floor(Math.random() * this.numberQuestionSelections);
            this.selectedIndex = -1;
            this.stem = this.data.stem;
            this.selections = [];
            for (i = 0; i < this.numberQuestionSelections; i += 1) {
                var a = (i === this.correctIndex ? correct : alts[j++]);
                this.selections.push(new QuestionSelection(a, this, i));
            }
            return this;
        };

        Question.prototype.isCorrect = function() {
            return (this.selectedIndex === this.correctIndex);
        };


        var QuestionsVm = function(data) {
            this.data = (!angular.isArray(this.data) ? data : []);
            this.index = -1;
            this.questions = [];
        };

        QuestionsVm.prototype.createQuestions = function(tag, numberQuestions) {
            tag = tag || ALL;
            numberQuestions = numberQuestions || this.data.length;
            this.index = 0;
            this.questions = shuffle(filterByTag(this.data, tag), numberQuestions)
                .map(function(item) {
                    return new Question(item);
                });
            return this;
        };

        QuestionsVm.prototype.selectQuestion = function(index) {
            if (index < 0 || index > this.questions.length - 1) {
                return;
            }
            this.index = index;
        };

        QuestionsVm.prototype.current = function() {
            return this.data[this.index];
        };

        QuestionsVm.prototype.enabledPrevious = function() {
            return this.index > 0;
        };

        QuestionsVm.prototype.previous = function() {
            this.index -= 1;
        };

        QuestionsVm.prototype.enabledNext = function() {
            return this.index < this.data.length - 1;
        };

        QuestionsVm.prototype.next = function() {
            this.index += 1;
        };

        var KnowledgeAreas = function(data) {

        };

        function filterByTag(data, tag) {
            if (tag === ALL) {
                return data;
            }
            return data.filter(function(question) {
                if ((angular.isArray(question.tags) && inArray(question.tags, tag)) ||
                    (angular.isString(question.tags) && question.tag === tag)) {
                    return question;
                }
            });
        }

        function inArray(arr, item) {
            for (var i = 0; i < arr.length; i++) {
                if (arr[i] === item) {
                    return true;
                }
            }
            return false;
        }


        return {
            knowledgeAreas: function() {
                return new KnowledgeAreas(mcqData.data);
            },
            questions: function() {
                return new QuestionsVm(mcqData.data);
            }
        };
    }
})();