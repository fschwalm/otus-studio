define([
  './app',
  './config/locale-configuration',
  './config/state-configuration',
  './config/theme-configuration',
], function(app) {

  app.bootstrap = function() {
    angular.bootstrap(document, ['studio']);
  };

  return app;
});
