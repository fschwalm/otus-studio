(function() {
  'use strict';

  angular
    .module('otusjs.studio.navigationBuilder')
    .component('otusNavigationMap', {
      templateUrl: 'app/navigation-builder/map/component/map-template.html',
      controller: component
    });

  component.$inject = [
    'otusjs.studio.navigationBuilder.NavigationBuilderScopeService',
    'otusjs.studio.navigationBuilder.GraphLayerService',
    'otusjs.studio.navigationBuilder.NavigationBuilderService'
  ];

  function component(moduleScope, GraphLayerService, NavigationBuilderService) {
    var self = this;
    // var _messageLayer = null;

    /* Publi methods */
    self.$onInit = onInit;

    function onInit() {
      self.toolsCtrl = new ToolsController(NavigationBuilderService);
      moduleScope.onEvent(moduleScope.NBEVENTS.MAP_CONTAINER_READY, _renderMap);
    }

    function _renderMap() {
      var nodes = NavigationBuilderService.nodes();
      var edges = NavigationBuilderService.edges();

      GraphLayerService.initialize();
      GraphLayerService.loadData(nodes, edges);
      GraphLayerService.render();
    }
  }

  function ToolsController(NavigationBuilderService) {
    var self = this;

    _init();

    /* Public methods */
    self.click = click;
    self.addRoute = addRoute;
    self.inspect = inspect;

    function click() {
      self.isOpen = !self.isOpen;
    }

    function addRoute() {
      NavigationBuilderService.activateRouteCreatorMode();
    }

    function inspect() {
      NavigationBuilderService.activateNavigationInspectorMode();
    }

    function _init() {
      self.isOpen = false;
    }
  }
})();
