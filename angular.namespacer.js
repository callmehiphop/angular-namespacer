;(function(angular) {

  'use strict';

  if (!angular) {
    return;
  }

  var slice = Array.prototype.slice;
  var _module = angular.module;
  var methods = 'constant decorator factory provider service value'.split(' ');

  angular.module = function(name) {
    var moduleInstance = _module.apply(angular, arguments);
    var useNamespace = false;
    
    moduleInstance.namespace = function(flag) {
      if (typeof flag === 'boolean') {
        useNamespace = flag;
      }
      
      return moduleInstance;
    };

    angular.forEach(methods, function(method) {
      var _method = moduleInstance[method];

      moduleInstance[method] = function(providerName) {
        var args = slice.call(arguments);
      
        if (useNamespace) {
          args[0] = name + '.' + providerName;
        }

        return _method.apply(moduleInstance, args);
      };
    });

    return moduleInstance;
  };

}(this.angular));
