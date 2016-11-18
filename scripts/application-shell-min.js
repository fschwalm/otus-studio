!function(){define(["angular","./config/dependencies-configuration","./dashboard/dashboard-module","./authenticator/authenticator-module","ocLazyLoad"],function(e){return e.module("studio",["dependencies","studio.dashboard","studio.authenticator","oc.lazyLoad"])})}(),function(){define(["angular","angular-material","angular-messages","angular-animate","uiRouter","otus-domain-client"],function(e){e.module("dependencies",["ngMaterial","ngMessages","ngAnimate","ui.router","otus.domain.client"])})}(),function(){define(["./../app"],function(e){function t(e){e.formatDate=function(e){if("[object Date]"!==Object.prototype.toString.call(e))return null;var t=e.getDate(),a=e.getMonth(),o=e.getFullYear();return t+"/"+(a+1)+"/"+o},e.parseDate=function(e){if(date=new Date(e),"[object Date]"!==Object.prototype.toString.call(date))return date;if(newDateString=e.split("/"),3===newDateString.length){var t=newDateString[0],a=newDateString[1]-1,o=newDateString[2];return date=new Date(o,a,t),date}}}e.config(t),t.$inject=["$mdDateLocaleProvider"]})}(),function(){define(["./../app"],function(e){function t(e,t,a,o){function r(e,t,a,o,r){function n(){var t=a.findSurveyTemplateByOID(i);t.then(function(t){e.template=t.template,s(e.template),l.resolve(!0)})}function s(e){t.startEditorWithSurveyTemplate(e)}var i=o.sessionStorage.getItem("surveyTemplate_OID");if(e.template)s(e.template);else if(i){var l=r.defer();return n(),l.promise}}function n(e){return e.load({name:"homeDependencies",files:["app/dashboard/menu/dashboard-menu-controller.js","app/dashboard/menu/toolbar/menu-toolbar-directive.js"],serie:!0})}function s(e){return e.load({name:"surveyTemplatesDependencies",files:["node_modules/js-base64/base64.min.js","node_modules/md-color-picker/dist/mdColorPicker.min.js","node_modules/otus-model-js/dist/st-utils.min.js","node_modules/otus-model-js/dist/otus-model.min.js","app/shared/angular-indexed-db/angular-indexed-db.min.js","dist/otus-studio/scripts/editor-module-min.js","dist/otus-studio/scripts/survey-templates-module-min.js"],serie:!0})}function i(e){return e.load({name:"editorDependencies",files:["node_modules/sigma/build/sigma.min.js","app/preview/otus-survey-preview/otus-survey-preview-generator-directive.js","node_modules/otus-preview-js/dist/otus-preview-js/scripts/otusjs-player-min.js","node_modules/angular-mousewheel/mousewheel.js","node_modules/otus-validation-js/dist/otus-validation-min.js","dist/otus-studio/scripts/navigation-module-min.js"],serie:!0})}o.config({loadedModules:["studio"],debug:!0,asyncLoader:require});var l="app/dashboard/menu/dashboard-menu.html";e.state("login",{url:"/login",views:{"system-wrap":{templateUrl:"app/authenticator/login.html",controller:"LoginController as loginController"}}}).state("home",{url:"/home",views:{"system-wrap":{templateUrl:"app/dashboard/main-dashboard-content-template.html",controller:"DashboardMenuController as dashboardMenu",resolve:{lazy:n}},"dashboard-menu@home":{templateUrl:l},"system-content@home":{templateUrl:"app/dashboard/home/layout-template.html"},"section-info@home":{templateUrl:"app/dashboard/home/home-info-section.html"},"section-view@home":{templateUrl:"app/dashboard/home/home-view-section.html"},"section-commands@home":{templateUrl:"app/dashboard/home/home-commands-section.html"}}}).state("survey-templates",{url:"/survey-templates",views:{"system-wrap":{templateUrl:"app/dashboard/main-dashboard-content-template.html",controller:"DashboardMenuController as dashboardMenu",resolve:{lazy:s}},"dashboard-menu@survey-templates":{templateUrl:l},"system-content@survey-templates":{templateUrl:"app/dashboard/survey-templates/layout-template.html",controller:"SurveyFormDashboardController as surveyFormDashboard"},"section-view@survey-templates":{templateUrl:"app/dashboard/survey-templates/survey-form-view-section.html",controller:"SurveyFormDashboardController as surveyFormDashboard"},"template-menu@survey-templates":{templateUrl:"app/dashboard/survey-templates/menu/md-fab.html"}}}).state("editor",{url:"/editor",params:{template:null},views:{"system-wrap":{templateUrl:"app/dashboard/main-dashboard-content-template.html",controller:"DashboardMenuController as dashboardMenu"},"dashboard-menu@editor":{templateUrl:l},"system-content@editor":{templateUrl:"app/editor/ui/main/main-container.html",controller:"MainContainerController as mainContainer",resolve:{lazy:i,editor:r}}}}),r.$inject=["$stateParams","SurveyEditorService","CrossSessionDatabaseService","$window","$q"],t.otherwise("/login")}e.config(t).constant("APP_STATE",{HOME:"home",SURVEY_TEMPLATES:"survey-templates",EDITOR:"editor",PREVIEW:"preview",LOGIN:"login"}),t.$inject=["$stateProvider","$urlRouterProvider","$locationProvider","$ocLazyLoadProvider"]})}(),function(){define(["app/app"],function(e){function t(e,t){e.theme("layoutTheme").primaryPalette("blue",{"default":"A200","hue-1":"200","hue-2":"50","hue-3":"700"}).accentPalette("blue-grey",{"default":"900","hue-1":"50"}).warnPalette("red"),e.theme("greyTheme").primaryPalette("grey"),t.defaultIconSet("app/assets/img/icons/mdi.svg",24)}e.config(t),t.$inject=["$mdThemingProvider","$mdIconProvider"]})}();