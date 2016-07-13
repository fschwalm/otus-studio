(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('DistinctValidatorWidgetFactory', DistinctValidatorWidgetFactory);

    function DistinctValidatorWidgetFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create() {
            return new DistinctValidator();
        }

        return self;
    }

    function DistinctValidator() {
        var self = this;

        /* Public Methods */
        self.getTemplate = getTemplate;
        self.answer = [];

        function getTemplate(){
          return '<otus:distinct-validator></otus:distinct-validator>';
        }
        //TODO
    }

}());