angular.module('starter.controllers', [])

//主页 商铺 商品详情等controller  开始位置
.controller('IndexCtrl', function($scope, $ionicModal,$ionicPopover,$ionicSlideBoxDelegate,$ionicBackdrop,Location,IndexService,AdService,Shops,Markets,Session) { 
    var marketParam1=new Object();
    var marketParam2=new Object();
    $scope.busy = false;
    $scope.page = 1;
    $scope.rows = 10;
    $scope.pages = 1; 
    $scope.location = Location.getCityName();
    $scope.areaName = Location.getAreaName(); 
    if(Session.getLocationMode() !=0){
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
          Location.getAreaIdByCityArea(addComp.city,addComp.district).then(function(data){
          Location.setAreaId(data.result);
          marketParam1.page = $scope.page;
          marketParam1.rows = 6;
          marketParam1.cityId = Location.getAreaId();
          marketParam1.type = 0;
          Markets.getMarkets(marketParam1).then(function(data){
            if(JSON.stringify(data.result.data)=='[]'){
               $scope.marketData = Markets.markets1();
            }else{
               $scope.marketData = data.result.data;
            }
          }, function(data){
            console.log(data);
          });
          marketParam2.page = $scope.page;
          marketParam2.rows = 6;
          marketParam2.cityId = Location.getAreaId();
          marketParam2.type = 1;
          Markets.getMarkets(marketParam2).then(function(data){
            if(JSON.stringify(data.result.data)=='[]'){
               $scope.marketData1 = Markets.markets2();
            }else{
               $scope.marketData1 = data.result.data;
            }
          }, function(data){
          });
        }, function(data){
        });
       });   
      }else{
          alert('failed'+this.getStatus());
      }   
    },{enableHighAccuracy: true})
  }else{
    Location.getAreaIdByCityArea($scope.location,$scope.areaName).then(function(data){
          Location.setAreaId(data.result);
        }, function(data){
        });
  }

$scope.menus=IndexService.get();

$scope.areaName=Location.getAreaName();

if(!IndexService.isLoded()){
AdService.getAds().then(function(data){
  $scope.ads=data.result;
        $ionicSlideBoxDelegate.update();
      }, function(data){
}); 
}

 marketParam1.page = $scope.page;
          marketParam1.rows = 6;
          marketParam1.cityId = Location.getAreaId();
          marketParam1.type = 0;
          Markets.getMarkets(marketParam1).then(function(data){
            if(JSON.stringify(data.result.data)=='[]'){
               $scope.marketData = Markets.markets1();
            }else{
               $scope.marketData = data.result.data;
            }
          }, function(data){
          });
          marketParam2.page = $scope.page;
          marketParam2.rows = 6;
          marketParam2.cityId = Location.getAreaId();
          marketParam2.type = 1;
          Markets.getMarkets(marketParam2).then(function(data){
            if(JSON.stringify(data.result.data)=='[]'){
               $scope.marketData1 = Markets.markets2();
            }else{
               $scope.marketData1 = data.result.data;
            }
          }, function(data){
          });
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
      });
  };

  $scope.showShops = function(categoryId) {
    Session.clearLocationMode();
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
        });
      marketParam1.cityId = Location.getAreaId();
      Markets.getMarkets(marketParam1).then(function(data){
        if(JSON.stringify(data.result.data)=='[]'){
           $scope.marketData = Markets.markets1();
        }else{
           $scope.marketData = data.result.data;
        }
      }, function(data){
      });
      marketParam2.cityId = Location.getAreaId();
      Markets.getMarkets(marketParam2).then(function(data){
        if(JSON.stringify(data.result.data)=='[]'){
           $scope.marketData1 = Markets.markets2();
        }else{
           $scope.marketData1 = data.result.data;
        }
      }, function(data){
      });

  };
  $scope.goMarket = function(marketId){
    window.location.href = "#/market/"+marketId;
  };

  
})

