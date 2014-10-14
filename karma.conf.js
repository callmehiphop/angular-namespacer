'use strict';

module.exports = function (karma) {

  karma.set({

    singleRun: true,
    autoWatch: false,

    reporters: ['spec'],
    browsers: ['PhantomJS'],
    plugins: ['karma-*'],

    frameworks: [
      'mocha',
      'chai', 
    ],

    files: [
      'bower_components/angular/angular.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'angular-namespacer.js',
      'test.js'
    ]

  });

};
