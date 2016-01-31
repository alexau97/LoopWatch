angular.module('app.services', [])

.factory('BlankFactory', [function(){

}])
.factory('loop_service', function($http) {

    var getData = function() {

    	return    $.ajax({
                    url: "http://skynet.soe.ucsc.edu/bts/coord2.jsonp",
                    //url: "js/bus_location.json",
                    dataType: "jsonp",
                    jsonp: !0,
                    cache: !1,
                    jsonpCallback: "parseResponse",
                    success: function(f) { 

                  
                    	
                    	return f;
                    }

})

     
    };
    return { getData: getData };
})

.service('innerOrOuter',[function(){
  var inOrOut;
  return {
    get_var: function(){
      return inOrOut;
    },
    set_var: function(value){
      inOrOut = value;
    }
  }
}])

.service('loop_gps', [function(){
  var bus_loop; 

  return{
  	get_bus: function(){
  		return bus_loop;
  	},
  	set_bus: function(value){
  		bus_loop = value;
  	}
  }
}])
.service('whichMetroBus', [function(){
  var whichMetro;
  return {
    get_var: function(){
      return whichMetro;
    },
    set_var: function(value){
      whichMetro = value;
    }
  }
}])

.service('BusService',[function(){

  var row_16 = [];
  var row_16_stops = [];

  var row_19 = [];
  var row_19_stops = [];

  var row_10 = [];
  var row_10_stops = [];

  var row_15 = [];
  var row_15_stops = [];

  var row_20 = [];
  var row_20_stops = [];

  return {
    get_bus_16: function() {
            return row_16;
        },
    get_stops_16: function(){
    		return row_16_stops;
    },
     get_bus_19: function(){
     	return row_19;
     },
     get_stops_19: function(){
    		return row_19_stops;
    },
     get_bus_10: function(){
      return row_10;
     },
     get_stops_10: function(){
    		return row_10_stops;
    },
     get_bus_15: function(){
      return row_15;
     },
     get_stops_15: function(){
    		return row_15_stops;
    },
     get_bus_20: function(){
      return row_20;
     },
     get_stops_20: function(){
    		return row_20_stops;
    },
    set_bus_16: function(value){
    	
            row_16.push(value);
    },
    set_stops_16: function(value){
    	
            row_16_stops.push(value);
    },
    set_bus_19: function (value){
    	
      row_19.push(value);
    },
     set_stops_19: function(value){
    	
            row_19_stops.push(value);
    },
    set_bus_10: function(value){
      
            row_10.push(value);
    },
     set_stops_10: function(value){
    	
            row_10_stops.push(value);
    },
    set_bus_15: function(value){
      
      row_15.push(value);
    },
     set_stops_15: function(value){
    	
            row_15_stops.push(value);
    },
    set_bus_20: function(value){
      
      row_20.push(value);
    },
    set_stops_20: function(value){
    	
            row_20_stops.push(value);
    }


      }

}])
.service('BlankService', [function(){

}]);

