describe('LogoutDialogService', function() {
    var Mock = {},
        TEMPLATE_URL = 'private/dashboard/dialog/logout/logout-dialog.html';

    beforeEach(function() {
        module('studio');

        inject(function(_$injector_) {
            service = _$injector_.get('LogoutDialogService', {
                '$mdDialog': mock$mdDialog(_$injector_)
            });
        });
    });

    describe('service dialog settings', function() {

        it('should not to be undefined', function() {
            expect(service.dialogSettings).not.toBeUndefined();
        });

        it('should have a parent reference to page body', function() {
            expect(service.dialogSettings.parent[0].tagName).toBe('BODY');
        });

        it('should have a parent reference to dialog template url', function() {
            expect(service.dialogSettings.templateUrl).toBe(TEMPLATE_URL);
        });

        it('should have a not null controller', function() {
            expect(service.dialogSettings.controller).not.toBeUndefined();
        });

        it('should have the controllerAs attribute equal to "controller"', function() {
            expect(service.dialogSettings.controllerAs).toBe('controller');
        });

        it('should have the openFrom attribute equal to "#system-toolbar"', function() {
            expect(service.dialogSettings.openFrom).toBe('#system-toolbar');
        });

        it('should have the closeTo attribute not undefined', function() {
            expect(service.dialogSettings.closeTo).not.toBeUndefined();
        });

        it('should have the closeTo.bottom attribute equal to 0', function() {
            expect(service.dialogSettings.closeTo.bottom).toBe(0);
        });

    });

    describe('service.showDialog()', function() {

        xit('should call $mdDialog.show with dialogSettings', function() {
            spyOn(Mock.$mdDialog, 'show');

            service.showDialog();

            expect(Mock.$mdDialog.show).toHaveBeenCalled();
        });

        it('should return an object', function() {
            var returnedObject = service.showDialog();

            expect(returnedObject).toBeDefined();
        });

    });

    function mock$mdDialog($injector) {
        Mock.$mdDialog = $injector.get('$mdDialog');
        return Mock.$mdDialog;
    }

});
