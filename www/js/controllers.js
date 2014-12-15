angular.module('starter.controllers', [])

//主页 商铺 商品详情等controller  开始位置
.controller('IndexCtrl', function($scope, $ionicModal,$ionicPopover,$ionicBackdrop,Location,IndexService,Shops) {
    $scope.location="定位中";
  if(Location.getCityName()){
   $scope.location=Location.getCityName();
  }else{
      var geolocation = new BMap.Geolocation();
        geolocation.getCurrentPosition(function(r){
      if(this.getStatus() == BMAP_STATUS_SUCCESS){
        var geoc = new BMap.Geocoder();    
        geoc.getLocation(r.point, function(rs){
        var addComp = rs.addressComponents;
        $scope.location=addComp.city;
        Location.setCityName(addComp.city);
        $scope.areaName=addComp.district;
        Location.setAreaName(addComp.district);
       });     
      }
    else {
      $scope.location='定位失败';
    }        
     },{enableHighAccuracy: true})
  }
$scope.menus=IndexService.get();

$scope.areaName=Location.getAreaName();
//分享
 $ionicPopover.fromTemplateUrl('templates/region.html', {
    scope: $scope,
  }).then(function(region) {
    $scope.region = region;
    });
  $scope.getRegions = function($event) {
      $scope.region.show($event);
     Location.getAreas($scope.location).then(function(data){
        $scope.regionoptions =data.result;
      }, function(data){
        console.log(data);
      });
  };

  $scope.showShops = function(categoryId) {
    if(categoryId==15){
      return;
    }
    window.location.href="#/shops/"+categoryId;
  };
 $scope.chosecity = function() {
    $scope.region.hide();
    window.location.href="#/citys";
  };


  $scope.refrshindexbycity = function(areaName,id) {
    $scope.region.hide();
      Location.setAreaId(id);
      $scope.areaName=areaName;
      Location.setAreaName(areaName);
      Shops.getShops(id).then(function(data){
          $scope.shops=data.result;
        }, function(data){
          console.log(data);
        });
  }

  
})



.controller('ShopsCtrl', function($scope,$stateParams,Shops,LocalData,Location) {
   $scope.categoryId=$stateParams.categoryId;
   var shopparam=new Object();
   if(Location.getAreaId()){
   shopparam.areaId=Location.getAreaId();
    }
   if(Location.getCityName()){
    shopparam.cityName=Location.getCityName();
    }else{
        Location.getLocation().then(function(data){
          shopparam.cityName=Location.getCityName();
          }, function(data){
            console.log(data);
          });
    }




    
   shopparam.categoryId=$stateParams.categoryId;
    Shops.getcategorys($stateParams.categoryId).then(function(data){
        $scope.categorys = data.result;
          Shops.getShops(shopparam).then(function(data){
             $scope.shops = data.result;
          }, function(data){
            console.log(data);
          });
      }, function(data){
        console.log(data);
      });
    
    LocalData.setshopcargory($stateParams.categoryId);

    $scope.refreshshops= function(categoryId) {
      shopparam.categoryId=categoryId;
      Shops.getShops(shopparam).then(function(data){
             $scope.shops = data.result;
          }, function(data){
            console.log(data);
          });
    };

    $scope.backtoIndex = function() {
      window.location.href="#/tab/dash";
    };


})

.controller('CitysCtrl', function($scope,$ionicScrollDelegate,LocalData,Location) {
 Location.getLocation().then(function(data){
          $scope.realLocation=data.content.address_detail.city;
        }, function(data){
          console.log(data);
  });



      Location.getCitys(1).then(function(data){
        $scope.categorys = data.result;
           Location.getCitys(data.result[0].id).then(function(data){
             $scope.citys = data.result;
          }, function(data){
            console.log(data);
          });
      }, function(data){
        console.log(data);
      });

$scope.refreshCitys =function(cityId) {
       Location.getCitys(cityId).then(function(data){
            $scope.citys = data.result;
           $ionicScrollDelegate.scrollTop();
          }, function(data){
            console.log(data);
          });
    };
$scope.chosethisCity=function(cityName) {
      Location.setCityName(cityName);
      Location.clearAreaName();
      window.location.href="#/tab/dash";
}

    $scope.backtoIndex = function() {
      window.location.href="#/tab/dash";
    };


})

