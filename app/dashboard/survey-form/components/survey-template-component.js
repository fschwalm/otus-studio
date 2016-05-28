(function() {
    'use strict';

    angular
        .module('surveyTemplates')
        .component('surveyTemplate', {
            templateUrl: 'app/dashboard/survey-form/components/survey-template.html',
            controller: SurveyTemplateController,
            require: {
                parent: '^surveyTemplatesList'
            },
            bindings: {
                surveyTemplate: '<'
            }
        });

    SurveyTemplateController.$inject = ['SurveyTemplateManagerService', '$element'];

    function SurveyTemplateController(SurveyTemplateManagerService, $element) {
        var self = this;

        self.selectSurveyTemplate = selectSurveyTemplate;

        function selectSurveyTemplate() {
            SurveyTemplateManagerService.selectSurveyTemplate(self.surveyTemplate);
        }

        // DOM Manipulation
        $element.on('click', function() {
            var mdCard = $element.children();
            if (mdCard.hasClass('selected-template')) {
                mdCard.removeClass('selected-template');
            } else {
                mdCard.addClass('selected-template');
            }
        });
    }

})();
