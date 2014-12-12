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