(function() {


  angular.module('studio').config(stateConfiguration)
    .constant('APP_STATE', {
      'HOME': 'home',
      'SURVEY_TEMPLATES': 'survey-templates',
      'EDITOR': 'editor',
      'PREVIEW': 'preview',
      'LOGIN': 'login'
    });

  stateConfiguration.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider', '$ocLazyLoadProvider'];

  function stateConfiguration($stateProvider, $urlRouterProvider, $locationProvider, $ocLazyLoadProvider) {

    $ocLazyLoadProvider.config({
      loadedModules: ['studio'],
      debug: true,
    });

    var dashboardMenu = 'app/dashboard/menu/dashboard-menu.html';

    $stateProvider
      .state('login', {
        url: '/login',
        views: {
          'system-wrap': {
            templateUrl: 'app/authenticator/login.html',
            controller: 'LoginController as loginController'
          }
        }
      })
      .state('home', {
        url: '/home',
        views: {
          'system-wrap': {
            templateUrl: 'app/dashboard/main-dashboard-content-template.html',
            controller: 'DashboardMenuController as dashboardMenu',
            resolve: {
              lazy: lazyLoadHome
            }
          },
          'dashboard-menu@home': {
            templateUrl: dashboardMenu,
          },
          'system-content@home': {
            templateUrl: 'app/dashboard/home/layout-template.html'
          },
          'section-info@home': {
            templateUrl: 'app/dashboard/home/home-info-section.html'
          },
          'section-view@home': {
            templateUrl: 'app/dashboard/home/home-view-section.html'
          },
          'section-commands@home': {
            templateUrl: 'app/dashboard/home/home-commands-section.html'
          }
        }
      })
      .state('survey-templates', {
        url: '/survey-templates',
        views: {
          'system-wrap': {
            templateUrl: 'app/dashboard/main-dashboard-content-template.html',
            controller: 'DashboardMenuController as dashboardMenu',
            resolve: {
              lazy: lazyLoadSurveyTemplates
            }
          },
          'dashboard-menu@survey-templates': {
            templateUrl: dashboardMenu
          },
          'system-content@survey-templates': {
            templateUrl: 'app/dashboard/survey-templates/layout-template.html',
            controller: 'SurveyFormDashboardController as surveyFormDashboard'
          },
          'section-view@survey-templates': {
            templateUrl: 'app/dashboard/survey-templates/survey-form-view-section.html',
            controller: 'SurveyFormDashboardController as surveyFormDashboard'
          },
          'template-menu@survey-templates': {
            templateUrl: 'app/dashboard/survey-templates/menu/md-fab.html'
          }
        }
      })
      .state('editor', {
        url: '/editor',
        params: {
          template: null
        },
        views: {
          'system-wrap': {
            templateUrl: 'app/dashboard/main-dashboard-content-template.html',
            controller: 'DashboardMenuController as dashboardMenu'
          },
          'dashboard-menu@editor': {
            templateUrl: dashboardMenu
          },
          'system-content@editor': {
            templateUrl: 'app/editor/ui/main/main-container.html',
            controller: 'MainContainerController as mainContainer',
            resolve: {
              lazy: lazyLoadEditor,
              editor: load
            }
          }
        }
      });

    load.$inject = ['$stateParams', 'SurveyEditorService', 'CrossSessionDatabaseService', '$window', '$q'];

    function load($stateParams, SurveyEditorService, CrossSessionDatabaseService, $window, $q) {
      var surveyTemplate_OID = $window.sessionStorage.getItem('surveyTemplate_OID');

      if ($stateParams.template) {
        _startEditor($stateParams.template);
      } else if (surveyTemplate_OID) {
        var deferred = $q.defer();
        _loadFromIndexedDB();
        return deferred.promise;
      }

      function _loadFromIndexedDB() {
        var promise = CrossSessionDatabaseService.findSurveyTemplateByOID(surveyTemplate_OID);
        promise.then(function(result) {
          $stateParams.template = result.template;
          _startEditor($stateParams.template);
          deferred.resolve(true);
        });
      }

      function _startEditor(surveyTemplate) {
        SurveyEditorService.startEditorWithSurveyTemplate(surveyTemplate);
      }
    }

    lazyLoadHome.$inject = ['$ocLazyLoad'];

    function lazyLoadHome($ocLazyLoad) {
      return $ocLazyLoad.load({
        name: 'homeDependencies',
        files: [
          'app/dashboard/menu/dashboard-menu-controller.js',
          'app/dashboard/menu/toolbar/menu-toolbar-directive.js'
        ],
        serie: true
      });
    }

    lazyLoadSurveyTemplates.$inject = ['$ocLazyLoad'];
    function lazyLoadSurveyTemplates($ocLazyLoad) {
      return $ocLazyLoad.load({
        name: 'surveyTemplatesDependencies',
        files: [
          'node_modules/js-base64/base64.min.js',
          'node_modules/md-color-picker/dist/mdColorPicker.min.js',
          'node_modules/otus-model-js/dist/st-utils.min.js',
          'node_modules/otus-model-js/dist/otus-model.min.js',
          'app/shared/angular-indexed-db/angular-indexed-db.min.js',
          'scripts/editor-module-min.js',
          'scripts/survey-templates-module-min.js'
        ],
        serie: true
      });
    }

    lazyLoadEditor.$inject = ['$ocLazyLoad'];
    function lazyLoadEditor($ocLazyLoad) {
      return $ocLazyLoad.load({
        name: 'editorDependencies',
        files: [
          'node_modules/sigma/build/sigma.min.js',

          'app/shared/ui-components/ui-components-module.js',
          'app/shared/ui-components/accordion/accordion-directive.js',
          'app/shared/ui-components/accordion/accordion-widget-factory.js',


          'app/preview/otus-survey-preview/otus-survey-preview-generator-directive.js',
          'node_modules/otus-preview-js/dist/otus-preview-js/scripts/otusjs-player-min.js',
          'node_modules/angular-mousewheel/mousewheel.js',
          'node_modules/otus-validation-js/dist/otus-validation-min.js',
          'scripts/navigation-module-min.js'
        ],
        serie: true
      });
    }

    /* Default state (route)
     * $locationProvider.html5Mode(true);
     */
    $urlRouterProvider.otherwise('/login');
  }

}());
