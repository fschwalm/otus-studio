describe('DashboardMenuController', function() {
    var Mock = {};

    beforeEach(function() {
        module('studio');

        inject(function(_$controller_, _$injector_) {
            controller = _$controller_('DashboardMenuController', {
                'LogoutDialogService': mockLogoutDialogService(_$injector_),
                'DashboardStateService': mockDashboardStateService(_$injector_),
                '$mdSidenav': mock$mdSidenav(_$injector_)
            });
        });
    });

    describe('navigation methods', function() {

        xit('getSelectedSystemArea() should call DashboardStateService.currentState', function() {
            controller.getSelectedSystemArea();

            expect(Mock.DashboardStateService.currentState).toHaveBeenCalled();
        });

        xit('open() should call $mdSidenav("left").toggle', function() {
            var sidenav = Mock.$mdSidenav('left');
            spyOn(sidenav, 'toggle');

            controller.open();

            expect(sidenav.toggle).toHaveBeenCalled();
        });

        xit('close() should call $mdSidenav("left").close', function() {
            var sidenav = Mock.$mdSidenav('left');
            spyOn(sidenav, 'close');

            controller.close();

            expect(sidenav.close).toHaveBeenCalled();
        });

        it('openHome() should call DashboardStateService.goToHome', function() {
            spyOn(Mock.DashboardStateService, 'goToHome');

            controller.openHome();

            expect(Mock.DashboardStateService.goToHome).toHaveBeenCalled();
        });

        it('openSurveyForms() should call DashboardStateService.goToHome', function() {
            spyOn(Mock.DashboardStateService, 'goToSurveyForms');

            controller.openSurveyForms();

            expect(Mock.DashboardStateService.goToSurveyForms).toHaveBeenCalled();
        });

        it('openCreateRepository() should call DashboardStateService.openCreateRepository', function() {
            spyOn(Mock.DashboardStateService, 'goToCreateRepository');

            controller.openCreateRepository();

            expect(Mock.DashboardStateService.goToCreateRepository).toHaveBeenCalled();
        });

        it('openConnectRepository() should call DashboardStateService.openCreateRepository', function() {
            spyOn(Mock.DashboardStateService, 'goToConnectRepository');

            controller.openConnectRepository();

            expect(Mock.DashboardStateService.goToConnectRepository).toHaveBeenCalled();
        });

        it('openUserManagement() should call DashboardStateService.goToUserManagement', function() {
            spyOn(Mock.DashboardStateService, 'goToUserManagement');

            controller.openUserManagement();

            expect(Mock.DashboardStateService.goToUserManagement).toHaveBeenCalled();
        });

        it('logout() should call LogoutDialogService.showDialog', function() {
            spyOn(Mock.LogoutDialogService, 'showDialog').and.callThrough();

            controller.logout();

            expect(Mock.LogoutDialogService.showDialog).toHaveBeenCalled();
        });

    });

    function mockLogoutDialogService($injector) {
        Mock.LogoutDialogService = $injector.get('LogoutDialogService');
        return Mock.LogoutDialogService;
    }

    function mockDashboardStateService($injector) {
        Mock.DashboardStateService = $injector.get('DashboardStateService');
                
        return Mock.DashboardStateService;
    }

    function mock$mdSidenav($injector) {
        Mock.$mdSidenav = $injector.get('$mdSidenav');
        return Mock.$mdSidenav;
    }

});
