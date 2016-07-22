describe('FillingRulesEditorWidgetFactory', function() {
    var Mock = {};
    var factory;

    beforeEach(function() {
        module('studio');

        mockElement();

        inject(function(_$injector_) {
            mockWidgetScope(_$injector_);

            factory = _$injector_.get('FillingRulesEditorWidgetFactory', {
                FillingRulesOptionWidgetFactory : mockFillingRulesOptionWidgetFactory(_$injector_),
                AddFillingRulesEventFactory: mockAddFillingRulesEventFactory(_$injector_),
                RemoveFillingRulesEventFactory: mockRemoveFillingRulesEventFactory(_$injector_),
                OtusFillingRulesWidgetFactory: mockOtusFillingRulesWidgetFactory(_$injector_),
                WorkspaceService: mockWorkspaceService(_$injector_)
            });
        });

        widget = factory.create(Mock.scope, Mock.element);
    });

    describe('Interface description', function() {

        it('should create an object with getClassName method defined', function() {
            expect(widget.getClassName()).toEqual('FillingRulesEditorWidget');
            expect(widget.getClassName).toBeDefined();
        });

        it('should create an object and return element', function() {
            expect(widget.getElement()).toEqual(Mock.element);
        });

        xit('should create an object and return Item', function() {
            expect(widget.getItem()).toEqual(mockParentWidget.getItem());
        });
    });

    function mockElement() {
        Mock.element = {};
    }

    function mockWidgetScope($injector) {
        Mock.scope = {
            class: '',
            uuid: 'uuid',
            $parent: {
                widget: mockParentWidget($injector)
            },
            $on: function() {}
        };

        spyOn(Mock.scope, '$on');

        return Mock.scope;
    }

    function mockParentWidget($injector) {
        mockItem($injector);

        Mock.parentWidget = {
            getItem: function() {
                return Mock.item;
            }
        };

        return Mock.parentWidget;
    }

    function mockFillingRulesOptionWidgetFactory($injector) {
        Mock.FillingRulesOptionWidgetFactory = $injector.get('FillingRulesOptionWidgetFactory');
        return Mock.FillingRulesOptionWidgetFactory;
    }

    function mockAddFillingRulesEventFactory($injector) {
        Mock.AddFillingRulesEventFactory = $injector.get('AddFillingRulesEventFactory');
        return Mock.AddFillingRulesEventFactory;
    }

    function mockRemoveFillingRulesEventFactory($injector) {
        Mock.RemoveFillingRulesEventFactory = $injector.get('RemoveFillingRulesEventFactory');
        return Mock.RemoveFillingRulesEventFactory;
    }

    function mockOtusFillingRulesWidgetFactory($injector) {
        Mock.OtusFillingRulesWidgetFactory = $injector.get('OtusFillingRulesWidgetFactory');
        return Mock.OtusFillingRulesWidgetFactory;
    }

    function mockWorkspaceService($injector) {
        Mock.WorkspaceService = $injector.get('WorkspaceService');
        return Mock.WorkspaceService;
    }

    function mockItem($injector) {
        Mock.item = $injector.get('SurveyItemFactory').create('DecimalQuestion', 'Q1');
        return Mock.item;
    }
});