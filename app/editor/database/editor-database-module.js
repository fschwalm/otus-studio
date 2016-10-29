(function() {
  'use strict';

  angular
    .module('editor.database', [])
    .config(config);

  config.$inject = ['$indexedDBProvider'];

  function config($indexedDBProvider) {
    $indexedDBProvider
      .connection('otus-studio')
      .upgradeDatabase(1, function(event, db, tx) {
        var store = db.createObjectStore('survey_template', {
          keyPath: 'template_oid'
        });
        store.createIndex('contributor_idx', 'contributor', {
          unique: false
        });
      });
  }

}());