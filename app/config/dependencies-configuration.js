(function() {

  define([
    'angular',
    'angular-material',
    'angular-messages',
    'angular-animate',
    'uiRouter',
    'otus-domain-client',
  ], function(angular) {

    angular.module('dependencies', [
      /* Angular modules */
      'ngMaterial',
      'ngMessages',
      'ngAnimate',
      /* 3rd-party modules */
      'ui.router',
      // 'lokijs',
      // 'indexedDB',
      // 'immutable',
      // 'ui.utils.masks',
      'otus.domain.client',
      // 'otus.textEdition'
    ]);
  });

}());