.controller('MarketCtrl', function($scope,$ionicPopup,$stateParams,Markets,LocalData,Location) {
  var marketParam = new Object();
  $scope.busy = false;
  $scope.page = 1;
  $scope.rows = 10;
  $scope.pages = 1;
  $scope.marketId=$stateParams.marketId;
  $scope.marketCategorys = Markets.marketCategory();
  Markets.getMarketsById($scope.marketId).then(function(data){
             $scope.market = data.result;
          }, function(data){
          console.log(data);
          });
  marketParam.id = $scope.marketId;
  marketParam.page = $scope.page;
  marketParam.rows = $scope.rows;
  Markets.getShopByMarket(marketParam).then(function(data){
  $scope.marketShops = data.result.data;
  $scope.pages = data.result.totalPages;
    
  });
   $scope.loadMore = function() {
    if ($scope.page < $scope.pages) {
      $scope.page++;
      if ($scope.busy) {
        return false;
      }
      $scope.busy = true;
      marketParam.page = $scope.page;
      Markets.getShopByMarket(marketParam).then(function(data){
             $scope.busy = false;
              for (var i in data.result.result) {
                $scope.marketShops.push(data.result.result[i]);
              }
              $scope.$broadcast('scroll.infiniteScrollComplete');
          }, function(data){
          console.log(data);
          });
      
    }else{
      $scope.$broadcast('scroll.infiniteScrollComplete');
    }
  };
  $scope.backtoIndex = function() {
      window.location.href="#/tab/dash";
  };
  $scope.gotoshop= function(shopid) {
    LocalData.setreserveRediretfromUrl("#/market/"+$stateParams.marketId);
    window.location.href="#/shopdetail/"+shopid;
  };

})

.controller('MarketsCtrl', function($scope,$ionicPopup,$stateParams,Markets,LocalData,Location) {
  var type = $stateParams.markettype;
  if(type==0){
    $scope.title = "本地市场";
  }else if(type==1){
    $scope.title = "本地商场";
  }
  var marketParam = new Object();
  $scope.busy = false;
  $scope.page = 1;
  $scope.rows = 10;
  $scope.pages = 1;
  marketParam.page = $scope.page;
  marketParam.rows = $scope.rows;
  marketParam.cityId = Location.getAreaId();
  marketParam.type = type;
  Markets.getMarkets(marketParam).then(function(data){
    if(JSON.stringify(data.result.data)=='[]'){
       $scope.marketData = Markets.markets1();
    }else{
       $scope.marketData = data.result.data;
    }
  }, function(data){
    console.log(data);
  });
   $scope.loadMore = function() {
    if ($scope.page < $scope.pages) {
      $scope.page++;
      if ($scope.busy) {
        return false;
      }
      $scope.busy = true;
      marketParam.page = $scope.page;
      Markets.getShopByMarket(marketParam).then(function(data){
             $scope.busy = false;
              for (var i in data.result.result) {
                $scope.marketShops.push(data.result.result[i]);
              }
              $scope.$broadcast('scroll.infiniteScrollComplete');
          }, function(data){
          console.log(data);
          });
      
    }else{
      $scope.$broadcast('scroll.infiniteScrollComplete');
    }
  };
  $scope.backtoIndex = function() {
      window.location.href="#/tab/dash";
  };
  $scope.gotoshop= function(shopid) {
    LocalData.setreserveRediretfromUrl("#/market/"+$stateParams.marketId);
    window.location.href="#/shopdetail/"+shopid;
  };

})

