(function() {

  define([
    'angular',
    './config/dependencies-configuration',
    './dashboard/dashboard-module',
    './authenticator/authenticator-module',
    'ocLazyLoad'
  ], function(angular) {

    return angular
      .module('studio', [
        /* External modules */
        'dependencies',
        /* Application modules */
        'studio.dashboard',
        'studio.authenticator',
        // 'editor',
        // 'otusjs',
        // 'preview',
        // 'otusjs.studio.navigationBuilder',
        // 'surveyTemplates',
        /* Otus platform modules */
        // 'ui.components',
        // 'utils',
        /* otusjs.player */
        // 'otusjs.player.core',
        // 'otusjs.player.component',
        // 'otus.validation'
        'oc.lazyLoad'
      ]);
  });

}());
