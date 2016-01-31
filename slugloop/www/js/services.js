angular.module('app.services', [])

.factory('BlankFactory', [function(){

}])

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
  var row_19 = [];
  var row_10 = [];
  var row_15 = [];
  var row_20 = [];
  return {
    get_bus_16: function() {
            return row_16;
        },
     get_bus_19: function(){
     	return row_19;
     },
     get_bus_10: function(){
      return row_10;
     },
     get_bus_15: function(){
      return row_15;
     },
     get_bus_20: function(){
      return row_20;
     },
    set_bus_16: function(value){
    	console.log("Bus 16");
            row_16.push(value);
    },
    set_bus_19: function (value){
    	console.log("Bus 19");
      row_19.push(value);
    },
    set_bus_10: function(value){
      console.log("Bus 10");
            row_10.push(value);
    },
    set_bus_15: function(value){
      console.log("Bus 15");
      row_15.push(value);
    },
    set_bus_20: function(value){
      console.log("Bus 20");
      row_20.push(value);
    }


      }

}])
.service('BlankService', [function(){

}]);