.controller('ShopsCtrl', function($scope,$timeout,$ionicScrollDelegate,$stateParams,Shops,LocalData,Location,Session) {
  var height=window.innerHeight?window.innerHeight-180:500;
  $scope.leftstyle = {width:'33%',height:height+'px'};
  $scope.rightstyle = {width:'67%',height:height+'px'};
  $scope.categoryId=$stateParams.categoryId;
   var shopparam=new Object();
   $scope.busy = false;
   $scope.currentPage = 0;
   $scope.pages = 0;
   if(Location.getAreaId()){
   shopparam.cityId=Location.getAreaId();
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
   if(Session.getBackMode()==0){
      $scope.categorys = Session.getCategorys();
      $scope.shops = Session.getShops();
      $timeout(function(){
        $ionicScrollDelegate.$getByHandle('shopsScroll').scrollTo(0,Session.getScrollRightHeight(),false);
      },100);
      
      Session.clearBackMode();
   }else{
     shopparam.categoryId=$stateParams.categoryId;
     Shops.getcategorys($stateParams.categoryId).then(function(data){
        if ($scope.busy) {
              return false;
        }
        $scope.busy = true;
        $scope.categorys = data.result;
        Session.setCategorys($scope.categorys);
          Shops.getShops(shopparam).then(function(data){
             $scope.busy = false;
             $scope.shops = data.result.result;
             Session.setShops($scope.shops);
             $scope.pages = data.result.totalPages;
          }, function(data){
          console.log(data);
          });
      }, function(data){
          console.log(data);
      });
   }
    LocalData.setshopcargory($stateParams.categoryId);
    //分页函数
    $scope.loadMore = function() {
    if ($scope.currentPage < $scope.pages) {
      $scope.currentPage++;
      if ($scope.busy) {
        return false;
      }
      $scope.busy = true;
      shopparam.pageIndex = $scope.currentPage;
       Shops.getShops(shopparam).then(function(data){
             $scope.busy = false;
              for (var i in data.result.result) {
                $scope.shops.push(data.result.result[i]);
              }
              Session.setShops($scope.shops);
              $scope.$broadcast('scroll.infiniteScrollComplete');
          }, function(data){
          console.log(data);
          });
      
    }else{
      $scope.$broadcast('scroll.infiniteScrollComplete');
    }
  };
    $scope.refreshshops= function(categoryId) {
       $scope.currentPage = 0;
       $scope.pages = 0;
      shopparam.pageIndex = $scope.currentPage;
      shopparam.categoryId=categoryId;
      Shops.getShops(shopparam).then(function(data){
             $scope.shops = data.result.result;
             $scope.pages = data.result.totalPages;
             Session.setShops($scope.shops);
             $ionicScrollDelegate.$getByHandle('shopsScroll').scrollTop();
          }, function(data){
          console.log(data);
          });
    };

    $scope.backtoIndex = function() {
      Session.setLocationMode(0);
      window.location.href="#/tab/dash";
    };
    $scope.gotoshop= function(shopid) {
      var scrollRightHeight = $ionicScrollDelegate.$getByHandle('shopsScroll').getScrollPosition().top;
      Session.setScrollRightHeight(scrollRightHeight);
      LocalData.setreserveRediretfromUrl("#/shops/"+$stateParams.categoryId)
      window.location.href="#/shopdetail/"+shopid;
    };
})

.controller('CitysCtrl', function($scope,$ionicScrollDelegate,LocalData,Location,Session) {
  var height=window.innerHeight?window.innerHeight-180:500;
  $scope.cityName = "北京市";
  $scope.leftstyle = {height:height+'px'};
 Location.getLocation().then(function(data){
          $scope.realLocation=data.content.address_detail.city;
        }, function(data){
          console.log(data);
  });



      Location.getCitys(1).then(function(data){
        $scope.categorys = data.result;
           Location.getCitys(data.result[0].id).then(function(data){
             $scope.citys = data.result;
             Location.getAreas(data.result[0].name).then(function(data){
             $scope.areas = data.result;
             },function(data){
          console.log(data);
            });
          }, function(data){
          console.log(data);
          });
      }, function(data){
          console.log(data);
      });

$scope.refreshCitys =function(cityId) {
       Location.getCitys(cityId).then(function(data){
            $scope.citys = data.result;
            $scope.cityName = data.result[0].name;
            Location.setCityName(data.result[0].name);
            Session.setLocationMode(0);
            Location.getAreas(data.result[0].name).then(function(data){
             $scope.areas = data.result;
             Location.setAreaName(data.result[0].name);
             Location.setAreaId(data.result[0].id);
             },function(data){
          console.log(data);
            });
           $ionicScrollDelegate.scrollTop();
          }, function(data){
          console.log(data);
          });
    };
$scope.refreshAreas = function(cityName){
  $scope.cityName = cityName;
  Location.setCityName(cityName);
  Location.getAreas(cityName).then(function(data){
            $scope.areas = data.result;
            Location.setAreaName(data.result[0].name);
            Location.setAreaId(data.result[0].id);
            Session.setLocationMode(0);
           $ionicScrollDelegate.scrollTop();
          }, function(data){
          console.log(data);
          });
}
$scope.chosethisArea=function(areaName,areaId) {
      Location.setCityName($scope.cityName); 
      Location.setAreaId(areaId);
      Location.setAreaName(areaName);
      Session.setLocationMode(0);
      window.location.href="#/tab/dash";
}
$scope.autoLocation=function(){
  Session.setLocationMode(1);
  window.location.href="#/tab/dash";
}
$scope.backtoIndex = function() {
  window.location.href="#/tab/dash";
};


})

.controller('ShopdetailCtrl', function($scope,$ionicPopover,$stateParams,Shopdetail,Shops,LocalData,Session) {
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
    Session.setBackMode(0);
    window.location.href=LocalData.getreserveRediretfromUrl();
  };


  $scope.showProductDetail=function(productId) {
   window.location.href="#/product/"+productId;
  };

   $scope.shoptoPay=function(productId) {
   window.location.href="#/shoptopay/"+shopId;
  };


  $scope.SharePage = function() {
    try{
    window.plugins.socialsharing.share('我在使用新商店购物，获取新商币，购物更便利', null, null, 'http://app.53xsd.com/#/shopdetail/'+shopId);
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


.controller('ProductCtrl', function($scope,$stateParams,$ionicSlideBoxDelegate,$sce,Shops,LocalData) {
var productId=$stateParams.productId;
$scope.shopId = 0;
 Shops.getProductdetail(productId).then(function(data){
        $scope.product=data.result;
        $scope.shopId = data.result.product.shopId;
          Shops.getRecProduct($scope.shopId).then(function(data){
            $scope.recproducts=data.result;
          }, function(data){
          console.log(data);
          })
        $ionicSlideBoxDelegate.update();
        LocalData.setproduct(data.result);
        $scope.deliberatelyTrustDangerousSnippet = function() {  
        return $sce.trustAsHtml($scope.product.productText.text);  
        };  
      }, function(data){
          console.log(data);
      })
 
 $scope.showProductDetail=function(productId) {
   window.location.href="#/product/"+productId;
  };
  $scope.closeProductDetail=function(){
   window.location.href="#/shopdetail/"+LocalData.getshop().shop.id;
  };
 $scope.topaypage=function(){
   window.location.href="#/topay/"+productId;
  };

  


})




.controller('ToPayCtrl', function($scope,$stateParams,$ionicPopup,LocalData,Shops,MemberService) {
  $scope.date=new Date();
  $scope.balance = 0;
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
        $scope.balance = data.result.balance;
      }, function(data){
          console.log(data);
      })
}else{
  LocalData.setrediretfromUrl("#/product/"+productId);
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
   if($scope.balance==0){
       var alertPopup = $ionicPopup.alert({
         title: '余额不足！',
         template: '抱歉,余额不能为零！'
       });
      return;
  }


    if($scope.payinfo.amount==0){
       var alertPopup = $ionicPopup.alert({
         title: '付款额错误！',
         template: '付款额不能为零！'
       });
      return;
  }

  $scope.payinfo.userName=$scope.member.userName;
  $scope.payinfo.shopId=$scope.shopinfo.shop.id;

    Shops.pay($scope.payinfo).then(function(data){
        var code=data.code;
            if(code==0){
              var alertPopup = $ionicPopup.alert({
                       title: '支付成功！',
                       template: '返回店铺页面！'
                     });
                     alertPopup.then(function(res) {
                       window.location.href="#/shopdetail/"+$scope.shopinfo.shop.id;
                      });
            }else if(code==-5){
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
  var judge = true;
  $scope.date=new Date();
  $scope.payinfo= {};
  $scope.balance = 0;
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
        $scope.balance = data.result.balance;
      }, function(data){
          console.log(data);
      })
}else{
  LocalData.setrediretfromUrl("#/shopdetail/"+shopId);
  window.location.href="#/login";

}

$scope.submitpayinfo=function () {
   if($scope.balance==0){
       var alertPopup = $ionicPopup.alert({
         title: '余额不足！',
         template: '抱歉,余额不能为零！'
       });
      return;
  }


    if($scope.payinfo.amount==0){
       var alertPopup = $ionicPopup.alert({
         title: '付款额错误！',
         template: '付款额不能为零！'
       });
      return;
  }

  $scope.payinfo.userName=$scope.member.userName;
  $scope.payinfo.shopId=$scope.shopinfo.shop.id;

    Shops.pay($scope.payinfo).then(function(data){
        var code=data.code;
            if(code==0){
              var alertPopup = $ionicPopup.alert({
                       title: '支付成功！',
                       template: '返回店铺页面！'
                     });
                     alertPopup.then(function(res) {
                       window.location.href="#/shopdetail/"+$scope.shopinfo.shop.id;
                      });
            }else if(code==-5){
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
// .controller('NearByCtrl', function($scope,Friends) {
//    Friends.jsonp().then(function(data){
//         $scope.friends=data;
//       }, function(data){
//         console.log(data);
//       })
// })
.controller('NearByCtrl', function($scope,$ionicPopup,$ionicLoading,Shops,Location,IndexService,LocalData,Session) { 
  $scope.location = Location.getCityName();
  $scope.areaName = Location.getAreaName();  
  $scope.menus=IndexService.get();
  if(Session.getBackMode()==0){
    $scope.nearbyShops=Session.getNearbyShops();
    Session.clearLocationMode();
  }else{
   $ionicLoading.show({
    template:'定位中',
    noBackdrop :false,
  });
  var pointParam = new Object();
  var geolocation = new BMap.Geolocation(); 
  geolocation.getCurrentPosition(function(r){
    if(this.getStatus() == BMAP_STATUS_SUCCESS){
        var geoc = new BMap.Geocoder();
        geoc.getLocation(r.point, function(rs){
        var addComp = rs.addressComponents;
        $scope.location=addComp.city;
        $scope.areaName=addComp.district;
        //cityId 区ID categoryId为0表示全部
        Location.setLatitude(r.point.lat);
        Location.setLongitude(r.point.lng);
        pointParam.latitude = r.point.lat;
        pointParam.longitude = r.point.lng;
        pointParam.categoryId = 0; 
        $ionicLoading.show({
          template:'正在加载'
        });
        Shops.getNearbyShops(pointParam).then(function(data){
          if(JSON.stringify(data.result)=='[]'){
             $ionicLoading.hide();
             var alertPopup = $ionicPopup.alert({
                   title: '附近店铺',
                   okText: '确定',
                   template: '抱歉,10公里以内没有店铺！'
                 });
          }else{
            $scope.nearbyShops=data.result;
            Session.setNearbyShops($scope.nearbyShops);
            $ionicLoading.hide();
          }
          }, function(data){
            $ionicLoading.hide();
            console.log(data);
        });
    });   
    }else{
      alert('failed'+this.getStatus());
    }
     
    },{enableHighAccuracy: true});
  } 
$scope.gotoshop= function(shopid) {
  LocalData.setreserveRediretfromUrl("#/tab/nearby");
  window.location.href="#/shopdetail/"+shopid;
};
  //categoryId为0表示全部
  $scope.showNearbyByCategoryId = function(categoryId){
    pointParam.latitude = Location.getLongitude();
    pointParam.longitude = Location.getLatitude();
    pointParam.categoryId = categoryId;
    Shops.getNearbyShops(pointParam).then(function(data){
          $scope.nearbyShops=data.result;
        }, function(data){
          $ionicLoading.hide();
          console.log(data);
        })
  };
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
  $scope.opensetting=function(){
         if(MemberService.getMember()){
           window.location.href="#/setting";
         }else{
            LocalData.setrediretfromUrl("#/tab/member");
            window.location.href="#/login";
         }
  };
  $scope.tomystore=function(){
         if(MemberService.getMember()){
           window.location.href="#/mystore";
         }else{
            LocalData.setrediretfromUrl("#/tab/member");
            window.location.href="#/login";
         }
  };
  $scope.tomyrecommend=function(){
         if(MemberService.getMember()){
           window.location.href="#/myrecommend";
         }else{
            LocalData.setrediretfromUrl("#/tab/member");
            window.location.href="#/login";
         }
  };
 $scope.toMyprofile=function(){
       if(MemberService.getMember()){
           window.location.href="/#/myprofile";
         }else{
            LocalData.setrediretfromUrl("#/tab/member");
            window.location.href="#/login";
         }
 };
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

.controller('MystoreCtrl', function($scope) {
  $scope.hide1 ="";
  $scope.hide2 ="hide";
  $scope.assertive1 = "button-assertive";
  $scope.assertive2 = "";
  $scope.backtoMember = function(){
    window.location.href="#/tab/member";
  }
  $scope.getStoreShop = function(){
    $scope.hide1 = "";
    $scope.hide2 ="hide";
    $scope.assertive1 = "button-assertive";
    $scope.assertive2 = "";
  }
  $scope.getStoreProduct = function(){
    $scope.hide1 = "hide"
    $scope.hide2 = "";
    $scope.assertive1 = "";
    $scope.assertive2 = "button-assertive"
  }
  
})

.controller('MyrecommendCtrl', function($scope) {
  $scope.backtoMember = function(){
    window.location.href="#/tab/member";
  }
})

.controller('RecommendMemCtrl', function($scope) {
  $scope.backtoRecommend = function(){
    window.location.href="#/myrecommend";
  }
})

.controller('RecommendPerCtrl', function($scope) {
  $scope.backtoRecommend = function(){
    window.location.href="#/myrecommend";
  }
})

.controller('MyprofileCtrl', function($scope,MemberService) {
 $scope.Myprofile =MemberService.getMember();

  $scope.backtomemberpage = function(){
    window.location.href="#/tab/member";
  }
})

.controller('MydollarCtrl', function($scope,$stateParams,Shops,MemberService) {
  var height=window.innerHeight?window.innerHeight-120:500;
  $scope.liststyle = {height:height+'px'};
  var dollarParam=new Object();
  $scope.busy = false;
  $scope.pageNo = 0;
  $scope.pages = 0;
  var memberId=$stateParams.memberId;
  dollarParam.userId = memberId;
  dollarParam.userType =5;
  dollarParam.pageNo = 0;
$scope.backtoMemberpage=function (){
window.location.href="#/tab/member";
  
}
 Shops.getUserblance(memberId).then(function(data){
        $scope.memberblance=data.result;
      }, function(data){
        console.log(data);
      })
 MemberService.getRecordAsPage(dollarParam).then(function(data){
        $scope.Recodes=data.result.result;
        $scope.pages = data.result.totalPages;
      }, function(data){
        console.log(data);
      })
 $scope.loadMore = function(){
  if ($scope.pageNo < $scope.pages) {
      $scope.pageNo++;
      if ($scope.busy) {
        return false;
      }
      $scope.busy = true;
      dollarParam.pageNo = $scope.pageNo;
       MemberService.getRecordAsPage(dollarParam).then(function(data){
        $scope.busy = false;
        for (var i in data.result.result) {
          $scope.Recodes.push(data.result.result[i]);
        }
      }, function(data){
        console.log(data);
      })
    }else{
      $scope.$broadcast('scroll.infiniteScrollComplete');
    }
 }
})

//会员页面的controller
.controller('LoginCtrl', function($scope, $ionicModal,$ionicPopup, MemberService,LocalData) {
  var judge = true;
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

.controller('SetCtrl', function($scope, $ionicPopup,$ionicModal,MemberService,LocalData) {

$scope.backtoMemberpage=function() {
      window.location.href="#/tab/member";
 };
  $scope.quitlogin=function() {
    if(MemberService.getMember()){
             var confirmPopup = $ionicPopup.confirm({
                    title: '退出应用',
                    template: '你确定要退出应用吗?',
                    okText: '退出',
                    cancelText: '取消'
                 }).then(function(res) {
                   if(res) {
                     MemberService.quitLogin();
                     window.location.href="#/tab/member";
                   } else {
                   }
                 });
    }
  };

})
.controller('SettingCtrl', function($scope,Friends) {
})
;