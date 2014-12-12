var myfilter=angular.module('starter.filters', []);

myfilter.filter('orderTypeFilter', function() {
  var titleCaseFilter = function(input) {
	  	if (input==2){
	    return '商户发放新商币';
	  	}else if(input==3){
	    return '商城购买商品';
		}
  };
  return titleCaseFilter;

});


myfilter.filter('locationFilter', function() {
  var titleCaseFilter = function(input) {
	  	if (input.length<3){
	    return input+'市';
	  	}else{
	    return input;
		}
  };
  return titleCaseFilter;

});

myfilter.filter('urlLogoFilter', function() {
  var titleCaseFilter = function(input) {
	  	if (input=='http://image.53xsd.com/newshop'){
	    return 'img/temp/shop/logo.png';
	  	}else{
	    return input;
		}
  };
  return titleCaseFilter;

});

myfilter.filter('urlBgFilter', function() {
  var titleCaseFilter = function(input) {
	  	if (input=='http://image.53xsd.com/newshop'){
	    return 'img/temp/shop/bg.png';
	  	}else{
	    return input;
		}
  };
  return titleCaseFilter;

});

