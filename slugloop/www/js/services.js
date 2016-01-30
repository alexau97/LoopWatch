angular.module('app.services', [])

.factory('BlankFactory', [function(){

}])
.service('BusService',[function(){

  var row_16 = [];
  var row_19 = [];
  return {
    get_bus_16: function() {
            return row_16;
        },
     get_bus_19: function(){
     	return row_19;
     },
    set_bus_16: function(value){
    	console.log("I am pushing a value");
            row_16.push(value);
    },
    set_bus_19: function (value){
    	row_19.push(value);
    }


      }

}])
.service('BlankService', [function(){

}]);

