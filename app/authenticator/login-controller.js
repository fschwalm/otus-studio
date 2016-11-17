(function() {
    'use strict';

    angular
        .module('studio.authenticator')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$scope', 'DashboardStateService'];

    function LoginController($scope, DashboardStateService) {
        var self = this;
        self.authenticate = authenticate;
        self.visitAccess = visitAccess;

        function authenticate(user) {
          DashboardStateService.goToHome();
        }

        function visitAccess() {
            DashboardStateService.goToHome();
        }
    }

}());
