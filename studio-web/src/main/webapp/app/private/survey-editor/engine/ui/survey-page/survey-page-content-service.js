(function() {

    angular
        .module('editor.engine.ui')
        .service('SurveyPageContentService', SurveyPageContentService);

    SurveyPageContentService.$inject = [
        'editor.engine.ui.mpath',
        'TemplateLoaderService',
        'WidgetService',
        'UIUtils'
    ];

    function SurveyPageContentService(mpath, TemplateLoaderService, WidgetService, UIUtils) {
        var self = this,
            scope = null,
            surveyPage = null;

        /* Public interface */
        self.init = init;
        self.loadQuestion = loadQuestion;
        self.unloadQuestion = unloadQuestion;
        self.updateQuestion = updateQuestion;

        function init(scopeReference, surveyPageReference) {
            scope = scopeReference;
            surveyPage = surveyPageReference;
        }

        function loadQuestion(question) {
            var questionWidget = loadQuestionWidget(question),
                editorWidget = loadEditorWidget(questionWidget);

            mergeScopeData(editorWidget);
            loadTemplate();
        }

        function unloadQuestion(question) {
            surveyPage.find('[question-target="' + question.oid + '"]').remove();
        }

        function updateQuestion(question) {
            var targetExpression = '[es-id="survey-editor-question-' + question.oid + '-label"]',
                targetLabel = UIUtils.jq(surveyPage.find(targetExpression)[0]);

            targetLabel.text(question.label.ptBR.plainText);
        }

        function loadQuestionWidget(question) {
            return WidgetService.getWidgetForModel(question);
        }

        function loadEditorWidget(questionWidget) {
            return WidgetService.getQuestionEditorWidget(questionWidget);
        }

        function mergeScopeData(data) {
            scope.widgetTemplateList = scope.widgetTemplateList || [];
            scope.widget = data;
            scope.templateIndex = data.questionId;
            scope.widgetTemplateList[scope.templateIndex] = data.questionTemplate;
        }

        function loadTemplate() {
            TemplateLoaderService.load(mpath.getQuestionEditorWidgetPath(), scope, function(template) {
                scope.widget.template = template;
                surveyPage.append(scope.widget.template);
            });
        }
    }

}());
