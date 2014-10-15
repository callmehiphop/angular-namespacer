angular-namespacer
==================

> Namespaces your Angular modules!

Angular Namespacer is a monkey patch for `angular.module` that allows you create
a namespace of sorts for you services and what not.

```javascript
angular
  .module('util', [])
  .namespace()
  .factory('thing', function () {
    return 1 + 2;
  });

angular
  .module('myApp', ['util'])
  .controller('MainCtrl', [
    '$scope',
    'util.thing',
    function ($scope, thing) {
      $scope.sweetData = thing;
    }
  ]);
```

## options

```javascript
angular
  .module('util', [])
  .namespace({
    delimiter: '.',
    methods: [
      'factory',
      'service',
      'provider',
      'constant',
      'value'
    ]
  });
```

## global defaults

You can optionally configure a module to set the default options. This might be
useful if you want to use `'_'` as your delimiter everywhere in the application

```javascript
angular
  .module('ns', [])
  .value('config', {
    delimiter: '_'
  });
```
