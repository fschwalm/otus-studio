!function(){"use strict";function o(o,t){function e(o){t.goToHome()}function i(){t.goToHome()}var n=this;n.authenticate=e,n.visitAccess=i}angular.module("studio.authenticator").controller("LoginController",o),o.$inject=["$scope","DashboardStateService"]}(),function(){"use strict";function o(o,t,e,i,n){function c(){o.showDialog().onConfirm(function(){a(e)})}function a(o){var t=o.getAuthenticatorResource();o.isLogged()?r(t):u()}function r(o){o.invalidate(function(o){t.logout(),n.sessionStorage.clear()})}function u(){n.sessionStorage.clear(),t.logout()}function s(o){e.setUrl(o.domain);var n=e.getAuthenticatorResource();n.authenticate(o,function(o){e.setSecurityToken(o.data),o.hasErrors?i.show(i.simple().textContent(g)):t.goToHome()})}var g="Login Inválido! Verifique os dados informados.",l=this;l.logout=c,l.login=s}angular.module("studio.authenticator").service("AuthenticationService",o),o.$inject=["LogoutDialogService","DashboardStateService","RestResourceService","$mdToast","$window"]}();