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
    var delim = '.';
    
    moduleInstance.namespace = function(flag, delim) {
      if (typeof flag === 'boolean') {
        useNamespace = flag;
      }
      
      if (typeof delim === 'string') {
        delimeter = delim;
      }
      
      return moduleInstance;
    };

    angular.forEach(methods, function(method) {
      var _method = moduleInstance[method];

      moduleInstance[method] = function(providerName) {
        var args = slice.call(arguments);
      
        if (useNamespace) {
          args[0] = name + delim + providerName;
        }

        return _method.apply(moduleInstance, args);
      };
    });

    return moduleInstance;
  };

}(this.angular));
