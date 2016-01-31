angular.module('app.controllers', [])


  
.controller('loopCtrl', function($scope,loop_service) {
	$scope.data;
var myDataPromise = loop_service.getData();
    myDataPromise.then(function(result) {  // this is only run after $http completes
       $scope.data = result;
       console.log("printing results")
       console.log(result);
       
    });
 //  console.log("hi")
   console.log($scope.data)
})
   
.controller('feedCtrl', function($scope,$state, $http, BusService, innerOrOuter, whichMetroBus) {
	$scope.to_inner_loop = function(){
    innerOrOuter.set_var(0); // 0 is inner loop
   //		console.log("Hello WOrld");

		$state.go('tabsController.feed_list')
	}
  $scope.to_outer_loop = function(){
    innerOrOuter.set_var(1);
    $state.go('tabsController.feed_list')
  }
  $scope.to_bus_15 = function(){
    whichMetroBus.set_var(0); // 0 is bus 15
    $state.go('tabsController.metro_list')
  }
  $scope.to_bus_16 = function(){
    whichMetroBus.set_var(1);
    $state.go('tabsController.metro_list')
  }
  $scope.to_bus_10 = function(){
    whichMetroBus.set_var(2);
    $state.go('tabsController.metro_list')
  }
  $scope.to_bus_19 = function(){
    whichMetroBus.set_var(3);
    $state.go('tabsController.metro_list')
  }
  $scope.to_bus_20 = function(){
    whichMetroBus.set_var(4);
    $state.go('tabsController.metro_list')
  }



  $http.get("https://crossorigin.me/http://www.scmtd.com/en/routes/system-map/systemschedule/16/20161")
            .success(function(data) {
               ////console.log(data);
               var tmp = document.implementation.createHTMLDocument();
               tmp.body.innerHTML = data;
               ////console.log(tmp.body.innerHTML);

               var bus_table = tmp.getElementById('schedule_table');
               ////console.log(bus_table.innerHTML);
          		var bus_16 = [];
               var bus_time = bus_table.getElementsByTagName("tr");
                              var bus_stops = bus_time[0].innerText;
               var bus_stops_filtered = bus_stops.split("Departs")
               var bus_stops_corner_case = bus_stops_filtered[bus_stops_filtered.length-1].split("Arrives")
               var bus_stops_final = [];
               for(var i = 0; i < bus_stops_filtered.length-1; i++){
               	bus_stops_final.push(bus_stops_filtered[i]);
               }
               bus_stops_final.push(bus_stops_corner_case[0])
               bus_stops_final.push(bus_stops_corner_case[1])
               console.log("Putting shit into the stops");
               BusService.set_stops_16(bus_stops_final);


               for(var j = 2; j < bus_time.length; j++){
               var string = bus_time[j].getElementsByTagName("td");
               var bus_row = [];

               for(var i = 0; i < string.length; i++){
               	var trimmed = string[i].innerHTML.trim();
            	var replaced = trimmed.replace("<strong>","");
            	 replaced = trimmed.replace("</strong","");
            	 replaced = trimmed.replace("<strong>↵","")
               	bus_row.push(replaced.replace(/<(?:.|\n)*?>/gm, '').replace(/ /g,'').replace("↵",""));
               	////console.log(string[i].innerHTML.trim());
               }
                 //bus_16.push(bus_row)
                 BusService.set_bus_16(bus_row);

               }
               bus_16 = BusService.get_bus_16();
             //  console.log(bus_16);
               
               	
               
               


               
                
                
            })
            .error(function() {
                defer.reject('could not find someFile.json');
            });

  $http.get("https://crossorigin.me/http://www.scmtd.com/en/routes/system-map/systemschedule/10/20161")
            .success(function(data) {
               ////console.log(data);
               var tmp = document.implementation.createHTMLDocument();
               tmp.body.innerHTML = data;
               ////console.log(tmp.body.innerHTML);

               var bus_table = tmp.getElementById('schedule_table');
               ////console.log(bus_table.innerHTML);
              var bus_10 = [];
               var bus_time = bus_table.getElementsByTagName("tr");
                              var bus_stops = bus_time[0].innerText;
               var bus_stops_filtered = bus_stops.split("Departs")
               var bus_stops_corner_case = bus_stops_filtered[bus_stops_filtered.length-1].split("Arrives")
               var bus_stops_final = [];
               for(var i = 0; i < bus_stops_filtered.length-1; i++){
               	bus_stops_final.push(bus_stops_filtered[i]);
               }
               bus_stops_final.push(bus_stops_corner_case[0])
               bus_stops_final.push(bus_stops_corner_case[1])
              
				BusService.set_stops_10(bus_stops_final);

               for(var j = 2; j < bus_time.length; j++){
               var string = bus_time[j].getElementsByTagName("td");
               var bus_row = [];

               for(var i = 0; i < string.length; i++){
                var trimmed = string[i].innerHTML.trim();
              var replaced = trimmed.replace("<strong>","");
               replaced = trimmed.replace("</strong","");
               replaced = trimmed.replace("<strong>↵","")
                bus_row.push(replaced.replace(/<(?:.|\n)*?>/gm, '').replace(/ /g,'').replace("↵",""));
                ////console.log(string[i].innerHTML.trim());
               }
                 //bus_16.push(bus_row)
                 BusService.set_bus_10(bus_row);

               }
               bus_10 = BusService.get_bus_10();
              //// console.log(bus_10);
               
                
               
               


               
                
                
            })
            .error(function() {
                defer.reject('could not find someFile.json');
            });

  $http.get("https://crossorigin.me/http://www.scmtd.com/en/routes/system-map/systemschedule/15/20161")
            .success(function(data) {
               ////console.log(data);
               var tmp = document.implementation.createHTMLDocument();
               tmp.body.innerHTML = data;
               ////console.log(tmp.body.innerHTML);

               var bus_table = tmp.getElementById('schedule_table');
               ////console.log(bus_table.innerHTML);
              var bus_15 = [];
               var bus_time = bus_table.getElementsByTagName("tr");
                              var bus_stops = bus_time[0].innerText;
               var bus_stops_filtered = bus_stops.split("Departs")
               var bus_stops_corner_case = bus_stops_filtered[bus_stops_filtered.length-1].split("Arrives")
               var bus_stops_final = [];
               for(var i = 0; i < bus_stops_filtered.length-1; i++){
               	bus_stops_final.push(bus_stops_filtered[i]);
               }
               bus_stops_final.push(bus_stops_corner_case[0])
               bus_stops_final.push(bus_stops_corner_case[1])
               BusService.set_stops_15(bus_stops_final);


               for(var j = 2; j < bus_time.length; j++){
               var string = bus_time[j].getElementsByTagName("td");
               var bus_row = [];

               for(var i = 0; i < string.length; i++){
                var trimmed = string[i].innerHTML.trim();
              var replaced = trimmed.replace("<strong>","");
               replaced = trimmed.replace("</strong","");
               replaced = trimmed.replace("<strong>↵","")
                bus_row.push(replaced.replace(/<(?:.|\n)*?>/gm, '').replace(/ /g,'').replace("↵",""));
                ////console.log(string[i].innerHTML.trim());
               }
                 //bus_16.push(bus_row)
                 BusService.set_bus_15(bus_row);

               }
               bus_15 = BusService.get_bus_15();
             //  console.log(bus_15);
               
                
               
               


               
                
                
            })
            .error(function() {
                defer.reject('could not find someFile.json');
            });

  $http.get("https://crossorigin.me/http://www.scmtd.com/en/routes/system-map/systemschedule/19/20161")
            .success(function(data) {
               ////console.log(data);
               var tmp = document.implementation.createHTMLDocument();
               tmp.body.innerHTML = data;
               ////console.log(tmp.body.innerHTML);

               var bus_table = tmp.getElementById('schedule_table');
               ////console.log(bus_table.innerHTML);
              var bus_19 = [];
               var bus_time = bus_table.getElementsByTagName("tr");
                              var bus_stops = bus_time[0].innerText;
               var bus_stops_filtered = bus_stops.split("Departs")
               var bus_stops_corner_case = bus_stops_filtered[bus_stops_filtered.length-1].split("Arrives")
               var bus_stops_final = [];
               for(var i = 0; i < bus_stops_filtered.length-1; i++){
               	bus_stops_final.push(bus_stops_filtered[i]);
               }
               bus_stops_final.push(bus_stops_corner_case[0])
               bus_stops_final.push(bus_stops_corner_case[1])
               BusService.set_stops_19(bus_stops_final);


               for(var j = 2; j < bus_time.length; j++){
               var string = bus_time[j].getElementsByTagName("td");
               var bus_row = [];

               for(var i = 0; i < string.length; i++){
                var trimmed = string[i].innerHTML.trim();
              var replaced = trimmed.replace("<strong>","");
               replaced = trimmed.replace("</strong","");
               replaced = trimmed.replace("<strong>↵","")
                bus_row.push(replaced.replace(/<(?:.|\n)*?>/gm, '').replace(/ /g,'').replace("↵",""));
                ////console.log(string[i].innerHTML.trim());
               }
                 //bus_16.push(bus_row)
                 BusService.set_bus_19(bus_row);

               }
               bus_19 = BusService.get_bus_19();
             //  console.log(bus_19);
               
                
               
               


               
                
                
            })
            .error(function() {
                defer.reject('could not find someFile.json');
            });

  $http.get("https://crossorigin.me/http://www.scmtd.com/en/routes/system-map/systemschedule/20/20161")
        .success(function(data) {
               ////console.log(data);
               var tmp = document.implementation.createHTMLDocument();
               tmp.body.innerHTML = data;
               ////console.log(tmp.body.innerHTML);

               var bus_table = tmp.getElementById('schedule_table');
               ////console.log(bus_table.innerHTML);
              var bus_20 = [];
               var bus_time = bus_table.getElementsByTagName("tr");
               
               var bus_stops = bus_time[0].innerText;
               var bus_stops_filtered = bus_stops.split("Departs")
               var bus_stops_corner_case = bus_stops_filtered[bus_stops_filtered.length-1].split("Arrives")
               var bus_stops_final = [];
               for(var i = 0; i < bus_stops_filtered.length-1; i++){
               	bus_stops_final.push(bus_stops_filtered[i]);
               }
               bus_stops_final.push(bus_stops_corner_case[0])
               bus_stops_final.push(bus_stops_corner_case[1])
               BusService.set_stops_20(bus_stops_final);
       
               for(var j = 2; j < bus_time.length; j++){
               var string = bus_time[j].getElementsByTagName("td");
               var bus_row = [];

               for(var i = 0; i < string.length; i++){
                var trimmed = string[i].innerHTML.trim();
              var replaced = trimmed.replace("<strong>","");
               replaced = trimmed.replace("</strong","");
               replaced = trimmed.replace("<strong>↵","")
                bus_row.push(replaced.replace(/<(?:.|\n)*?>/gm, '').replace(/ /g,'').replace("↵",""));
                ////console.log(string[i].innerHTML.trim());
               }
                 //bus_16.push(bus_row)
                 BusService.set_bus_20(bus_row);

               }
               bus_20 = BusService.get_bus_20();
             //  console.log(bus_20);
               
                
               
               


               
                
                
            })
            .error(function() {
                defer.reject('could not find someFile.json');
            });

})
   .controller('feed_listCtrl', function($scope, innerOrOuter) {
    $scope.title = "Bus Schedule -- Inner Loop";
    if(innerOrOuter.get_var() == 0){
    //  console.log("We're in the inner loop");
      $scope.title = "Bus Schedule -- Inner Loop";
    }else{
      $scope.title = "Bus Schedule -- Outer Loop";
    }

})
   .controller('metro_listCtrl', function($scope, whichMetroBus, BusService) {
    $scope.title = "Bus Schedule -- Metro Bus 15";
    $scope.master_list = [];
    $scope.master_stops = [];
    var tmp_list = [];
    var tmp_stops = [];

    if(whichMetroBus.get_var() == 0){
      
      $scope.title = "Bus Schedule -- Metro Bus 15";
      tmp_list = BusService.get_bus_15();
      tmp_stops = BusService.get_stops_15();
    }else if(whichMetroBus.get_var() == 1){
      $scope.title = "Bus Schedule -- Metro Bus 16";
      tmp_list = BusService.get_bus_16();
      tmp_stops = BusService.get_stops_16();
    }else if(whichMetroBus.get_var() == 2){
      $scope.title = "Bus Schedule -- Metro Bus 10";
      tmp_list = BusService.get_bus_10();
      tmp_stops = BusService.get_stops_10();
    }else if(whichMetroBus.get_var() == 3){
      $scope.title = "Bus Schedule -- Metro Bus 19";
      tmp_list = BusService.get_bus_19();
      tmp_stops= BusService.get_stops_19();
    }else{
      $scope.title = "Bus Schedule -- Metro Bus 20";
      tmp_list = BusService.get_bus_20();
      tmp_stops = BusService.get_stops_20();

    }
    //console.log(tmp_stops);
    console.log("length = " + tmp_stops.length)
    for(var i = 1; i < tmp_stops[0].length; i++){
    	$scope.master_stops.push(tmp_stops[0][i].trim());
    }
    console.log(tmp_list);
    console.log(tmp_list[0]);
    $scope.master_list = tmp_list;
    
    

    

    

})

.controller('mapCtrl', function($scope, $state ,$cordovaGeolocation) {
//  console.log("test");
   var options = {timeout: 10000, enableHighAccuracy: true};

  $cordovaGeolocation.getCurrentPosition(options).then(function(position){
    
    var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

    var mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);

    //Wait until the map is loaded
    google.maps.event.addListenerOnce($scope.map, 'idle', function(){

      var marker = new google.maps.Marker({
          map: $scope.map,
          animation: google.maps.Animation.DROP,
          position: latLng
      });      

      var infoWindow = new google.maps.InfoWindow({
          content: "I am here."
      });

      google.maps.event.addListener(marker, 'click', function () {
          infoWindow.open($scope.map, marker);
      });

    });

  }, function(error){
  //  console.log("Could not get location");
  });
});