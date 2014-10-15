describe('angular namespacer', function () {

  'use strict';

  var $injector;

  function bootstrap () {
    // jshint camelcase:false
    module('aww');
    inject(function (_$injector_) {
      $injector = _$injector_;
    });
  }

  beforeEach(function () {
    angular.module('aww', []);
  });

  it('should namespace the module names', function () {
    angular
      .module('aww')
      .namespace()
      .factory('yiss', angular.noop);

    bootstrap();
    expect($injector.has('aww.yiss')).to.be.true;
  });

  it('should allow you to override the default delimiter', function () {
    angular
      .module('aww')
      .namespace({
        delimiter: '_'
      })
      .factory('yiss', angular.noop);

    bootstrap();
    expect($injector.has('aww_yiss')).to.be.true;
  });

  it('should only namespace specified methods', function () {
    angular
      .module('aww')
      .namespace({
        methods: ['factory']
      })
      .value('yeah', true)
      .factory('yiss', angular.noop);

    bootstrap();
    expect($injector.has('aww.yiss')).to.be.true;
    expect($injector.has('aww.yeah')).to.be.false;
    expect($injector.has('yeah')).to.be.true;
  });

  it('should allow the user to set defaults to be applied', function () {
    angular
      .module('ns', [])
      .value('config', {
        delimiter: '_'
      });

    /**

    angular
      .module('ns', [])
      .config(function (NamespaceProvider) {
        NamespaceProvider.config({
          delimiter: '_'
        });
      })

    */

    angular
      .module('aww')
      .namespace()
      .factory('yiss', angular.noop);

    bootstrap();
    expect($injector.has('aww_yiss')).to.be.true;
  });

});
