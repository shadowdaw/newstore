var _url="http://admin.53xsd.com/mobi/";


angular.module('starter.services', [])

/**
 * All Data used for localx=cach.
 */
.factory('LocalData', function($http, $q) {
  var product;
  var order;
  var shopcargory;
  var shop;
  var rediretfromUrl;
  var reserveRediretfromUrl;
  return {    
    getproduct: function() {
      return product;
    },
    setproduct: function(data) {
      product=data;
    },
    getshopcargory: function() {
      return shopcargory?shopcargory:1;
    },
    setshopcargory: function(data) {
      shopcargory=data;
    },
    getshop: function() {
      return shop
    },
    setshop: function(data) {
      shop=data;
    },
    getrediretfromUrl: function() {
      return rediretfromUrl?rediretfromUrl:"#/tab/member";
    },
    setrediretfromUrl: function(data) {
      rediretfromUrl=data;
    },
    getreserveRediretfromUrl:function(){
      return reserveRediretfromUrl?reserveRediretfromUrl:"#/tab/member";
    },
    setreserveRediretfromUrl: function(data) {
      reserveRediretfromUrl=data;
    }
  }
})








.factory('Friends', function($http, $q) {
  var friends=new Array();
  friends.push(new friend(0,'Scruff McGruff'));
  friends.push(new friend(1,'Show Cai'));
    

    var three = [
    { id: 0, name: 'AAAA' },
    { id: 1, name: 'BBBB' },
    { id: 3, name: 'CCCC' }
  ];

  return {
    all: function() {
     return friends;
    },
    three: function() {
      return three;
    },
    httpget:function(){
      var friendNew;
      var httpReq2 = null;
      httpReq2 = new plugin.HttpRequest();
      httpReq2.get    ("http://pretty.o2o2m.com/cheshi/test", function(status, data) {
        friendNew=data;
      });
        return friendNew;
    },
    get: function(friendId) {
      // Simple index lookup
      return friends[friendId];
    },
    jsonp: function() {
      var deferred = $q.defer();
      $http({
        method: 'JSONP',
        url: 'http://pretty.o2o2m.com/cheshi/testjson?callbackName=JSON_CALLBACK'
      }).success(function(data){
        deferred.resolve(data);
      }).error(function(){
        deferred.reject('There was an error')
      })
      return deferred.promise;
    }
  }
})


