angular-namespacer
==================

> Namespaces your Angular modules!

Angular Namespacer essentially hacks `angular.module` and renames your Providers on the fly by concatenating the module name and provider name together. In order for this to effectively work, you must take advantage of the minification features, or set a different delimeter in the options.

```javascript
angular.module('util', [])
  .namespace(true)
    .factory('thing', function() {
      return 1 + 2;
    });

angular.module('myApp', ['util'])
  .controller('MainCtrl', [
    // dependencies
    '$scope',
    'util.thing',
    // give your provider a fancy alias!
    function($scope, superAmazingThing) {
      $scope.sweetData = superAmazingThing;
    }
  ]);
```

Global options
--------------

The delimeter may be changed, and the methods which are hooked by the namespacer may also be specified explicitly.  The defaults are shown below:

```html
<script>
/* If ngNamespacerDefaults is not defined, these defaults are used */
this.ngNamespacerDefaults = {
  delimeter: '.',
  methods: 'constant decorator factory provider service value'
};
/* If you set global options, do so before including angular-namespacer.js */
</script>
<script src="angular-namespacer.js"></script>
```

Per-module options
------------------

The global may also be set per-module instead.  Module options override global options:

```javascript
angular.module('util', [])
  .namespace(true, { delimter: '_', methods: 'constant value controller' })
    .service('someService', [
      function () {
        /* The service is not namespaced, since "service" does not appear in the "methods" options */
        this.get42 = function () { return 42; };
      }
    ]);
    .controller('someController', [
      '$scope',
      function ($scope) {
        /* The controller is namespaced, since "controller" appears in the "methods" options */
      }
    ]);
    
/* The underscore delimeter (instead of a period) makes ng-annotate more practical to use */
angular.module('app', ['util'])
  .controller('myController', function ($scope, someService, util_someController) {
    /* ng-annotate can auto-generate the injection list */
    /*
     * An underscore delimeter allows us to name variables using the delimeter.
     * We could use any character which is permitted in variable names, but
     * symbols such as '_' and '$' should be preferred over alphanumeric characters
     * or tricky unicode characters.
     */
  });
```
