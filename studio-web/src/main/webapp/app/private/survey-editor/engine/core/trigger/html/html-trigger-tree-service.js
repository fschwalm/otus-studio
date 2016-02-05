(function() {

    angular
        .module('core')
        .service('HtmlTriggerTreeService', HtmlTriggerTreeService);

    HtmlTriggerTreeService.$inject = ['TriggerInitializerFactory'];

    function HtmlTriggerTreeService(TriggerInitializerFactory) {

        var self = this;

        /* Service inicialization */
        init();

        /* Public interface */
        self.getTree = getTree;

        function getTree() {
            return self.tree;
        }

        function init() {
            self.tree = new HtmlTriggerTree(TriggerInitializerFactory);
        }

        return self;
    }

    function HtmlTriggerTree(TriggerInitializerFactory) {

        var self = this;

        self.input = {
            text: TriggerInitializerFactory.create(),
            password: TriggerInitializerFactory.create(),
            number: TriggerInitializerFactory.create()
        };

        self.textarea = {
            textarea: TriggerInitializerFactory.create()
        };

        self.button = {
            button: TriggerInitializerFactory.create()
        };

        /* Public interface */
        self.getTriggerInitializer = getTriggerInitializer;

        function getTriggerInitializer(triggerPath) {
            var pathTokens = triggerPath.split('.');
            var reference = self;

            pathTokens.forEach(function(token) {
                reference = reference[token];
            });

            return reference;
        }

    }

}());