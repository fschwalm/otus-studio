require.config({
  baseUrl: '',
  paths: {
    'jquery': 'node_modules/jquery/dist/jquery.min',

    'angular': 'node_modules/angular/angular.min',
    'angular-resource': 'node_modules/angular-resource/angular-resource.min',
    'uiRouter': 'node_modules/angular-ui-router/release/angular-ui-router.min',

    /* Angular Material & Dependencies */
    'angular-aria': 'node_modules/angular-aria/angular-aria.min',
    'angular-animate': 'node_modules/angular-animate/angular-animate.min',
    'angular-messages': 'node_modules/angular-messages/angular-messages.min',
    'angular-material': 'node_modules/angular-material/angular-material.min',

    /* LokiJS */
    'loki': 'node_modules/lokijs/build/lokijs.min',
    'loki-angular': 'node_modules/lokijs/src/loki-angular',

    /* IndexedDB */
    'indexedb': 'app/shared/angular-indexed-db/angular-indexed-db',

    /* Immutable */
    'immutable': 'node_modules/immutable-js/dist/Immutable',
    'immutable-angular': 'node_modules/angular-immutable/dist/immutable.min',

    /* Angular UI Mask */
    'angular-ui-mask': 'node_modules/angular-ui-mask/dist/mask.min',

    /* Angular Input Mask */
    'angular-input-masks-dependencies': 'node_modules/angular-input-masks/releases/angular-input-masks-dependencies',
    'angular-input-masks': 'node_modules/angular-input-masks/releases/angular-input-masks',

    /* ocLazyLoad */
    'ocLazyLoad': ['node_modules/oclazyload/dist/ocLazyLoad.min',
                  //FallBack
                  'https://cdnjs.cloudflare.com/ajax/libs/oclazyload/1.0.9/ocLazyLoad.min'],

    /* Internal Dependecies */

    'login-controller': 'app/authenticator/login-controller',
    'authenticator-service': 'app/authenticator/api/authentication-service',
    'dashboard-state-service': 'app/dashboard/api/dashboard-state-service',

    'otus-domain-client': 'node_modules/otus-domain-client/dist/otus-domain-client-min'
  },
  shim: {
    'angular': {
      deps: ['jquery'],
      exports: 'angular'
    },
    'uiRouter': {
      deps: ['angular']
    },
    'angular-resource': {
      deps: ['angular']
    },
    'angular-aria': {
      deps: ['angular']
    },
    'angular-animate': {
      deps: ['angular']
    },
    'angular-messages': {
      deps: ['angular']
    },
    'angular-material': {
      deps: ['angular-aria', 'angular-animate', 'angular-messages']
    },
    'loki-angular': {
      deps: ['angular', 'loki']
    },
    'ocLazyLoad': {
      deps: ['angular']
    },
    'indexedb': {
      deps: ['angular']
    },
    'angular-ui-mask': {
      deps: ['angular']
    },
    'immutable-angular': {
      deps: ['angular', 'immutable']
    },
    'angular-input-masks': {
      deps: ['angular', 'angular-input-masks-dependencies']
    },

    /* Internal Dependencies */
    'otus-domain-client': {
      deps: ['angular', 'angular-resource']
    },
    'dashboard-state-service': {
      deps: ['angular']
    },
    'login-controller': {
      deps: ['angular', 'dashboard-state-service']
    }
  }
});

require(['app/application', 'login-controller'], function(app) {
  app.bootstrap();
});