.factory('Shops', function($http, $q) {
  var shops1 = [
    { id: 0, name: 'Phillip',distance:'8.5',postion:'西湖区银泰in77-B1',logo:'logo_01.png' },
    { id: 1, name: 'Elle.Homme',distance:'8.5',postion:'西湖区银泰in77-B1',logo:'logo_02.png' },
    { id: 2, name: 'H&M',distance:'8.5',postion:'西湖区银泰in77-B1',logo:'logo_03.png' },
    { id: 3, name: 'Mo&Co',distance:'8.5',postion:'西湖区银泰in77-B1',logo:'logo_04.png' },
    { id: 4, name: 'MaxMara',distance:'8.5',postion:'西湖区银泰in77-B1',logo:'logo_05.png' },
    { id: 5, name: 'ZARA',distance:'8.5',postion:'西湖区银泰in77-B1',logo:'logo_06.png' }
  ];

    var shops2 = [
    { id: 4, name: 'MaxMara',distance:'8.5',postion:'西湖区银泰in77-B1',logo:'logo_05.png' },
    { id: 2, name: 'ZARA',distance:'8.5',postion:'西湖区银泰in77-B1',logo:'logo_06.png' },
    { id: 0, name: 'Phillip',distance:'8.5',postion:'西湖区银泰in77-B1',logo:'logo_01.png' },
    { id: 5, name: 'Elle.Homme',distance:'8.5',postion:'西湖区银泰in77-B1',logo:'logo_02.png' },
    { id: 1, name: 'H&M',distance:'8.5',postion:'西湖区银泰in77-B1',logo:'logo_03.png' },
    { id: 3, name: 'Mo&Co',distance:'8.5',postion:'西湖区银泰in77-B1',logo:'logo_04.png' }
  ];

  var categorys = [
    { id: 0, name: '女装',logo:'lady.png',chosen:'lady_active.png'},
    { id: 1, name: '男装',logo:'man.png',chosen:'man_active.png' },
    { id: 2, name: '裤子',logo:'pants.png',chosen:'pants_active.png' },
    { id: 3, name: '家具',logo:'furniture.png' ,chosen:'furniture_active.png'},
    { id: 4, name: '配饰',logo:'ornament.png',chosen:'ornament_active.png' },
    { id: 5, name: '鞋子',logo:'shoes.png' ,chosen:'shoes_active.png'},
    { id: 6, name: '内衣',logo:'underwear.png',chosen:'underwear_active.png' },
    { id: 7, name: '包包',logo:'bag.png',chosen:'bag_active.png' }
  ];
  
  return {
    categorys: function() {
      return categorys;
    },
    one: function() {
      return shops1;
    },
    two: function() {
      return shops2;
    },
    get: function(friendId) {
      // Simple index lookup
      return friends[friendId];
    }, 
    getcategorys: function(id) {
      var deferred = $q.defer();
      $http({
        method: 'JSONP',
        url: _url+'getCategory?callbackName=JSON_CALLBACK&parentId='+id
      }).success(function(data){
        deferred.resolve(data);
      }).error(function(data,status){
        deferred.reject(status)
      })
      return deferred.promise;
    },
    getShops: function(data) {
      var deferred = $q.defer();
      $http({
        method: 'JSONP',
        params:data,
        url: _url+'getShops?callbackName=JSON_CALLBACK'
      }).success(function(data){
        deferred.resolve(data);
      }).error(function(data,status){
        deferred.reject(status)
      })
      return deferred.promise;
    },
    getShopsbyCity: function(id) {
      var deferred = $q.defer();
      $http({
        method: 'JSONP',
        url: _url+'getShopsByArea?callbackName=JSON_CALLBACK&cityId='+id
      }).success(function(data){
        deferred.resolve(data);
      }).error(function(data,status){
        deferred.reject(status)
      })
      return deferred.promise;
    },
    getShopProducts: function(id) {
      var deferred = $q.defer();
      $http({
        method: 'JSONP',
        url: _url+'getProductByShopId?callbackName=JSON_CALLBACK&shopId='+id
      }).success(function(data){
        deferred.resolve(data);
      }).error(function(data,status){
        deferred.reject(status)
      })
      return deferred.promise;
    },
    getShopDetail: function(id) {
      var deferred = $q.defer();
      $http({
        method: 'JSONP',
        url: _url+'getShopDetail?callbackName=JSON_CALLBACK&shopId='+id
      }).success(function(data){
        deferred.resolve(data);
      }).error(function(data,status){
        deferred.reject(status)
      })
      return deferred.promise;
    },
    getUserblance: function(id) {
      var deferred = $q.defer();
      $http({
        method: 'JSONP',
        url: _url+'getBalance?callbackName=JSON_CALLBACK&userId='+id
      }).success(function(data){
        deferred.resolve(data);
      }).error(function(data,status){
        deferred.reject(status)
      })
      return deferred.promise;
    },
    pay: function(data) {
       var deferred = $q.defer();
      $http({
        method: 'JSONP',
        params:data,
        url: 'http://admin.53xsd.com/trade/userPay?callbackName=JSON_CALLBACK'
      }).success(function(data){
        deferred.resolve(data);
      }).error(function(data,status){
        deferred.reject(status)
      })
      return deferred.promise;
    },
    getProductdetail: function(id) {
      var deferred = $q.defer();
      $http({
        method: 'JSONP',
        url: _url+'getProductDetail?callbackName=JSON_CALLBACK&productId='+id
      }).success(function(data){
        deferred.resolve(data);
      }).error(function(data,status){
        deferred.reject(status)
      })
      return deferred.promise;
    },
    getNearbyShops: function(point){
      var deferred = $q.defer();
      $http({
        method: 'JSONP',
        params:point,
        url: _url+'getNearbyShops?callbackName=JSON_CALLBACK'
      }).success(function(data){
        deferred.resolve(data);
      }).error(function(data,status){
        deferred.reject(status)
      })
      return deferred.promise;
    },
    getRecProduct: function(shopId){
       var deferred = $q.defer();
      $http({
        method: 'JSONP',
        url: _url+'getRecProduct?callbackName=JSON_CALLBACK&shopId='+shopId
      }).success(function(data){
        deferred.resolve(data);
      }).error(function(data,status){
        deferred.reject(status)
      })
      return deferred.promise;
    }
  }
})

