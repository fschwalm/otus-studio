!function(){"use strict";angular.module("otusjs.studio.navigationBuilder",["otusjs.studio.navigationBuilder.routeBuilder","otusjs.studio.navigationBuilder.navigationInspector","otusjs.studio.navigationBuilder.messenger","ngMaterial"]).constant("NBEVENTS",{NAVIGATION_BUILDER_ON:"nbevents.navigation.builder.on",NAVIGATION_UPDATED:"nbevents.navigation.updated",MAP_CONTAINER_READY:"nbevents.map.container.ready",RELOAD_MAP_DATA:"nbevents.map.data.reload",ROUTE_MODE_ON:"nbevents.route.mode.on",ROUTE_MODE_OFF:"nbevents.route.mode.off",ROUTE_DELETED:"nbevents.route.deleted",ROUTE_BUILD_STARTED:"nbevents.route.started",ROUTE_BUILD_SAVED:"nbevents.route.build.saved",ROUTE_BUILD_CANCELED:"nbevents.route.build.canceled",ORIGIN_NODE_SELECTED:"nbevents.route.node.origin.selected",ORIGIN_NODE_UNSELECTED:"nbevents.route.node.origin.unselected",DESTINATION_NODE_SELECTED:"nbevents.route.node.destination.selected",DESTINATION_NODE_UNSELECTED:"nbevents.route.node.destination.unselected",SHOW_MESSENGER:"nbevents.messenger.show",HIDE_MESSENGER:"nbevents.messenger.hide",INSPECTOR_MODE_ON:"nbevents.inspector.mode.on",NAVIGATION_SELECTED:"nbevents.inspector.navigation.selected",ORPHANS_ENCOUNTERED:"nbevents.warning.orphans.encountered"}).constant("NBMESSAGES",{ROUTE_BUILDER:{SELECT_ORIGIN:{header:"Origem da Rota",content:"Escolha o item que determinará o início da rota."},SELECT_DESTINATION:{header:"Destino da Rota",content:"Escolha o item que determinará o destino da rota."}},NAVIGATION_INSPECTOR:{SELECT_NAVIGATION:{header:"Inpecionar navegação",content:"Escolha o item que você deseja inspecionar."}}}).run(["otusjs.studio.navigationBuilder.NavigationBuilderScopeService","otusjs.studio.navigationBuilder.NavigationBuilderService","$rootScope",function(e,t,i){e.initialize(i.$new()),e.onEvent(e.NBEVENTS.NAVIGATION_BUILDER_ON,function(i,n){t.setSurvey(n),e.emit(e.NBEVENTS.MAP_CONTAINER_READY)}),e.onEvent(e.NBEVENTS.RELOAD_MAP_DATA,function(i){t.reloadMapData(),e.emit(e.NBEVENTS.MAP_CONTAINER_READY)})}])}(),function(){"use strict";function e(e,t,i,n){function o(e){return E.nodes(e)}function a(){return E.edges()}function r(e){p=e,d(e.NavigationManager.getNavigationList())}function u(){l(),h=i,h.activate(p)}function s(){l(),h=n,h.activate(p)}function l(){if(h)return h.deactivate()}function c(){d(p.NavigationManager.getNavigationList())}function d(i){E=t.create(),v(i),g(i),e.store("map",E)}function v(e){e.forEach(function(e,t){var i={};i.id=e.origin,i.label=e.origin,i.index=e.index,i.isOrphan=e.isOrphan(),i.isMyRootOrphan=e.hasOrphanRoot(),E.createNode(i)})}function g(e){e.forEach(function(e){e.routes.forEach(function(t){var i={};i.source=t.origin,i.target=t.destination,i.isFromOrphan=e.isOrphan(),t.isDefault?E.createEdgeForDefaultPath(i):E.createEdgeForAlterantivePath(i)})})}var f=this,p=null,E={},h=null;f.nodes=o,f.edges=a,f.setSurvey=r,f.activateRouteCreatorMode=u,f.activateNavigationInspectorMode=s,f.deactiveMode=l,f.reloadMapData=c}angular.module("otusjs.studio.navigationBuilder").service("otusjs.studio.navigationBuilder.NavigationBuilderService",e),e.$inject=["otusjs.studio.navigationBuilder.NavigationBuilderScopeService","otusjs.studio.navigationBuilder.MapFactory","otusjs.studio.navigationBuilder.routeBuilder.RouteBuilderService","otusjs.studio.navigationBuilder.navigationInspector.NavigationInspectorService"]}(),function(){"use strict";function e(e,t){function i(i){i.events=e,i.messages=t,d=i}function n(e,t){v[e]=t}function o(e){return v[e]}function a(e,t){return d.$on(e,t)}function r(e,t){d.$broadcast(e,t)}function u(e,t){d.$emit(e,t)}function s(){d.$digest()}function l(){d.$apply()}var c=this,d=null,v={};c.NBEVENTS=e,c.NBMESSAGES=t,c.initialize=i,c.store=n,c.getData=o,c.onEvent=a,c.broadcast=r,c.emit=u,c.digest=s,c.apply=l}angular.module("otusjs.studio.navigationBuilder").service("otusjs.studio.navigationBuilder.NavigationBuilderScopeService",e),e.$inject=["NBEVENTS","NBMESSAGES"]}(),function(){"use strict";angular.module("otusjs.studio.navigationBuilder.navigationInspector",[])}(),function(){"use strict";function e(e,t,i,n){function o(o){a(),t.activate(o),i.activate(),n.activate(),e.emit(e.NBEVENTS.INSPECTOR_MODE_ON)}function a(){e.emit(e.NBEVENTS.INSPECTOR_MODE_OFF),t.deactivate(),n.deactivate(),i.deactivate()}var r=this;r.activate=o,r.deactivate=a}angular.module("otusjs.studio.navigationBuilder.navigationInspector").service("otusjs.studio.navigationBuilder.navigationInspector.NavigationInspectorService",e),e.$inject=["otusjs.studio.navigationBuilder.NavigationBuilderScopeService","otusjs.studio.navigationBuilder.navigationInspector.DataService","otusjs.studio.navigationBuilder.navigationInspector.UiEventsService","otusjs.studio.navigationBuilder.navigationInspector.ModuleEventService"]}(),function(){"use strict";function e(e){function t(e){r=e}function i(){r=null}function n(t){u?(e.emit(e.NBEVENTS.NAVIGATION_UNSELECTED,u),t&&t.id!==u.id?(u=t,e.emit(e.NBEVENTS.NAVIGATION_SELECTED,u)):u=null):(u=t,e.emit(e.NBEVENTS.NAVIGATION_SELECTED,u))}function o(){return u}var a=this,r=null,u=null;a.activate=t,a.deactivate=i,a.selectNode=n,a.selectedNode=o}angular.module("otusjs.studio.navigationBuilder.navigationInspector").service("otusjs.studio.navigationBuilder.navigationInspector.DataService",e),e.$inject=["otusjs.studio.navigationBuilder.NavigationBuilderScopeService"]}(),function(){"use strict";function e(e,t,i){function n(){a(e.NBEVENTS.INSPECTOR_MODE_ON,u),a(e.NBEVENTS.INSPECTOR_MODE_OFF,s),a(e.NBEVENTS.NAVIGATION_SELECTED,l),a(e.NBEVENTS.NAVIGATION_UNSELECTED,c)}function o(){r()}function a(t,i){var n=e.onEvent(t,i);v.push(n)}function r(){v.forEach(function(e){e()})}function u(t,n){i.showMessenger(e.NBMESSAGES.NAVIGATION_INSPECTOR.SELECT_NAVIGATION)}function s(n,o){t.clearVisualChanges(),t.applyVisualChanges(),i.clearMessenger(),e.emit(e.NBEVENTS.RELOAD_MAP_DATA)}function l(e,i){t.lockUnrelated(i),t.showInputs(i),t.showOutputs(i),t.setNodeAsInspected(i),t.applyVisualChanges()}function c(i,n){t.clearVisualChanges(),t.applyVisualChanges(),e.emit(e.NBEVENTS.RELOAD_MAP_DATA)}var d=this,v=[];d.activate=n,d.deactivate=o}angular.module("otusjs.studio.navigationBuilder.navigationInspector").service("otusjs.studio.navigationBuilder.navigationInspector.ModuleEventService",e),e.$inject=["otusjs.studio.navigationBuilder.NavigationBuilderScopeService","otusjs.studio.navigationBuilder.GraphLayerService","otusjs.studio.navigationBuilder.messenger.InstructorService"]}(),function(){"use strict";function e(e,t,i){function n(){i.eventService.onClickNode(a)}function o(){i.eventService.clearAllEventListeners()}function a(e){t.selectNode(e.data.node)}var r=this;r.activate=n,r.deactivate=o}angular.module("otusjs.studio.navigationBuilder.navigationInspector").service("otusjs.studio.navigationBuilder.navigationInspector.UiEventsService",e),e.$inject=["otusjs.studio.navigationBuilder.NavigationBuilderScopeService","otusjs.studio.navigationBuilder.navigationInspector.DataService","otusjs.studio.navigationBuilder.GraphLayerService"]}(),function(){"use strict";function e(e,i,n){function o(){r.toolsCtrl=new t(n),e.onEvent(e.NBEVENTS.MAP_CONTAINER_READY,a)}function a(){var e=n.nodes(),t=n.edges();i.initialize(),i.loadData(e,t),i.render()}var r=this;r.$onInit=o}function t(e){function t(){a.isOpen=!a.isOpen}function i(){e.activateRouteCreatorMode()}function n(){e.activateNavigationInspectorMode()}function o(){a.isOpen=!1}var a=this;o(),a.click=t,a.addRoute=i,a.inspect=n}angular.module("otusjs.studio.navigationBuilder").component("otusNavigationMap",{templateUrl:"app/navigation-builder/map/component/map-template.html",controller:e}),e.$inject=["otusjs.studio.navigationBuilder.NavigationBuilderScopeService","otusjs.studio.navigationBuilder.GraphLayerService","otusjs.studio.navigationBuilder.NavigationBuilderService"]}(),function(){"use strict";function e(){function e(e){v=e,r()}function t(){g=[],f=[],p=[],E=[]}function i(e){g=[],g.push(e)}function n(e){f=[],f.push(e)}function o(e){p=[],p.push(e)}function a(e){E=[],E.push(e)}function r(){v.bind(s,function(e){var t=e.data.node;t.isDisabled||g.forEach(function(t){t(e)})}),v.bind(l,function(e){f.forEach(function(t){t(e)})}),v.bind(c,function(e){p.forEach(function(t){t(e)})}),v.bind(d,function(e){E.forEach(function(t){t(e)})})}var u=this,s="clickNode",l="overNode",c="clickEdge",d="overEdge",v=null,g=[],f=[],p=[],E=[];u.setMapView=e,u.onClickNode=i,u.onOverNode=n,u.onClickEdge=o,u.onOverEdge=a,u.clearAllEventListeners=t}angular.module("otusjs.studio.navigationBuilder").service("otusjs.studio.navigationBuilder.GraphLayerEventService",e)}(),function(){"use strict";function e(){function e(e){return new t(e)}var i=this;return i.create=e,i}function t(e){function t(){return T}function i(e,t){T.graph.clear(),T.graph.read({nodes:e,edges:t})}function n(){T.refresh()}function o(e,t){T.graph.updateNodeStyleBefore(e,t)}function a(e,t){T.graph.updateNodeStyle(e,t)}function r(e,t){T.graph.updateNodesStyle(e,t)}function u(e){T.graph.updateAllNodesStyle(e)}function s(e){T.graph.updateAllEdgesStyle(e)}function l(e,t){T.graph.updateOutputs(e,t)}function c(e,t){T.graph.updateInputs(e,t)}function d(){sigma.classes.graph.hasMethod("updateNodeStyleBefore")||(sigma.classes.graph.addMethod("updateNodeStyleBefore",v),sigma.classes.graph.addMethod("updateNodeStyle",g),sigma.classes.graph.addMethod("updateNodesStyle",f),sigma.classes.graph.addMethod("updateAllNodesStyle",p),sigma.classes.graph.addMethod("updateAllEdgesStyle",E),sigma.classes.graph.addMethod("updateOutputs",N),sigma.classes.graph.addMethod("updateInputs",h),sigma.classes.graph.attach("addNode","onAddNode",B),sigma.classes.graph.attach("addEdge","onAddEdge",S)),$("#map-view").empty(),T=new sigma({renderer:{container:e,type:"canvas"}})}function v(e,t){this.nodesArray.every(function(i){if(i.id!==t.id)return i.color=e.color,i.isDisabled=e.isDisabled,!0})}function g(e,t){this.nodesArray.some(function(i){if(i.id===t.id)return i.color=e.color,i.isDisabled=e.isDisabled,!0})}function f(e,t){this.nodesArray.some(function(i){if(t.some(function(t,n,o){if(i.id===t)return i.color=e.color,i.isDisabled=e.isDisabled,o.splice(n,1),!0}),!t.length)return!0})}function p(e){this.nodesArray.forEach(function(t){t.color=e.color,t.isDisabled=e.isDisabled})}function E(e){this.edgesArray.forEach(function(t){t.color=e.color})}function h(e,t){var i=this.inNeighborsIndex[t.id],n=null;for(n in i)this.nodesArray.some(function(t){if(t.id===n)return t.color=e.color,!0}),this.edgesArray.some(function(i){if(i.source===n&&i.target===t.id)return i.color=e.color,!1})}function N(e,t){var i=this.outNeighborsIndex[t.id],n=null;for(n in i)this.nodesArray.some(function(t){if(t.id===n)return t.color=e.color,!0});this.edgesArray.forEach(function(i){i.source===t.id&&(i.color=e.color)})}function B(e){e.isOrphan&&a({color:"#571616"},e)}function S(e){var t=this.nodesArray.filter(function(t){return t.id===e.source})[0],i=this.nodesArray.filter(function(t){return t.id===e.target})[0];t.connectOut(i,e.isDefault)}var m=this,T={};d(),m.mapView=t,m.loadData=i,m.render=n,m.updateNodeStyleBefore=o,m.updateNodeStyle=a,m.updateNodesStyle=r,m.updateAllNodesStyle=u,m.updateAllEdgesStyle=s,m.updateOutputs=l,m.updateInputs=c}angular.module("otusjs.studio.navigationBuilder").factory("otusjs.studio.navigationBuilder.GraphLayerFactory",e)}(),function(){"use strict";function e(e,t){function i(){E=e.create("map-view"),p.loadData=E.loadData,p.render=E.render,t.setMapView(E.mapView())}function n(e){var t={color:"#CCC",isDisabled:!0};E.updateNodeStyleBefore(t,e)}function o(e){var t={color:"#313131",isDisabled:!1};E.updateNodeStyleBefore(t,e)}function a(e){var t={color:"#3D855B"};E.updateNodeStyle(t,e)}function r(e){var t={color:"#FFD22E"};E.updateNodeStyle(t,e)}function u(e){var t={color:"#1B5BD1"};E.updateNodeStyle(t,e)}function s(e){var t={color:"#571616"};E.updateNodesStyle(t,e)}function l(e){var t={color:"#313131",isDisabled:!1};E.updateNodeStyle(t,e)}function c(){var e={color:"#313131",isDisabled:!1};E.updateAllNodesStyle(e),E.updateAllEdgesStyle(e)}function d(){E.render()}function v(e){var t={color:"#FF3232"};E.updateOutputs(t,e)}function g(e){var t={color:"#249C26"};E.updateInputs(t,e)}function f(e){var t={color:"#CCC"};E.updateAllNodesStyle(t),E.updateAllEdgesStyle(t)}var p=this,E={};p.eventService=t,p.initialize=i,p.lockPreviousNodeOf=n,p.releasePreviousNodesOf=o,p.setNodeAsTrailhead=a,p.setNodeAsTrailend=u,p.setNodeAsInspected=r,p.setNodesAsOrphans=s,p.clearNode=l,p.applyVisualChanges=d,p.clearVisualChanges=c,p.showOutputs=v,p.showInputs=g,p.lockUnrelated=f}angular.module("otusjs.studio.navigationBuilder").service("otusjs.studio.navigationBuilder.GraphLayerService",e),e.$inject=["otusjs.studio.navigationBuilder.GraphLayerFactory","otusjs.studio.navigationBuilder.GraphLayerEventService"]}(),function(){"use strict";function e(){function e(e){return new t(e)}function i(e){return e.isDefault=!0,new t(e)}function n(e){return e.isDefault=!1,e.isFromOrphan||(e.type="curvedArrow"),new t(e)}var o=this;return o.create=e,o.createForDefaultPath=i,o.createForAlterantivePath=n,o}function t(e){var t=this;t.id=e.source+"_"+e.target,t.source=e.source,t.target=e.target,t.color=e.color,t.type=e.type,t.isDefault=e.isDefault}angular.module("otusjs.studio.navigationBuilder").factory("otusjs.studio.navigationBuilder.EdgeFactory",e)}(),function(){"use strict";function e(e,n){function o(e){return new t(e)}var a=this;return i.NodeFactory=e,i.EdgeFactory=n,a.create=o,a}function t(e){function t(e){if(e){var t=[];return p.some(function(i){e.some(function(n,o){if(i.id===n)return t.push(i),e.splice(o,1),!0})}),t}return p}function n(){return E}function o(e){g(e.id)||(e.x=p.length,p.push(e))}function a(e){g(e.source)&&g(e.target)&&E.push(e)}function r(e){var t=i.NodeFactory.create(e);return o(t),t}function u(e){var t=i.NodeFactory.createForDefaultPath(e);return o(t),t}function s(e){var t=i.NodeFactory.createForAlterantivePath(e);return o(t),t}function l(e,t){return i.EdgeFactory.create(e,t)}function c(e){var t=i.EdgeFactory.createForDefaultPath(e);return a(t),t}function d(e){var t=i.EdgeFactory.createForAlterantivePath(e);return a(t),t}function v(e){var t=p.filter(function(t){return t.id===e.id});return t.length?t[0].navigation:void 0}function g(e){var t=p.filter(function(t){return t.id===e});return!!t.length}var f=this,p=[],E=[];f.addNode=o,f.addEdge=a,f.nodes=t,f.edges=n,f.createNode=r,f.createNodeForDefaultPath=u,f.createNodeForAlterantivePath=s,f.createEdge=l,f.createEdgeForDefaultPath=c,f.createEdgeForAlterantivePath=d,f.getNavigation=v}angular.module("otusjs.studio.navigationBuilder").factory("otusjs.studio.navigationBuilder.MapFactory",e),e.$inject=["otusjs.studio.navigationBuilder.NodeFactory","otusjs.studio.navigationBuilder.EdgeFactory"];var i={NodeFactory:{},EdgeFactory:{}}}(),function(){"use strict";function e(){function e(e){return e.color=e.isOrphan?"#571616":"#616161",new t(e)}function i(e){return e.y=0,e.color=e.isOrphan?"#571616":"#448AFF",e.isDefault=!0,new t(e)}function n(e){return e.color=e.isOrphan?"#571616":"#616161",e.isDefault=!1,new t(e)}var o=this;return o.create=e,o.createForDefaultPath=i,o.createForAlterantivePath=n,o}function t(e){function t(e,t){this.factor=e.outNeighbors.length,this.inNeighbors.push(e),this.isDefault||(this.isDefault=e.isDefault&&t),this.updatePosition(e)}function i(e,t){this.outNeighbors.push(e),t&&(this.defaultNextNode=e),e.connectIn(this,t)}function n(t){var i,n=0;if(this.inNeighbors.forEach(function(e){e.isMyDefaultNext(this)&&(i||(i=e.y),++n)},this),e.isMyRootOrphan)this.y=1;else if(this.isDefault)this.y=0;else if(n>0)this.y=i;else{var o=this.inNeighbors.length;this.y=o/(o%2?2:1)*-1}}function o(e){return this.defaultNextNode&&this.defaultNextNode.id===e.id}function a(){return e.isOrphan||e.isMyRootOrphan?1:e.y||0}function r(){return 0===e.index}this.defaultNextNode=null,this.inNeighbors=[],this.outNeighbors=[],this.index=e.index,this.id=e.id,this.label=e.label,this.x=e.x||0,this.y=a(),this.size=e.size||"10",this.color=e.color||"#000",this.isDefault=r(),this.isOrphan=e.isOrphan||!1,this.connectIn=t,this.connectOut=i,this.updatePosition=n,this.isMyDefaultNext=o}angular.module("otusjs.studio.navigationBuilder").factory("otusjs.studio.navigationBuilder.NodeFactory",e)}(),function(){"use strict";angular.module("otusjs.studio.navigationBuilder.messenger",[])}(),function(){"use strict";function e(e){function i(){a.templateUrl="app/navigation-builder/messenger/dialog/text/text-dialog-template.html",a.controller=t,a.controllerAs="ctrl",a.escapeToClose=!1,a.fullscreen=!1,a.hasBackdrop=!1}function n(t){a.locals={message:t},e.show(a)}var o=this,a={};i(),o.showDialog=n}function t(e,t){function i(t){e.hide(t)}function n(t){e.hide(t)}var o=this;o.message=t,o.cancel=i,o.confirm=n}angular.module("otusjs.studio.navigationBuilder").service("otusjs.studio.navigationBuilder.TextDialogService",e),e.$inject=["$mdDialog"],t.$inject=["$mdDialog"]}(),function(){"use strict";function e(e){function i(){var i=e.newPanelPosition().absolute().center();a.attachTo=angular.element(document.body),a.controller=t,a.controllerAs="ctrl",a.position=i,a.templateUrl="app/navigation-builder/messenger/dialog/text/text-panel-template.html"}function n(t){a.locals={message:t},r=e.create(a),r.open()["finally"](function(){r=void 0})}var o=this,a={},r=null;i(),o.showDialog=n}function t(e){function t(e){$mdDialog.hide(e)}function i(e){$mdDialog.hide(e)}var n=this;n.message=e,n.cancel=t,n.confirm=i}angular.module("otusjs.studio.navigationBuilder").service("otusjs.studio.navigationBuilder.TextPanelService",e),e.$inject=["$mdPanel"]}(),function(){"use strict";function e(e,t){function i(){t.onEvent(t.NBEVENTS.SHOW_MESSENGER,function(e,t){n.isVisible=!0,n.message=t}),t.onEvent(t.NBEVENTS.HIDE_MESSENGER,function(e){n.isVisible=!1})}var n=this;n.message={},n.isVisible=!1,n.$onInit=i}angular.module("otusjs.studio.navigationBuilder.messenger").component("otusMessengerInstructor",{templateUrl:"app/navigation-builder/messenger/instructor/instructor-template.html",controller:e}),e.$inject=["$scope","otusjs.studio.navigationBuilder.NavigationBuilderScopeService"]}(),function(){"use strict";function e(e){function t(t){e.broadcast(e.NBEVENTS.SHOW_MESSENGER,t)}function i(){e.broadcast(e.NBEVENTS.HIDE_MESSENGER)}var n=this;n.showMessenger=t,n.clearMessenger=i}angular.module("otusjs.studio.navigationBuilder.messenger").service("otusjs.studio.navigationBuilder.messenger.InstructorService",e),e.$inject=["otusjs.studio.navigationBuilder.NavigationBuilderScopeService"]}(),function(){"use strict";angular.module("otusjs.studio.navigationBuilder.routeBuilder",[])}(),function(){"use strict";function e(e,t,i,n){function o(o){t.activate(o),n.activate(),i.activate(),e.emit(e.NBEVENTS.ROUTE_MODE_ON)}function a(){e.emit(e.NBEVENTS.ROUTE_MODE_OFF),t.deactivate(),i.deactivate(),n.deactivate()}function r(){t.createCondition()}function u(){return T}function s(e){t.deleteCondition(e)}function l(){t.apply(),e.emit(e.NBEVENTS.ROUTE_BUILD_SAVED)}function c(){t.deleteRoute(),e.emit(e.NBEVENTS.ROUTE_DELETED)}function d(e){t.selectCondition(e)}function v(){return t.selectedCondition()}function g(){return t.selectedRoute()}function f(e,i){t.routeExists(e,i)?(t.useCurrentRouteData(),T=!1):(t.initializeRouteData(),t.createCondition(),T=!0),t.selectCondition(0)}function p(){e.emit(e.NBEVENTS.ROUTE_BUILD_CANCELED)}function E(e,i,n,o){t.createRule(e,i,n,o)}function h(e){t.deleteRule(e)}function N(e){return t.listAvailableAnswer(e)}function B(e){return t.listAvailableOperator(e)}function S(){return t.listAvailableWhen()}function m(e,i,n,o,a){t.updateRule(e,i,n,o,a)}var T,D=this;D.activate=o,D.deactivate=a,D.createCondition=r,D.deleteCondition=s,D.isNewRoute=u,D.saveRouteBuilding=l,D.selectCondition=d,D.selectedCondition=v,D.selectedRoute=g,D.startRouteBuilding=f,D.cancelRouteBuilding=p,D.deleteRoute=c,D.createRule=E,D.deleteRule=h,D.getAnswerListForRule=N,D.getOperatorListForRule=B,D.getWhenListForRule=S,D.updateRule=m}angular.module("otusjs.studio.navigationBuilder.routeBuilder").service("otusjs.studio.navigationBuilder.routeBuilder.RouteBuilderService",e),e.$inject=["otusjs.studio.navigationBuilder.NavigationBuilderScopeService","otusjs.studio.navigationBuilder.routeBuilder.DataService","otusjs.studio.navigationBuilder.routeBuilder.ModuleEventService","otusjs.studio.navigationBuilder.routeBuilder.UiEventsService"]}(),function(){"use strict";function e(e,t,i,n){function o(e){w=e,window.survey=w}function a(){w=null,L=null,M=null,x=null,V=null,F=null}function r(){return v(M)}function u(){return v(L)}function s(t){d(L,t)?(L=null,e.emit(e.NBEVENTS.ORIGIN_NODE_UNSELECTED,t)):d(M,t)?(M=null,e.emit(e.NBEVENTS.DESTINATION_NODE_UNSELECTED,t)):u()?(M=t,e.emit(e.NBEVENTS.DESTINATION_NODE_SELECTED,c())):(L=t,e.emit(e.NBEVENTS.ORIGIN_NODE_SELECTED,t))}function l(){return null}function c(){return[L,M]}function d(e,t){return!(!v(e)||e.id!==t.id)}function v(e){return!!e}function g(){w.NavigationManager.selectNavigationByOrigin(L.id),w.NavigationManager.applyRoute(x)}function f(){var e={};e.name="ROUTE_CONDITION_"+x.conditions.length,e.rules=[],x.conditions.push(e)}function p(e){x.conditions.splice(e,1),N(0)}function E(){w.NavigationManager.selectNavigationByOrigin(L.id),w.NavigationManager.deleteRoute(x)}function h(){D(L.id),x={},x.origin=L.id,x.destination=M.id,x.conditions=[]}function N(e){return!!x.conditions.length&&void(F=x.conditions[e])}function B(){return x}function S(){return F}function m(){return x}function T(e){return 1===D(e).listRoutes().length}function D(e){return V=w.NavigationManager.selectNavigationByOrigin(e)}function R(e,t){D(e.id);var i={};return i.origin=e.id,i.destination=t.id,V.hasRoute(i)}function O(){D(L.id);var e={name:L.id+"_"+M.id};x=V.getRouteByName(e.name).toJson(),x=JSON.parse(x)}function A(e,t,i,n){var o={};o.when=e,o.isMetadata=i.isMetadata||!1,o.operator=t,o.isCustom=n,n?o.answer=i:o.answer=i.option.value,F.rules.push(o)}function I(e){F.rules.splice(e,1)}function y(e){return n.build(e)}function b(e){return i.build(e)}function C(){var e=w.NavigationManager.getAvaiableRuleCriterionTargets(L.id);return e.map(t.build)}function _(e,t,i,n,o){var a=F.rules[e];a.when=t,a.operator=i,o||"string"==typeof n?(a.answer=n,a.isMetadata=!1,a.isCustom=!0):(a.answer=n.option.value,a.isMetadata=n.isMetadata,a.isCustom=!1)}var j=this,w=null,L=null,M=null,x=null,V=null,F=null;j.activate=o,j.deactivate=a,j.hasDestinationNode=r,j.hasOriginNode=u,j.selectNode=s,j.selectedEdges=l,j.selectedNode=c,j.apply=g,j.createCondition=f,j.deleteCondition=p,j.deleteRoute=E,j.initializeRouteData=h,j.isSimpleNavigation=T,j.routeExists=R,j.selectCondition=N,j.selectRoute=B,j.selectedCondition=S,j.selectedRoute=m,j.useCurrentRouteData=O,j.createRule=A,j.deleteRule=I,j.listAvailableAnswer=y,j.listAvailableOperator=b,j.listAvailableWhen=C,j.updateRule=_}angular.module("otusjs.studio.navigationBuilder.routeBuilder").service("otusjs.studio.navigationBuilder.routeBuilder.DataService",e),e.$inject=["otusjs.studio.navigationBuilder.NavigationBuilderScopeService","otusjs.studio.navigationBuilder.routeBuilder.RuleWhenBuilderService","otusjs.studio.navigationBuilder.routeBuilder.RuleOperatorBuilderService","otusjs.studio.navigationBuilder.routeBuilder.RuleAnswerBuilderService"]}(),function(){"use strict";function e(){}angular.module("otusjs.studio.navigationBuilder.routeBuilder").service("otusjs.studio.navigationBuilder.routeBuilder.MessageService",e)}(),function(){"use strict";function e(e,t,i,n){function o(){r(e.NBEVENTS.ROUTE_MODE_ON,s),r(e.NBEVENTS.ROUTE_MODE_OFF,l),r(e.NBEVENTS.ORIGIN_NODE_SELECTED,c),r(e.NBEVENTS.ORIGIN_NODE_UNSELECTED,d),r(e.NBEVENTS.DESTINATION_NODE_SELECTED,v),r(e.NBEVENTS.DESTINATION_NODE_UNSELECTED,g),r(e.NBEVENTS.ROUTE_DELETED,f),r(e.NBEVENTS.ROUTE_BUILD_SAVED,p),r(e.NBEVENTS.ROUTE_BUILD_CANCELED,E)}function a(){u()}function r(t,i){var n=e.onEvent(t,i);N.push(n)}function u(){N.forEach(function(e){e()})}function s(t,n){i.showMessenger(e.NBMESSAGES.ROUTE_BUILDER.SELECT_ORIGIN)}function l(n,o){t.clearVisualChanges(),t.applyVisualChanges(),i.clearMessenger(),a(),e.emit(e.NBEVENTS.RELOAD_MAP_DATA)}function c(n,o){t.lockPreviousNodeOf(o),t.setNodeAsTrailhead(o),t.applyVisualChanges(),i.showMessenger(e.NBMESSAGES.ROUTE_BUILDER.SELECT_DESTINATION),e.apply()}function d(n,o){t.releasePreviousNodesOf(o),t.clearNode(o),t.applyVisualChanges(),i.showMessenger(e.NBMESSAGES.ROUTE_BUILDER.SELECT_ORIGIN),e.apply(),e.emit(e.NBEVENTS.RELOAD_MAP_DATA)}function v(e,o){t.setNodeAsTrailend(o),t.applyVisualChanges(),i.clearMessenger(),n.showDialog(o[0],o[1])}function g(n,o){t.clearNode(o),t.applyVisualChanges(),i.showMessenger(e.NBMESSAGES.ROUTE_BUILDER.SELECT_DESTINATION),e.emit(e.NBEVENTS.RELOAD_MAP_DATA)}function f(t){n.closeDialog(),e.emit(e.NBEVENTS.ROUTE_MODE_OFF),e.emit(e.NBEVENTS.NAVIGATION_UPDATED)}function p(t){n.closeDialog(),e.emit(e.NBEVENTS.ROUTE_MODE_OFF),e.emit(e.NBEVENTS.NAVIGATION_UPDATED)}function E(t){n.closeDialog(),e.emit(e.NBEVENTS.ROUTE_MODE_OFF)}var h=this,N=[];h.activate=o,h.deactivate=a}angular.module("otusjs.studio.navigationBuilder.routeBuilder").service("otusjs.studio.navigationBuilder.routeBuilder.ModuleEventService",e),e.$inject=["otusjs.studio.navigationBuilder.NavigationBuilderScopeService","otusjs.studio.navigationBuilder.GraphLayerService","otusjs.studio.navigationBuilder.messenger.InstructorService","otusjs.studio.navigationBuilder.routeBuilder.RouteDialogService"]}(),function(){"use strict";function e(){function e(e){var i=[];return"SingleSelectionQuestion"!==e.objectType&&"CheckboxQuestion"!==e.objectType?i=i.concat(t()):e.options?i=i.concat(e.options.map(n)):e.options&&(i=i.concat(e.options.map(n))),e.metadata&&e.metadata.options&&(i=i.concat(e.metadata.options.map(o))),i}function t(){return[{isMetadata:!1,option:{label:{ptBR:{plainText:""},value:null}}}]}function i(e){if("CalendarQuestion"===e.when.type){var t=new Date(e.answer);t.getDate()+"/"+(t.getMonth()+1)+"/"+t.getFullYear()}return{isMetadata:!1,option:{label:{ptBR:{plainText:e.answer},value:null}}}}function n(e){return{isMetadata:!1,option:e}}function o(e){return{isMetadata:!0,option:e}}var a=this;a.build=e,a.buildCustomAnswer=i}angular.module("otusjs.studio.navigationBuilder").service("otusjs.studio.navigationBuilder.routeBuilder.RuleAnswerBuilderService",e)}(),function(){"use strict";function e(){function e(e){return t(e)?l.text:i(e)?l.number:n(e)?l.date:o(e)?l.time:a(e)?l.singleChoice:r(e)?l.multipleChoice:[]}function t(e){return"TextQuestion"===e||"EmailQuestion"===e||"PhoneQuestion"===e}function i(e){return"IntegerQuestion"===e||"DecimalQuestion"===e}function n(e){return"CalendarQuestion"===e}function o(e){return"TimeQuestion"===e}function a(e){return"SingleSelectionQuestion"===e}function r(e){return"CheckboxQuestion"===e}function u(){l={};var e={};e.type="notEqual",e.label={},e.label.ptBR={},e.label.ptBR.plainText="Diferente de";var t={};t.type="equal",t.label={},t.label.ptBR={},t.label.ptBR.plainText="Igual a";var i={};i.type="contains",i.label={},i.label.ptBR={},i.label.ptBR.plainText="Contém";var n={};n.type="in",n.label={},n.label.ptBR={},n.label.ptBR.plainText="Está dentro do intervalo";var o={};o.type="between",o.label={},o.label.ptBR={},o.label.ptBR.plainText="Está entre os valores";var a={};a.type="greater",a.label={},a.label.ptBR={},a.label.ptBR.plainText="É maior que";var r={};r.type="greaterEqual",r.label={},r.label.ptBR={},r.label.ptBR.plainText="É maior ou igual a";var u={};u.type="lower",u.label={},u.label.ptBR={},u.label.ptBR.plainText="É menor que";var s={};s.type="lowerEqual",s.label={},s.label.ptBR={},s.label.ptBR.plainText="É menor ou igual a",l.singleChoice=[e,t],l.text=Array.prototype.concat(l.singleChoice,[i]),l.number=Array.prototype.concat(l.singleChoice,[n,o,a,r,u,s]),l.date=l.number,l.time=l.date,l.multipleChoice=l.text}var s=this,l={};u(),s.build=e}angular.module("otusjs.studio.navigationBuilder").service("otusjs.studio.navigationBuilder.routeBuilder.RuleOperatorBuilderService",e)}(),function(){"use strict";function e(){function e(e){var t={};return t.type=e.objectType,t.icon=n[e.objectType],t.customID=e.customID,t.label=e.label,t.item=e,t}function t(){n.CalendarQuestion={},n.CalendarQuestion.image="date_range",n.CalendarQuestion.tooltip="Data",n.IntegerQuestion={},n.IntegerQuestion.image="looks_one",n.IntegerQuestion.tooltip="Número Inteiro",n.DecimalQuestion={},n.DecimalQuestion.image="exposure_zero",n.DecimalQuestion.tooltip="Número Decimal",n.SingleSelectionQuestion={},n.SingleSelectionQuestion.image="radio_button_checked",n.SingleSelectionQuestion.tooltip="Seleção Única",n.CheckboxQuestion={},n.CheckboxQuestion.image="check_box",n.CheckboxQuestion.tooltip="Checkbox",n.TextQuestion={},n.TextQuestion.image="text_format",n.TextQuestion.tooltip="Texto",n.EmailQuestion={},n.EmailQuestion.image="email",n.EmailQuestion.tooltip="Email",n.TimeQuestion={},n.TimeQuestion.image="access_time",n.TimeQuestion.tooltip="Hora",n.PhoneQuestion={},n.PhoneQuestion.image="phone",n.PhoneQuestion.tooltip="Telefone",n.TextItem={},n.TextItem.image="message",n.TextItem.tooltip="Texto",n.ImageItem={},n.ImageItem.image="image",n.ImageItem.tooltip="Imagem"}var i=this,n={};i.build=e,t()}angular.module("otusjs.studio.navigationBuilder").service("otusjs.studio.navigationBuilder.routeBuilder.RuleWhenBuilderService",e)}(),function(){"use strict";function e(e,t,i){function n(){t.eventService.onClickNode(a),t.eventService.onOverNode(r),t.eventService.onClickEdge(u),t.eventService.onOverEdge(s)}function o(){t.eventService.clearAllEventListeners()}function a(e){i.selectNode(e.data.node)}function r(e){}function u(t){var n=e.get("map");n.nodes([t.data.edge.source]),t.data.edge.source;i.selectNode()}function s(e){console.log(e.data.edge)}var l=this;l.activate=n,l.deactivate=o}angular.module("otusjs.studio.navigationBuilder.routeBuilder").service("otusjs.studio.navigationBuilder.routeBuilder.UiEventsService",e),e.$inject=["otusjs.studio.navigationBuilder.NavigationBuilderScopeService","otusjs.studio.navigationBuilder.GraphLayerService","otusjs.studio.navigationBuilder.routeBuilder.DataService"]}(),function(){"use strict";function e(e,i){function n(){r()}function o(t,n){s.locals={origin:t,destination:n,moduleScope:i},e.show(s)}function a(){e.hide()}function r(){s.templateUrl="app/navigation-builder/route/dialog/route-dialog-template.html",s.controller=t,s.controllerAs="ctrl",s.escapeToClose=!1,s.fullscreen=!0,s.hasBackdrop=!0}var u=this,s={};u.showDialog=o,u.closeDialog=a,n()}function t(e,t,i,n){function o(t){e.hide(t)}function a(t){e.hide(t)}var r=this;r.origin=t,r.destination=i,r.cancel=o,r.confirm=a}angular.module("otusjs.studio.navigationBuilder.routeBuilder").service("otusjs.studio.navigationBuilder.routeBuilder.RouteDialogService",e),e.$inject=["$mdDialog","otusjs.studio.navigationBuilder.NavigationBuilderScopeService"]}(),function(){"use strict";function e(e){function t(){v={},l(),e.startRouteBuilding(d.originNode,d.destinationNode),d.isNewRoute=e.isNewRoute(),d.selectedRoute=e.selectedRoute(),d.conditions=e.selectedRoute().conditions,d.conditions.forEach(function(e){v[e.name]=[]}),s()}function i(){e.cancelRouteBuilding()}function n(){e.saveRouteBuilding()}function o(){e.deleteRoute()}function a(){e.createCondition(),v[d.conditions[d.conditions.length-1].name]=[]}function r(t,i){delete v[i.name],e.deleteCondition(t)}function u(t){e.selectCondition(t)}function s(){return!!d.selectedRoute.isDefault||(d.selectedRoute.conditions.length||a(),d.selectedRoute.conditions.every(function(e){return e.rules.length>0}))}function l(){d.label={dialog:{title:"Criar nova Rota"},button:{cancel:"Cancelar",save:"Salvar Rota",createCondition:"Criar condição de rota",deleteRoute:"Exluir esta rota"},origin:"Origem",destination:"Destino",originNode:d.originNode.label,destinationNode:d.destinationNode.label,conditionTitle:"Regras de condição",isDefaultRoute:"Rota padrão",message:{emptyConditions:"Você ainda não criou condições de rota. Clicando em CRIAR CONDIÇÃO DE ROTA."
}}}function c(e){return v[e.name]}var d=this,v={};d.selectedRoute=[],d.conditions=[],d.$onInit=t,d.cancel=i,d.save=n,d.deleteRoute=o,d.createCondition=a,d.selectCondition=u,d.deleteCondition=r,d.readyToSave=s,d.childRules=c,d.deleteRule=function(t){var i=e.selectedCondition();v[i.name].indexOf(t);i.rules.forEach(function(e,t){v[i.name][t].ruleData.index=t}),e.deleteRule(t.ruleData.index),v[i.name].splice(t.ruleData.index,1)}}angular.module("otusjs.studio.navigationBuilder.routeBuilder").component("otusRouteEditor",{templateUrl:"app/navigation-builder/route/editor/route-editor.html",controller:e,bindings:{originNode:"<",destinationNode:"<",onConfirm:"&"}}),e.$inject=["otusjs.studio.navigationBuilder.routeBuilder.RouteBuilderService"]}(),function(){"use strict";function e(e,t){function i(){c(),N.isDisable=!0,N.isAnswerDisable=!0,N.showSaveRuleButton=!0,N.readyToSave=g()}function n(e){if(e){var t=N.answerList.filter(function(t){return t.option.label.ptBR.plainText.search(e)!=-1||N.selectedWhen.customID.search(e)!=-1});return t.filter(o)}return N.answerList.filter(o)}function o(e,t){return"SingleSelectionQuestion"==N.selectedWhen.type||"CheckboxQuestion"==N.selectedWhen.type||t>0}function a(){N.answerSearchText&&("SingleSelectionQuestion"==N.selectedWhen.type||"CheckboxQuestion"==N.selectedWhen.type?(h=!1,N.readyToSave=!1):(h=!0,N.selectedAnswer=N.answerSearchText,N.readyToSave=g()))}function r(e){h||(h=!1,N.selectedAnswer=e),N.readyToSave=g()}function u(e){if(e){var t=N.whenList.filter(function(t){return t.label.ptBR.plainText.search(e)!=-1||t.customID.search(e)!=-1});return t}return N.whenList}function s(t){N.selectedWhen=t,N.operatorList=[],N.answerList=[],N.selectedWhen?(N.operatorList=l(N.selectedWhen.type),N.answerList=e.getAnswerListForRule(N.selectedWhen.item),N.isDisable=!1):N.isDisable=!0,N.readyToSave=g()}function l(t){var i=e.getOperatorListForRule(t).filter(function(e,t){if("Intervalo de valores"!==e.label.ptBR.plainText&&"Está dentro do intervalo"!==e.label.ptBR.plainText&&"Está entre os valores"!==e.label.ptBR.plainText)return!0});return i}function c(){N.whenList=[],N.whenList=e.getWhenListForRule()}function d(e){N.selectedOperator=e,N.readyToSave=g()}function v(){e.selectCondition(N.conditionIndex),g()&&e.createRule(N.selectedWhen,N.selectedOperator,N.selectedAnswer,h),h=!1,N.whenSearchText="",N.operatorSearchText="",N.answerSearchText=""}function g(){return!!(f()&&p()&&E())}function f(){return!!N.selectedWhen}function p(){return!!N.selectedOperator}function E(){return!(!h&&!N.selectedAnswer)}var h,N=this;N.$onInit=i,N.answers=n,N.answerChange=r,N.answerInputChange=a,N.operatorChange=d,N.whens=u,N.whenChange=s,N.saveRule=v}angular.module("otusjs.studio.navigationBuilder.routeBuilder").component("otusRuleCreator",{templateUrl:"app/navigation-builder/route/editor/rule-creator-template.html",controller:e,bindings:{condition:"<",conditionIndex:"<"}}),e.$inject=["otusjs.studio.navigationBuilder.routeBuilder.RouteBuilderService","otusjs.studio.navigationBuilder.routeBuilder.RuleAnswerBuilderService"]}(),function(){"use strict";function e(e,t,i){function n(){D.isDisable=!1,D.isAnswerDisable=!1,D.showDeleteRuleButton=!0,h(),o(),a(),r(),D.$element=e,D.ruleData.index=D.otusRouteEditor.childRules(D.condition).length,D.otusRouteEditor.childRules(D.condition).push(D)}function o(){var e=D.ruleData.when.customID||D.ruleData.when;D.whenList.some(function(t){if(t.customID===e)return D.selectedWhen=t,!0})}function a(){D.operatorList=t.getOperatorListForRule(D.selectedWhen.type);var e=D.ruleData.operator.type||D.ruleData.operator;D.operatorList.some(function(t){if(t.type===e)return D.selectedOperator=t,!0})}function r(){D.answerList=t.getAnswerListForRule(D.selectedWhen.item),D.ruleData.isCustom?D.selectedAnswer=i.buildCustomAnswer(D.ruleData):D.selectedAnswer=D.answerList.filter(function(e){return e.option.value===D.ruleData.answer&&e.isMetadata===D.ruleData.isMetadata})[0]}function u(e){if(e){var t=D.answerList.filter(function(t){return t.option.label.ptBR.plainText.search(e)!=-1||D.selectedWhen.customID.search(e)!=-1});return t.filter(s)}return D.answerList.filter(s)}function s(e,t){if(D.selectedWhen)return"SingleSelectionQuestion"==D.selectedWhen.type||"CheckboxQuestion"==D.selectedWhen.type||t>0}function l(){D.answerSearchText&&("SingleSelectionQuestion"==D.selectedWhen.type||"CheckboxQuestion"==D.selectedWhen.type?(T=!1,D.readyToSave=!1):(T=!0,D.selectedAnswer=D.answerSearchText,p(),D.readyToSave=N()))}function c(e){T&&e||(T=!1,D.selectedAnswer=e,p()),D.readyToSave=N()}function d(e){if(e){var t=D.whenList.filter(function(t){return t.label.ptBR.plainText.search(e)!=-1||t.customID.search(e)!=-1});return t}return D.whenList}function v(e){D.selectedOperator=e,D.readyToSave=N(),p()}function g(e){D.selectedWhen=e,D.answerSearchText="",D.operatorSearchText="",D.selectedWhen?(D.operatorList=f(D.selectedWhen.type),D.answerList=t.getAnswerListForRule(D.selectedWhen.item),D.isDisable=!1):D.isDisable=!0,D.readyToSave=N(),p()}function f(e){var i=t.getOperatorListForRule(e).filter(function(e,t){if("Intervalo de valores"!==e.label.ptBR.plainText&&"Está dentro do intervalo"!==e.label.ptBR.plainText&&"Está entre os valores"!==e.label.ptBR.plainText)return!0});return i}function p(){t.selectCondition(D.conditionIndex),D.ruleData&&D.selectedAnswer&&t.updateRule(D.ruleData.index,D.selectedWhen,D.selectedOperator,D.selectedAnswer,T)}function E(){t.selectCondition(D.conditionIndex),D.onUpdate({ruleEditor:D})}function h(){D.whenList=[],D.whenList=t.getWhenListForRule()}function N(){return!!(B()&&S()&&m())}function B(){return!!D.selectedWhen}function S(){return!!D.selectedOperator}function m(){return!(!T&&!D.selectedAnswer)}var T,D=this;D.$onInit=n,D.answers=u,D.answerChange=c,D.answerInputChange=l,D.operatorChange=v,D.whens=d,D.whenChange=g,D.updateRule=p,D.deleteRule=E}angular.module("otusjs.studio.navigationBuilder.routeBuilder").component("otusRuleEditor",{templateUrl:"app/navigation-builder/route/editor/rule-editor-template.html",controller:e,bindings:{ruleData:"<",condition:"<",conditionIndex:"<",onUpdate:"&"},require:{otusRouteEditor:"^otusRouteEditor"}}),e.$inject=["$element","otusjs.studio.navigationBuilder.routeBuilder.RouteBuilderService","otusjs.studio.navigationBuilder.routeBuilder.RuleAnswerBuilderService"]}();