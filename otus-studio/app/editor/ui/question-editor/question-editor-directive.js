(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('otusQuestionEditor', otusQuestionEditor);

    otusQuestionEditor.$inject = [
        'QuestionEditorWidgetFactory',
        'SheetContentService',
        'UUIDService'
    ];

    function otusQuestionEditor(QuestionEditorWidgetFactory, SheetContentService, UUIDService) {
        var ddo = {
            scope: {},
            templateUrl: 'app/editor/ui/question-editor/question-editor.html',
            retrict: 'E',
            link: function linkFunc(scope, element, attrs) {
                scope.uuid = UUIDService.generateUUID();
                scope.widget = QuestionEditorWidgetFactory.create(scope, element, SheetContentService.lastLoadedQuestion);
            }
        };

        return ddo;
    }

}());