.factory('Markets', function($http, $q) {
  var markets1 = [
    { id: 0, name: '菜市场',logo:'img/temp/pic1.png' },
    { id: 0, name: '灯具市场',logo:'img/temp/pic2.png' },
    { id: 0, name: '电器市场',logo:'img/temp/pic3.png' },
    { id: 0, name: '家居市场',logo:'img/temp/pic4.png' },
    { id: 0, name: '建材市场',logo:'img/temp/pic5.png' },
    { id: 0, name: '数码市场',logo:'img/temp/pic6.png' }
  ];
   var markets2 = [
    { id: 0, name: '万达广场',logo:'img/temp/sc1.png' },
    { id: 0, name: '沃尔玛',logo:'img/temp/sc2.png' },
    { id: 0, name: '家乐福',logo:'img/temp/sc3.png' },
    { id: 0, name: '苏宁易购',logo:'img/temp/sc4.png' },
    { id: 0, name: '银泰百货',logo:'img/temp/sc5.png' },
    { id: 0, name: '万象城',logo:'img/temp/sc6.png' }
  ];
  var marketCategory =[
    { id: 1, logo:'img/temp/icon/market_fen1.png' },
    { id: 2, logo:'img/temp/icon/market_fen2.png' },
    { id: 3, logo:'img/temp/icon/market_fen3.png' },
    { id: 4, logo:'img/temp/icon/market_fen4.png' },
    { id: 5, logo:'img/temp/icon/market_fen5.png' },
    { id: 6, logo:'img/temp/icon/market_fen6.png' },
    { id: 7, logo:'img/temp/icon/market_fen7.png' },
    { id: 8, logo:'img/temp/icon/market_fen8.png' }
  ];
  var images = [
  {imgPath:'img/temp/morenmarket.png'}
  ];
  var images1 = [
  {advertisement: {ct: 1418029833133,ut: 1418029833133,id: 1},advertisementItem: {filePath: "img/temp/morenmarket.png"}}];
return {
  images: function(){
    return images;
  },
  images1: function(){
    return images1;
  },
  markets1: function() {
      return markets1;
    },
  markets2: function() {
      return markets2;
    },
  marketCategory: function() {
      return marketCategory;
    },
  getMarkets: function(data) {
      var deferred = $q.defer();
      $http({
        method: 'JSONP',
        params:data,
        url: 'http://admin.53xsd.com/market/list?callbackName=JSON_CALLBACK'
      }).success(function(data){
        deferred.resolve(data);
      }).error(function(data,status){
        deferred.reject(status)
      })
      return deferred.promise;
    },
    getMarketsById:function(id){
      var deferred = $q.defer();
      $http({
        method: 'JSONP',
        url: 'http://admin.53xsd.com/market/getMarket?callbackName=JSON_CALLBACK&id='+id
      }).success(function(data){
        deferred.resolve(data);
      }).error(function(data,status){
        deferred.reject(status)
      })
      return deferred.promise;
    },
    getShopByMarket:function(data){
       var deferred = $q.defer();
      $http({
        method: 'JSONP',
        params:data,
        url: 'http://admin.53xsd.com/market/getShopByMarket?callbackName=JSON_CALLBACK'
      }).success(function(data){
        deferred.resolve(data);
      }).error(function(data,status){
        deferred.reject(status)
      })
      return deferred.promise;
    },
    getShopByMarketCat:function(data){
       var deferred = $q.defer();
      $http({
        method: 'JSONP',
        params:data,
        url: 'http://admin.53xsd.com/market/getShopByMarketCat?callbackName=JSON_CALLBACK'
      }).success(function(data){
        deferred.resolve(data);
      }).error(function(data,status){
        deferred.reject(status)
      })
      return deferred.promise;
    }

  }
})


.factory('Shopdetail', function() {
  var productcates = [
    { id: 0, name: '女士' },
    { id: 1, name: '外套' },
    { id: 2, name: '毛衣' },
    { id: 3, name: '长袖' },
    { id: 4, name: '内衣' },
    { id: 5, name: '背心' },
    { id: 6, name: '裤子' }
  ];

  return {
    categorys: function() {
      return productcates;
    },
    get: function(friendId) {
      // Simple index lookup
      return productcates [friendId];
    }
  }
})

