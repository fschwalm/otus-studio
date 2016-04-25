(function() {
    'use strict';

    angular
        .module('otusjs.modelBuilder')
        .service('RemoveAnswerOptionService', RemoveAnswerOptionService);

    function RemoveAnswerOptionService() {
        var self = this;

        self.execute = execute;

        function execute(data) {
            var parentQuestion = data.context;
            parentQuestion.removeLastOption();
        }
    }

}());