.controller('ShopdetailCtrl', function($scope,$ionicPopover,$stateParams,Shopdetail,Shops,LocalData) {
  var shopId=$stateParams.shopId

//商铺详情的获取
  // Shops.getShopDetail().then(function(data){
  //       $scope.shop=data.result;
  //     }, function(data){
  //       console.log(data);
  //     })
      Shops.getShopDetail(shopId).then(function(data){
        $scope.shopinfo=data.result;
        LocalData.setshop(data.result);
      }, function(data){
        console.log(data);
      });

  Shops.getShopProducts(shopId).then(function(data){
        $scope.products=data.result;
      }, function(data){
        console.log(data);
      })

  $scope.closedetails= function() {
   window.location.href="#/shops/"+LocalData.getshopcargory();
  };


  $scope.showProductDetail=function(productId) {
   window.location.href="#/product/"+productId;
  };

   $scope.shoptoPay=function(productId) {
   window.location.href="#/shoptopay/"+shopId;
  };


  $scope.SharePage = function() {
    try{
    window.plugins.socialsharing.share('我在使用新商店购物，获取新商币，购物更便利', null, null, 'http://admin.o2o2m.com/app/download?appcode=xsd');
    }catch(err){
    };
  }

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


.controller('ProductCtrl', function($scope,$stateParams,Shops,LocalData) {
var productId=$stateParams.productId;
 Shops.getProductdetail(productId).then(function(data){
        $scope.product=data.result;
        LocalData.setproduct(data.result);
      }, function(data){
        console.log(data);
      })
  $scope.closeProductDetail=function(){
   window.location.href="#/shopdetail/"+LocalData.getshop().shop.id;
  };
 $scope.topaypage=function(){
   window.location.href="#/topay/"+productId;
  };


})




.controller('ToPayCtrl', function($scope,$stateParams,$ionicPopup,LocalData,Shops,MemberService) {
  $scope.date=new Date();
  $scope.payinfo= {};
var productId=$stateParams.productId;

     Shops.getProductdetail(productId).then(function(data){
        $scope.product=data.result;
        LocalData.setproduct(data.result);
        loadshop();
      }, function(data){
        console.log(data);
      })
if(MemberService.getMember()){
  $scope.member=MemberService.getMember();
      Shops.getUserblance($scope.member.id).then(function(data){
        $scope.memberblance=data.result;
      }, function(data){
        console.log(data);
      })
}else{
  LocalData.setrediretfromUrl("#/topay/"+productId);
  window.location.href="#/login";

}



function loadshop(){
if(LocalData.getshop()){
      $scope.shopinfo=LocalData.getshop();
  }else{
      Shops.getShopDetail(LocalData.getproduct().product.shopId).then(function(data){
        $scope.shopinfo=data.result;
        LocalData.setshop(data.result);
      }, function(data){
        console.log(data);
      })

  }

};

$scope.submitpayinfo=function () {
  $scope.payinfo.userName=$scope.member.userName;
  $scope.payinfo.shopId=$scope.shopinfo.shop.id;

    Shops.pay($scope.payinfo).then(function(data){
        var code=data.code;
            if(code==0){
              MemberService.setMember(data.result);
              var alertPopup = $ionicPopup.alert({
                       title: '支付成功！',
                       template: '返回店铺页面！'
                     });
                     alertPopup.then(function(res) {
                       window.location.href="#/shopdetail/"+$scope.shopinfo.shop.id;
                      });
            }else if(code==-5){
              MemberService.setMember(data.result);
              var alertPopup = $ionicPopup.alert({
                       title: '余额不足！',
                       template: '请重新输入金额！'
                     });
                     alertPopup.then(function(res) {
                      });
            };
        }, function(data){
        console.log(data);
        })
}


$scope.product=LocalData.getproduct();
  $scope.back=function(){
   window.location.href="#/product/"+productId;
  };

})






.controller('ShoptoPayCtrl', function($scope,$stateParams,$ionicPopup,LocalData,Shops,MemberService) {
  $scope.date=new Date();
  $scope.payinfo= {};
var shopId=$stateParams.shopId;
Shops.getShopDetail(shopId).then(function(data){
        $scope.shopinfo=data.result;
        LocalData.setshop(data.result);
      }, function(data){
        console.log(data);
      })

if(MemberService.getMember()){
  $scope.member=MemberService.getMember();
      Shops.getUserblance($scope.member.id).then(function(data){
        $scope.memberblance=data.result;
      }, function(data){
        console.log(data);
      })
}else{
  LocalData.setrediretfromUrl("#/shopdetail/"+shopId);
  window.location.href="#/login";

}

$scope.submitpayinfo=function () {
  $scope.payinfo.userName=$scope.member.userName;
  $scope.payinfo.shopId=$scope.shopinfo.shop.id;

    Shops.pay($scope.payinfo).then(function(data){
        var code=data.code;
            if(code==0){
              MemberService.setMember(data.result);
              var alertPopup = $ionicPopup.alert({
                       title: '支付成功！',
                       template: '返回店铺页面！'
                     });
                     alertPopup.then(function(res) {
                       window.location.href="#/shopdetail/"+$scope.shopinfo.shop.id;
                      });
            }else if(code==-5){
              MemberService.setMember(data.result);
              var alertPopup = $ionicPopup.alert({
                       title: '余额不足！',
                       template: '请重新输入金额！'
                     });
                     alertPopup.then(function(res) {
                      });
            };
        }, function(data){
        console.log(data);
        })
}


  $scope.back=function(){
   window.location.href="#/shopdetail/"+shopId;
  };

})
//主页 商铺 商品详情等controller  结束位置



//附近页面的controller
.controller('NearByCtrl', function($scope,Friends) {
   Friends.jsonp().then(function(data){
        $scope.friends=data;
      }, function(data){
        console.log(data);
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
    console.log(friends);
  };


  //方案二 可行 请求可以写在外面。
  //Show a backdrop for one second
  $scope.Controller = function() {
    try{
    window.plugins.socialsharing.share('Message and link', null, null, 'http://www.x-services.nl');
    }catch(err){
      console.log(err);
    }
  };

  //方案三 失败
  var friendsThree;
   $scope.FactoryTwo = function() {
    Location.getAreas("杭州市").then(function(data){
        console.log(JSON.stringify(data));
      }, function(data){
        console.log(data);
      })
  };


})

//会员页面的controller
.controller('MemberCtrl', function($scope, $ionicPopup,$ionicModal,MemberService,LocalData) {
 $scope.openlogin=function(shopId) {
    if(MemberService.getMember()){
             var confirmPopup = $ionicPopup.confirm({
                   title: '您已经登录',
                   template: '是否退出登录?'
                 }).then(function(res) {
                   if(res) {
                     MemberService.quitLogin();
                     window.location.reload();
                   } else {
                   }
                 });
    }else{
      LocalData.setrediretfromUrl("#/tab/member");
      window.location.href="#/login";
    }
  };

$scope.quitlogin=function(shopId) {
    if(MemberService.getMember()){
             var confirmPopup = $ionicPopup.confirm({
                   title: '您已经登录',
                   template: '是否退出登录?'
                 }).then(function(res) {
                   if(res) {
                     MemberService.quitLogin();
                     window.location.reload();
                   } else {
                   }
                 });
    }
  };



$scope.Member =MemberService.getMember();
$scope.tomydollarpage=function (){
   if(MemberService.getMember()){
     window.location.href="#/mydollar/"+MemberService.getMember().id;
   }else{
      LocalData.setrediretfromUrl("#/tab/member");
      window.location.href="#/login";
   }

}


})

.controller('MydollarCtrl', function($scope,$stateParams,Shops,MemberService) {
  var memberId=$stateParams.memberId;
$scope.backtoMemberpage=function (){
window.location.href="#/tab/member";
  
}
 Shops.getUserblance(memberId).then(function(data){
        $scope.memberblance=data.result;
      }, function(data){
        console.log(data);
      })
 MemberService.getRecord(memberId).then(function(data){
        $scope.Recodes=data.result;
      }, function(data){
        console.log(data);
      })
})

//会员页面的controller
.controller('LoginCtrl', function($scope, $ionicModal,$ionicPopup, MemberService,LocalData) {
   $scope.closelogin= function() {
    window.location.href=LocalData.getrediretfromUrl();
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
                   template: '返回登录前页面！'
                 });
                 alertPopup.then(function(res) {
                   window.location.href=LocalData.getrediretfromUrl();
                 });
               };
        }, function(data){
          console.log(data);
        })

  }

})

.controller('RegisterCtrl', function($scope,$ionicPopup, MemberService) {
   $scope.closeregister= function() {
    window.history.go(-1);
  };

  $scope.formMember = {};

  $scope.getactivecode= function() {
    MemberService.getCode($scope.formMember.userName).then(function(data){
        var code=data.code;
        if(code==0){
        var alertPopup = $ionicPopup.alert({
                   title: '已发送验证码',
                   template: '验证码会在一分钟之内发送到您的手机.'
                 });
                 alertPopup.then(function(res) {
                 });
               };
        }, function(data){
        console.log(data);
        })
  };


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
        console.log(data);
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



  