// .factory('Getregions', function() {
//   var regionoptions = [
//    {id: 8,name: '西湖区' },
//    {id: 1,name: '拱墅区' },
//    {id: 2,name: '上城区' },
//    {id: 3,name: '余杭区' },
//    {id: 4,name: '江干区' },
//    {id: 5,name: '下城区' },
//    {id: 6,name: '滨江区' },
//    {id: 7,name: '萧山区' }
//   ];

//   return {
//     categorys: function() {
//       return regionoptions;
//     },
//     get: function(friendId) {
//       // Simple index lookup
//       return regionoptions [friendId];
//     }
//   }
// })

.factory('Location', function($http, $q) {
  var cityName;
  var areaId;
  var areaName;
  var longitude;
  var latitude;
  var locationMode;
  return {
    setLocationMode:function(type){
     locationMode=type;
     localStorage.setItem("locationMode",locationMode);
    },
    getLocationMode:function(){
      if(locationMode){
      return locationMode;
      }else{
       return localStorage.getItem("locationMode");
      }
    },
     clearLocationMode:function(){
      locationMode=null;
      localStorage.removeItem("locationMode");
    },
    setCityName:function(city){
     cityName=city;
     localStorage.setItem("cityName",cityName);
    },
    getCityName:function(){
      if(cityName){
      return cityName;
      }else{
       return localStorage.getItem("cityName");
      }
    },
     setAreaId:function(data){
     areaId=data;
     localStorage.setItem("areaId",areaId);
    },
    getAreaId:function(){
      if(areaId){
      return areaId;
      }else{
       return localStorage.getItem("areaId");
      }
    },
    setAreaName:function(data){
     areaName=data;
     localStorage.setItem("areaName",areaName);
    },
    getAreaName:function(){
      if(areaName){
      return areaName;
      }else{
       return localStorage.getItem("areaName");
      }
    },
    setAreaName:function(data){
     areaName=data;
     localStorage.setItem("areaName",areaName);
    },
    getAreaName:function(){
      if(areaName){
      return areaName;
      }else{
       return localStorage.getItem("areaName");
      }
    },
    setLongitude:function(data){
     longitude=data;
     localStorage.setItem("longitude",longitude);
    },
    getLongitude:function(){
      if(longitude){
      return longitude;
      }else{
       return localStorage.getItem("longitude");
      }
    },
    setLatitude:function(data){
     latitude=data;
     localStorage.setItem("latitude",latitude);
    },
    getLatitude:function(){
      if(latitude){
      return latitude;
      }else{
       return localStorage.getItem("latitude");
      }
    },
    clearAreaName:function(){
      areaName=null;
      localStorage.removeItem("areaName");
      areaId=null;
      localStorage.removeItem("areaId");
    },
    getLocation: function() {
       var deferred = $q.defer();
      $http({
        method: 'JSONP',
        url: 'http://api.map.baidu.com/location/ip?ak=TDQZ19gKkAGvwKO6HTRFDZpS&callback=JSON_CALLBACK'
      }).success(function(data){
        deferred.resolve(data);
      }).error(function(data,status){
        deferred.reject(status)
      })
      return deferred.promise;
    },
  getAreas: function(cityName) {
       var deferred = $q.defer();
      $http({
        method: 'JSONP',
        url: _url+'getAreaByCityName?callbackName=JSON_CALLBACK&cityName='+cityName
      }).success(function(data){
        deferred.resolve(data);
      }).error(function(data,status){
        deferred.reject(status)
      })
      return deferred.promise;
    },
  getCitys: function(areaId) {
       var deferred = $q.defer();
      $http({
        method: 'JSONP',
        url: _url+'getCitys?callbackName=JSON_CALLBACK&areaId='+areaId
      }).success(function(data){
        deferred.resolve(data);
      }).error(function(data,status){
        deferred.reject(status)
      })
      return deferred.promise;
    },
    getAreaIdByCityArea: function(cityName,areaName){
      var deferred = $q.defer();
      $http({
        method: 'JSONP',
        url: _url+'getAreaId?callbackName=JSON_CALLBACK&cityName='+cityName+'&areaName='+areaName
      }).success(function(data){
        deferred.resolve(data);
      }).error(function(data,status){
        deferred.reject(status)
      })
      return deferred.promise;
    }
  }
})

