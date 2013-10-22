angular-namespacer
==================

> Namespaces your Angular modules!

Angular Namespacer essentially hacks `angular.module` and renames your Providers on the fly by concatenating the module name and provider name together. In order for this to effectively work, you must take advantage of the minification features.

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
