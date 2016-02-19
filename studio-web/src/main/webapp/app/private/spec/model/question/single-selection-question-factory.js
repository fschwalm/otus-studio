(function() {
    'use strict';

    angular
        .module('spec')
        .factory('SingleSelectionQuestionFactory', SingleSelectionQuestionFactory);

    SingleSelectionQuestionFactory.$inject = ['QuestionAnswerOptionFactory'];

    function SingleSelectionQuestionFactory(QuestionAnswerOptionFactory) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(oid, prototype) {
            return new SingleSelectionQuestion(oid, prototype, QuestionAnswerOptionFactory);
        }

        return self;
    }

    function SingleSelectionQuestion(oid, prototype, QuestionAnswerOptionFactory) {
        var self = this;

        Object.defineProperty(this, 'extends', {
            value: prototype.objectType,
            writable: false
        });

        Object.defineProperty(this, 'objectType', {
            value: 'SingleSelectionQuestion',
            writable: false
        });

        Object.defineProperty(this, 'oid', {
            value: prototype.oid,
            writable: false
        });

        Object.defineProperty(this, 'dataType', {
            value: 'LocalDate',
            writable: false
        });

        Object.defineProperty(this, 'label', {
            value: prototype.label,
            writable: true
        });

        Object.defineProperty(this, 'option', {
            value: {},
            writable: true
        });
    }

}());