.factory('Session', function($http, $q) {
  var categorys;
  var shops;
  var nearbyShops;
  var locationMode;
  var backMode;
  var scrollLeftHeight;
  var scrollRightHeight;
  return {   
    setScrollLeftHeight:function(type){
     scrollLeftHeight=type;
     sessionStorage.setItem("scrollLeftHeight",scrollLeftHeight);
    },
    getScrollLeftHeight:function(){
      if(scrollLeftHeight){
      return scrollLeftHeight;
      }else{
       return sessionStorage.getItem("scrollLeftHeight");
      }
    }, 
    setScrollRightHeight:function(type){
     scrollRightHeight=type;
     sessionStorage.setItem("scrollRightHeight",scrollRightHeight);
    },
    getScrollRightHeight:function(){
      if(scrollRightHeight){
      return scrollRightHeight;
      }else{
       return sessionStorage.getItem("scrollRightHeight");
      }
    }, 
    setLocationMode:function(type){
     locationMode=type;
     sessionStorage.setItem("locationMode",locationMode);
    },
    getLocationMode:function(){
      if(locationMode){
      return locationMode;
      }else{
       return sessionStorage.getItem("locationMode");
      }
    },
     clearLocationMode:function(){
      locationMode=null;
      sessionStorage.removeItem("locationMode");
    },
    setBackMode:function(type){
     backMode=type;
     sessionStorage.setItem("backMode",backMode);
    },
    getBackMode:function(){
      if(backMode){
      return backMode;
      }else{
       return sessionStorage.getItem("backMode");
      }
    },
     clearBackMode:function(){
      backMode=null;
      sessionStorage.removeItem("backMode");
    },
    setCategorys:function(data){
     categorys=data;
     sessionStorage.setItem("categorys",JSON.stringify(categorys));
    },
    getCategorys:function(){
      if(categorys){
       return categorys;
      }else{
       categorys=JSON.parse(sessionStorage.getItem("categorys"));
       return categorys;
      }
    },
    setShops:function(data){
     shops=data;
     sessionStorage.setItem("shops",JSON.stringify(shops));
    },
    getShops:function(){
      if(shops){
      return shops;
      }else{
        shops=JSON.parse(sessionStorage.getItem("shops"));
       return shops;
      }
    },
    setNearbyShops:function(data){
     nearbyShops=data;
     sessionStorage.setItem("nearbyShops",JSON.stringify(nearbyShops));
    },
    getNearbyShops:function(){
      if(nearbyShops){
      return nearbyShops;
      }else{
         nearbyShops=JSON.parse(sessionStorage.getItem("nearbyShops"));
       return nearbyShops;
      }
    }
  }
})

.factory('MemberService', function($http, $q) {
  var member;
  return {    
    getMember: function() {
      if(member){
         return member;
       }else{
         member=JSON.parse(localStorage.getItem("member"));
         return member;
       }
    },
    setMember: function(data) {
       member=data;
      localStorage.setItem("member",JSON.stringify(member))
    },
    getRecord: function(userId) {
       var deferred = $q.defer();
      $http({
        method: 'JSONP',
        params:{userId:userId},
        url: 'http://admin.53xsd.com/mobi/getRecord?callbackName=JSON_CALLBACK'
      }).success(function(data){
        deferred.resolve(data);
      }).error(function(data,status){
        deferred.reject(status)
      })
      return deferred.promise;
    },
    getCode: function(mobi) {
       var deferred = $q.defer();
      $http({
        method: 'JSONP',
        params:{mobile:mobi},
        url: 'http://admin.53xsd.com/user/sendActiveCode?callbackName=JSON_CALLBACK'
      }).success(function(data){
        deferred.resolve(data);
      }).error(function(data,status){
        deferred.reject(status)
      })
      return deferred.promise;
    },
    doReg: function(data) {
       var deferred = $q.defer();
      $http({
        method: 'JSONP',
        params:data,
        url: 'http://admin.53xsd.com/user/reg?callbackName=JSON_CALLBACK'
      }).success(function(data){
        deferred.resolve(data);
      }).error(function(data,status){
        deferred.reject(status)
      })
      return deferred.promise;
    },
  doLogin: function(data) {
       var deferred = $q.defer();
      $http({
        method: 'JSONP',
        params:data,
        url: 'http://admin.53xsd.com/user/log?callbackName=JSON_CALLBACK'
      }).success(function(data){
        deferred.resolve(data);
      }).error(function(data,status){
        deferred.reject(status)
      })
      return deferred.promise;
    },
  quitLogin:function() {
      member=null;
      localStorage.removeItem("member");
    },
    getRecordAsPage:function(data){
      var deferred = $q.defer();
      $http({
        method: 'JSONP',
        params:data,
        url: _url+'getRecordAsPage?callbackName=JSON_CALLBACK'
      }).success(function(data){
        deferred.resolve(data);
      }).error(function(data,status){
        deferred.reject(status)
      })
      return deferred.promise;
    }
  }
})

