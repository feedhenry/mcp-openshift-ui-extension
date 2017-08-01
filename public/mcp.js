console.log('Mobile Control Panel Extension Loaded');

window.OPENSHIFT_CONSTANTS.PROJECT_NAVIGATION.unshift({
  label: "Mobile",
  iconClass: "fa fa-mobile",
  href: "/mobile",
  prefixes: [                   // Primary nav items can also specify prefixes to trigger
    "/mobile/"         // active state
  ],
  isValid: function() {         // Primary or secondary items can define an isValid
    return true;           // function. If present it will be called to test whether
                                // the item should be shown, it should return a boolean
    // TODO: Can this check if any mobile apps exist first?
  }
});

angular
  .module('mobileOverviewExtension', ['openshiftConsole'])
  .config(function($routeProvider) {
    $routeProvider
      .when('/project/:project/mobile', {
        templateUrl: ' extensions/mcp/mobile.html',
        controller: 'MobileOverviewController'
      });
    }
  )
  .controller('MobileOverviewController', ['$scope', '$controller', function ($scope, $controller) {
    // Initialize the super class and extend it.
    angular.extend(this, $controller('OverviewController', {$scope: $scope}));
    console.log('MobileOverviewController');

    // TODO: use a Service to retrieve Mobile Apps
    $scope.mobileapps = [{
      metadata: {
        name: 'Mock Android App'
      },
      spec: {
        type: 'android'
      }
    }, {
      metadata: {
        name: 'Mock iOS App'
      },
      spec: {
        type: 'ios'
      }
    }];
   }]);

hawtioPluginLoader.addModule('mobileOverviewExtension');