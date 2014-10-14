;(function(angular, defaults) {

  'use strict';

  if (!angular) {
    return;
  }
  
  defaults = defaults || {};

  var slice = Array.prototype.slice;
  var _module = angular.module;

  angular.module = function(name) {
    var moduleInstance = _module.apply(angular, arguments);
    var useNamespace = false;
    var delimeter = defaults.delimeter || '.',
    var methods = defaults.methods || 'constant decorator factory provider service value';

    moduleInstance.namespace = function(flag, options) {
      options = options || { };
      
      if (typeof flag === 'boolean') {
        useNamespace = flag;
      }
      
      if (typeof options.delimeter === 'string') {
        delimeter = options.delimeter;
      }
      
      if (typeof options.methods !== 'undefined') {
        methods = options.methods;
      }

      if (typeof methods === 'string') {
        methods = methods.split(' ');
      }
      
      return moduleInstance;
    };

    angular.forEach(methods, function(method) {
      var _method = moduleInstance[method];

      moduleInstance[method] = function(providerName) {
        var args = slice.call(arguments);
      
        if (useNamespace) {
          args[0] = name + delimeter + providerName;
        }

        return _method.apply(moduleInstance, args);
      };
    });

    return moduleInstance;
  };

}(this.angular, this.hasOwnProperty('ngNamespacerDefaults') ? this.ngNamespacerDefaults : null));
