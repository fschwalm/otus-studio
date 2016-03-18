describe('', function() {
    var Mock = {};

    beforeEach(function() {
        module('studio');

        inject(function(_$controller_, _$injector_) {
            controller = _$controller_('SurveyFormDashboardController', {
                'NewSurveyFormDialogService': mockNewSurveyFormDialogService(_$injector_),
                'DashboardStateService': mockDashboardStateService(_$injector_),
                'SurveyEditorService': mockSurveyEditorService(_$injector_)
            });
        });
    });

    describe('controller.startNewSurveyForm', function() {

        it('should call NewSurveyFormDialogService.showDialog', function() {
            controller.startNewSurveyForm();

            expect(Mock.NewSurveyFormDialogService.showDialog).toHaveBeenCalled();
        });

        xit('should call SurveyEditorService.startEditor', function() {
            spyOn(Mock.SurveyEditorService, 'startEditor');

            controller.startNewSurveyForm();

            expect(Mock.SurveyEditorService.startEditor).toHaveBeenCalled();
        });

        xit('should call DashboardStateService.goToEditor', function() {
            spyOn(Mock.DashboardStateService, 'goToEditor');

            controller.startNewSurveyForm();

            expect(Mock.DashboardStateService.goToEditor).toHaveBeenCalled();
        });

    });

    function mockNewSurveyFormDialogService($injector) {
        Mock.NewSurveyFormDialogService = $injector.get('NewSurveyFormDialogService');
        spyOn(Mock.NewSurveyFormDialogService, 'showDialog').and.callThrough();

        return Mock.NewSurveyFormDialogService;
    }

    function mockDashboardStateService($injector) {
        Mock.DashboardStateService = $injector.get('DashboardStateService');
        return Mock.DashboardStateService;
    }

    function mockSurveyEditorService($injector) {
        Mock.SurveyEditorService = $injector.get('SurveyEditorService');
        return Mock.SurveyEditorService;
    }

});
