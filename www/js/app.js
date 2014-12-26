// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services','starter.filters'])

.directive('whenScrolled', function() { 
  return function(scope, elm, attr) { 
    var raw = elm[0]; 
    elm.bind('scroll', function() { 
      if (raw.scrollTop+raw.offsetHeight >= raw.scrollHeight) { 
        scope.$apply(attr.whenScrolled); 
      } 
    }); 
  }; 
})

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})



.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

    // setup an abstract state for the tabs directive
    .state('tab', {
      url: "/tab",
      abstract: true,
      templateUrl: "templates/tabs.html"
    })

    // Each tab has its own nav history stack:

    .state('tab.index', {
      url: '/index',
      views: {
        'tab-index': {
          templateUrl: 'templates/tab-index.html',
          controller: 'IndexCtrl'
        }
      }
    })


    .state('tab.nearby', {
      url: '/nearby',
      views: {
        'tab-nearby': {
          templateUrl: 'templates/tab-nearby.html',
          controller: 'NearByCtrl'
        }
      }
    })
    .state('tab.nearby-detail', {
      url: '/nearby/:friendId',
      views: {
        'tab-nearby': {
          templateUrl: 'templates/friend-detail.html',
          controller: 'FriendDetailCtrl'
        }
      }
    })

    .state('tab.member', {
      url: '/member',
      views: {
        'tab-member': {
          templateUrl: 'templates/tab-member.html',
          controller: 'MemberCtrl'
        }
      }
    })
  
    .state('mystore', {
      url: '/mystore',
      controller: 'MystoreCtrl',
      templateUrl: "templates/mystore.html"
    })

    .state('recommendMember', {
      url: '/recommendMember',
      controller: 'RecommendMemCtrl',
      templateUrl: "templates/recommendMember.html"
    })

     .state('recommendPerformance', {
      url: '/recommendPerformance',
      controller: 'RecommendPerCtrl',
      templateUrl: "templates/recommendPerformance.html"
    })

    .state('myrecommend', {
      url: '/myrecommend',
      controller: 'MyrecommendCtrl',
      templateUrl: "templates/myrecommend.html"
    })

    .state('myprofile', {
      url: '/myprofile',
      controller: 'MyprofileCtrl',
      templateUrl: "templates/myprofile.html"
    })
    
    .state('setting', {
      url: "/setting",
      controller: 'SetCtrl',
      templateUrl: "templates/setting.html"
    })

    .state('tab.group', {
      url: '/group',
      views: {
        'tab-group': {
          templateUrl: 'templates/tab-group.html',
          controller: 'GroupCtrl'
        }
      }
    })
    .state('citys', {
      url: "/citys",
      controller: 'CitysCtrl',
      templateUrl: "templates/citys.html"
    })

    .state('shops', {
      url: "/shops/:categoryId",
      controller: 'ShopsCtrl',
      templateUrl: "templates/tab-shops.html",
      animation: 'slide-left-right-ios7'
    })

    .state('market', {
      url: "/market/:marketId",
      controller: 'MarketCtrl',
      templateUrl: "templates/market.html",
      animation: 'slide-left-right-ios7'
    })

    .state('markets', {
      url: "/markets/:markettype",
      controller: 'MarketsCtrl',
      templateUrl: "templates/markets.html",
      animation: 'slide-left-right-ios7'
    })

    .state('shopdetail', {
      url: "/shopdetail/:shopId",
      controller: 'ShopdetailCtrl',
      templateUrl: "templates/tab-shop.html"
    })

    .state('product', {
      url: "/product/:productId",
      controller: 'ProductCtrl',
      templateUrl: "templates/productdetail.html"
    })
    .state('shoptopay', {
      url: "/shoptopay/:shopId",
      controller: 'ShoptoPayCtrl',
      templateUrl: "templates/shoptopay.html"
    })

    .state('topay', {
      url: "/topay/:productId",
      controller: 'ToPayCtrl',
      templateUrl: "templates/topay.html"
    })

    .state('mydollar', {
      url: "/mydollar/:memberId",
      controller: 'MydollarCtrl',
      templateUrl: "templates/mydollar.html"
    })

    .state('login', {
      url: "/login",
      controller: 'LoginCtrl',
      templateUrl: "templates/login.html"
    })

    .state('register', {
      url: "/register",
      controller: 'RegisterCtrl',
      templateUrl: "templates/register.html"
    })
    .state('shopprofile', {
      url: "/shopprofile/:shopId",
      controller: 'ShopprofileCtrl',
      templateUrl: "templates/shopprofile.html"
    })

    .state('test', {
      url: "/test",
      abstract: true,
      templateUrl: "templates/test.html"
    })

    .state('test.home', {
      url: '/home',
      views: {
        'test-home': {
          templateUrl: 'templates/test-home.html',
          controller: 'HomeCtrl'
        }
      }
    })

    .state('test.setting', {
      url: '/setting',
      views: {
        'test-setting': {
          templateUrl: 'templates/test-setting.html',
          controller: 'SettingCtrl'
        }
      }
    });




  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/index');

})





   