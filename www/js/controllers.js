angular.module('starter.controllers', [])

//主页 商铺 商品详情等controller  开始位置
.controller('IndexCtrl', function($scope, $ionicModal,$ionicPopover,$ionicBackdrop,Location,IndexService) {
  

$scope.menus=IndexService.get();
//分享
 $ionicPopover.fromTemplateUrl('templates/region.html', {
    scope: $scope,
  }).then(function(region) {
     Location.getLocation().then(function(data){
        $scope.location=data.content.address_detail.city;
      }, function(data){
        alert(data);
      });
    $scope.region = region;
  });
  $scope.getRegions = function($event) {
     Location.getAreas($scope.location).then(function(data){
        $scope.regionoptions =data.result;
      }, function(data){
        alert(data);
      });
    $scope.region.show($event);
  };

  $scope.showShops = function(categoryId) {
    window.location.href="#/shops/"+categoryId;
  };


  
})



.controller('ShopsCtrl', function($scope,$stateParams,Friends,Shops) {
    $scope.friends = Friends.all();
    $scope.shops = Shops.one();
    Shops.getcategorys($stateParams.categoryId).then(function(data){
        $scope.categorys = data.result;
          Shops.getShops(data.result[0].id).then(function(data){
             $scope.shops = data.result;
          }, function(data){
            alert(data);
          });
      }, function(data){
        alert(data);
      });
    

    $scope.refreshshops= function(categoryId) {
      Shops.getShops(categoryId).then(function(data){
             $scope.shops = data.result;
          }, function(data){
            alert(data);
          });
    };

    $scope.backtoIndex = function() {
      window.location.href="#/tab/dash";
    };


})

.controller('ShopdetailCtrl', function($scope,$ionicPopover,$stateParams,Shopdetail,Shops,LocalData) {
  var shopId=$stateParams.shopId
  $scope.closedetails= function() {
   window.location.href="#/shopdetail/"+shopId;
  };

  $scope.showProductDetail=function(productId) {
   window.location.href="#/product/"+productId;
  };
//商铺详情的获取
  // Shops.getShopDetail().then(function(data){
  //       $scope.shop=data.result;
  //     }, function(data){
  //       alert(data);
  //     })
  Shops.getShopProducts(shopId).then(function(data){
        $scope.products=data.result;
        LocalData.setproduct(data.result);
      }, function(data){
        alert(data);
      })


  // $scope.SharePage = function() {
  //   try{
  //   window.plugins.socialsharing.share('我在使用新商店购物，获取新商币，购物更便利', null, null, 'http://www.xinshangdian.com');
  //   }catch(err){

  //   };

  $ionicPopover.fromTemplateUrl('templates/popover.html', {
    scope: $scope,
  }).then(function(popover) {
    $scope.popover = popover;
  });
  $scope.openPopover = function($event) {
    $scope.productcates=Shopdetail.categorys();
    $scope.popover.show($event);
  };
  $scope.closePopover = function() {
    $scope.popover.hide();
  };
  //Cleanup the popover when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.popover.remove();
  });
  // Execute action on hide popover
  $scope.$on('popover.hidden', function() {
    // Execute action
  });
  // Execute action on remove popover
  $scope.$on('popover.removed', function() {
    // Execute action
  });
})


.controller('ProductCtrl', function($scope,$stateParams) {
var productId=$stateParams.productId;
  $scope.closeProductDetail=function(){
   window.location.href="#/shopdetail/"+productId;
  };
 $scope.topaypage=function(){
   window.location.href="#/topay/"+productId;
  };


})

.controller('ToPayCtrl', function($scope,$stateParams) {
  $scope.back=function(){
   window.location.href="#/product/"+productId;
  };

})
//主页 商铺 商品详情等controller  结束位置



//附近页面的controller
.controller('NearByCtrl', function($scope,Friends) {
   Friends.jsonp().then(function(data){
        $scope.friends=data;
      }, function(data){
        alert(data);
      })
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})
//团购页面的controller
.controller('GroupCtrl', function($scope,Friends,Location,$http, $q) {

  //方案一 可行 需要等待网络响应
      var friends  = Friends.all();
  //Show a backdrop for one second
  $scope.Factory = function() {
    alert(friends);
  };


  //方案二 可行 请求可以写在外面。
  //Show a backdrop for one second
  $scope.Controller = function() {
    try{
    window.plugins.socialsharing.share('Message and link', null, null, 'http://www.x-services.nl');
    }catch(err){
      alert(err);
    }
  };

  //方案三 失败
  var friendsThree;
   $scope.FactoryTwo = function() {
    Location.getAreas("杭州市").then(function(data){
        alert(JSON.stringify(data));
      }, function(data){
        alert(data);
      })
  };


})

//会员页面的controller
.controller('MemberCtrl', function($scope, $ionicModal,MemberService) {
 $scope.openlogin=function(shopId) {
    window.location.href="#/login";
  };
$scope.Member =MemberService.getMember();
})

//会员页面的controller
.controller('LoginCtrl', function($scope, $ionicModal,$ionicPopup, MemberService) {
   $scope.closelogin= function() {
    window.location.href="#/tab/member";
  };

   $scope.openregister=function(shopId) {
    window.location.href="#/register";
    };
  $scope.Member = {};
  $scope.dologin=function (){
      MemberService.doLogin($scope.Member).then(function(data){
        var code=data.code;
        if(code==0){
          MemberService.setMember(data.result);
        var alertPopup = $ionicPopup.alert({
                   title: '登录成功！',
                   template: '返回个人中心！'
                 });
                 alertPopup.then(function(res) {
                   window.location.href="#/tab/member";
                 });
               };
        }, function(data){
        alert(data);
        })

  }

})

.controller('RegisterCtrl', function($scope,$ionicPopup, MemberService) {
   $scope.closeregister= function() {
    window.history.go(-1);
  };
  $scope.formMember = {};

  $scope.submitForm=function (){
      MemberService.doReg($scope.formMember).then(function(data){
        var code=data.code;
        if(code==0){
        var alertPopup = $ionicPopup.alert({
                   title: '注册成功！',
                   template: '注册成功，点击确定跳转登录页面'
                 });
                 alertPopup.then(function(res) {
                   window.location.href="#/login";
                 });
               };
        }, function(data){
        alert(data);
        })
  };

   $scope.openregister=function(shopId) {
      $scope.registermodal.show();
    };

})

.controller('HomeCtrl', function($scope,Friends) {
    $scope.back=function() {
      window.location.href="#/tab/dash";
    };
      $scope.friends  = Friends.all();

})


.controller('SettingCtrl', function($scope,Friends) {
})

;



  