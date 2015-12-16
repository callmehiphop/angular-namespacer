(function (angular) {

  'use strict';

  var slice = Array.prototype.slice;
  var angularModule = angular.bind(angular, angular.module);

  var defaults = {
    methods: 'constant factory provider service value'.split(' '),
    delimiter: '.',
    camelCase: false
  };

  /**
   * Attempts to read default configurations set by user
   * @return {Object}
   */
  function getUserOptions () {
    try {
      return angular.injector(['ns']).get('config');
    }
    catch (e) {
      return {};
    }
  }

  /**
   * Gets namespacing options for current module
   * @param {Function} callback
   * @return {Object}
   */
  function getNsOptions (instanceOptions) {
    var options = angular.copy(defaults);

    angular.extend(options, getUserOptions(), instanceOptions);
    return options;
  }

  function capitalize (str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
  }

  /**
   * Monkey patches the instance methods to apply namespace
   * @param {Object} angular module
   * @param {Object} namespace options
   */
  function monkeyPatch (instance, options) {
    angular.forEach(options.methods, function (method) {
      var instanceMethod = instance[method];

      instance[method] = function () {
        var args = slice.call(arguments);

        if (options.camelCase) {
          args[0] = instance.name + capitalize(args[0]);
        } else {
          args[0] = [instance.name, args[0]].join(options.delimiter);
        }

        return instanceMethod.apply(instance, args);
      };
    });
  }

  /**
   * Decorates angular module instance to allow for namespaces
   */
  angular.module = function (moduleName, requires, configFn) {
    var instance = angularModule(moduleName, requires, configFn);

    instance.namespace = function (options) {
      monkeyPatch(instance, getNsOptions(options || {}));
      return instance;
    };

    return instance;
  };

}(this.angular));