.factory('StoreService', function($http, $q) {
  return {    
    getFavList:function(data){
      var deferred = $q.defer();
      $http({
        method: 'JSONP',
        params:data,
        url: 'http://admin.53xsd.com/favorite/getFavList?callbackName=JSON_CALLBACK'
      }).success(function(data){
        deferred.resolve(data);
      }).error(function(data,status){
        deferred.reject(status)
      })
      return deferred.promise;
    }
  }
})

.factory('IndexService', function($http, $q) {
  var isload=false;
  var menus=[
   {id: 1,name: '服装鞋帽',logo:'img/temp/icon/icon-cloth.png' },
   {id: 5,name: '餐饮美食',logo:'img/temp/icon/icon-food.png' },
   {id: 6,name: '酒店宾馆',logo:'img/temp/icon/icon-hotel.png' },
   {id: 7,name: '本地特色',logo:'img/temp/icon/icon-plane.png' },
   {id: 8,name: '休闲娱乐',logo:'img/temp/icon/icon-drink.png' },
   {id: 9,name: '美容美发',logo:'img/temp/icon/icon-hair.png' },
   {id: 10,name: '家居建材',logo:'img/temp/icon/icon-bed.png' },
   {id: 11,name: '电子数码',logo:'img/temp/icon/icon-pad.png' },
   {id: 12,name: '工艺礼品',logo:'img/temp/icon/icon-gift.png' },
   {id: 13,name: '日用百货',logo:'img/temp/icon/icon-book.png' },
   {id: 14,name: '汽车摩托',logo:'img/temp/icon/icon-car.png' },
   {id: 15,name: '更多',logo:'img/temp/icon/icon-more.png' }
  ];
  var page={busy:false,currentPage:1,pages:1}; 

var ads = [
{advertisement: {
ct: 1418029833133,
ut: 1418029833133,
id: 1
},advertisementItem: {
filePath: "http://image.53xsd.com/newshop/2014/12/c2638009-6ff5-4776-bda0-b08650cab1e3.jpg"
}
},
{
advertisement: {
ct: 1418029833133,
ut: 1418029833133,
id: 1
},
advertisementItem: {
filePath: "http://image.53xsd.com/newshop/2014/12/8a63ddb1-3f0a-4c3c-8fa6-9567f12b849f.jpg"
}
}
];

  return {    
    get: function() {
      return menus;
    },
    getPage: function() {
      return page;
    },
    setMember: function(data) {
      member=data;
    },
    getAds: function() {
      return ads;
    },
    setAds: function(data) {
      ads=data;
      isload=true;
    },
    isLoded:function() {
      return isload;
    }
  }
})

.factory('AdService', function($http, $q) {
  return {    
    getAds: function(id) {
       var deferred = $q.defer();
      $http({
        method: 'JSONP',
        url: _url+'getAdv?callbackName=JSON_CALLBACK&typeId='+id
      }).success(function(data){
        deferred.resolve(data);
      }).error(function(data,status){
        deferred.reject(status)
      })
      return deferred.promise;
    }
  }
})

.factory('CommonService', function($ionicPopup) {
  return {    
    error: function(judge) {
      if(judge){
        var alertPopup = $ionicPopup.alert({
         title: '网络异常！',
         template: '抱歉,当前网络不可用！'
       });
      }
      return false;
    }
  }
})
;








function friend(id,name){ //use constructor 
this.id=id; 
this.name=name; 
return this; 
}




