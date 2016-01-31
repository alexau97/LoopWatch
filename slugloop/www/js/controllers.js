angular.module('app.controllers', [])


  
.controller('loopCtrl', function($scope) {

})
   
.controller('feedCtrl', function($scope,$state, $http, BusService) {
	$scope.to_inner_loop = function(){
		console.log("Hello WOrld");
		$state.go('tabsController.feed_list')
	}

  $http.get("https://crossorigin.me/http://www.scmtd.com/en/routes/system-map/systemschedule/16/20161")
            .success(function(data) {
               //console.log(data);
               var tmp = document.implementation.createHTMLDocument();
               tmp.body.innerHTML = data;
               //console.log(tmp.body.innerHTML);

               var bus_table = tmp.getElementById('schedule_table');
               //console.log(bus_table.innerHTML);
          		var bus_16 = [];
               var bus_time = bus_table.getElementsByTagName("tr");
               

               for(var j = 2; j < bus_time.length; j++){
               var string = bus_time[j].getElementsByTagName("td");
               var bus_row = [];

               for(var i = 0; i < string.length; i++){
               	var trimmed = string[i].innerHTML.trim();
            	var replaced = trimmed.replace("<strong>","");
            	 replaced = trimmed.replace("</strong","");
            	 replaced = trimmed.replace("<strong>↵","")
               	bus_row.push(replaced.replace(/<(?:.|\n)*?>/gm, '').replace(/ /g,'').replace("↵",""));
               	//console.log(string[i].innerHTML.trim());
               }
                 //bus_16.push(bus_row)
                 BusService.set_bus_16(bus_row);

               }
               bus_16 = BusService.get_bus_16();
               console.log(bus_16);
               
               	
               
               


               
                
                
            })
            .error(function() {
                defer.reject('could not find someFile.json');
            });

  $http.get("https://crossorigin.me/http://www.scmtd.com/en/routes/system-map/systemschedule/10/20161")
            .success(function(data) {
               //console.log(data);
               var tmp = document.implementation.createHTMLDocument();
               tmp.body.innerHTML = data;
               //console.log(tmp.body.innerHTML);

               var bus_table = tmp.getElementById('schedule_table');
               //console.log(bus_table.innerHTML);
              var bus_10 = [];
               var bus_time = bus_table.getElementsByTagName("tr");
               

               for(var j = 2; j < bus_time.length; j++){
               var string = bus_time[j].getElementsByTagName("td");
               var bus_row = [];

               for(var i = 0; i < string.length; i++){
                var trimmed = string[i].innerHTML.trim();
              var replaced = trimmed.replace("<strong>","");
               replaced = trimmed.replace("</strong","");
               replaced = trimmed.replace("<strong>↵","")
                bus_row.push(replaced.replace(/<(?:.|\n)*?>/gm, '').replace(/ /g,'').replace("↵",""));
                //console.log(string[i].innerHTML.trim());
               }
                 //bus_16.push(bus_row)
                 BusService.set_bus_10(bus_row);

               }
               bus_10 = BusService.get_bus_10();
               console.log(bus_10);
               
                
               
               


               
                
                
            })
            .error(function() {
                defer.reject('could not find someFile.json');
            });

  $http.get("https://crossorigin.me/http://www.scmtd.com/en/routes/system-map/systemschedule/15/20161")
            .success(function(data) {
               //console.log(data);
               var tmp = document.implementation.createHTMLDocument();
               tmp.body.innerHTML = data;
               //console.log(tmp.body.innerHTML);

               var bus_table = tmp.getElementById('schedule_table');
               //console.log(bus_table.innerHTML);
              var bus_15 = [];
               var bus_time = bus_table.getElementsByTagName("tr");
               

               for(var j = 2; j < bus_time.length; j++){
               var string = bus_time[j].getElementsByTagName("td");
               var bus_row = [];

               for(var i = 0; i < string.length; i++){
                var trimmed = string[i].innerHTML.trim();
              var replaced = trimmed.replace("<strong>","");
               replaced = trimmed.replace("</strong","");
               replaced = trimmed.replace("<strong>↵","")
                bus_row.push(replaced.replace(/<(?:.|\n)*?>/gm, '').replace(/ /g,'').replace("↵",""));
                //console.log(string[i].innerHTML.trim());
               }
                 //bus_16.push(bus_row)
                 BusService.set_bus_15(bus_row);

               }
               bus_15 = BusService.get_bus_15();
               console.log(bus_15);
               
                
               
               


               
                
                
            })
            .error(function() {
                defer.reject('could not find someFile.json');
            });

  $http.get("https://crossorigin.me/http://www.scmtd.com/en/routes/system-map/systemschedule/19/20161")
            .success(function(data) {
               //console.log(data);
               var tmp = document.implementation.createHTMLDocument();
               tmp.body.innerHTML = data;
               //console.log(tmp.body.innerHTML);

               var bus_table = tmp.getElementById('schedule_table');
               //console.log(bus_table.innerHTML);
              var bus_19 = [];
               var bus_time = bus_table.getElementsByTagName("tr");
               

               for(var j = 2; j < bus_time.length; j++){
               var string = bus_time[j].getElementsByTagName("td");
               var bus_row = [];

               for(var i = 0; i < string.length; i++){
                var trimmed = string[i].innerHTML.trim();
              var replaced = trimmed.replace("<strong>","");
               replaced = trimmed.replace("</strong","");
               replaced = trimmed.replace("<strong>↵","")
                bus_row.push(replaced.replace(/<(?:.|\n)*?>/gm, '').replace(/ /g,'').replace("↵",""));
                //console.log(string[i].innerHTML.trim());
               }
                 //bus_16.push(bus_row)
                 BusService.set_bus_19(bus_row);

               }
               bus_19 = BusService.get_bus_19();
               console.log(bus_19);
               
                
               
               


               
                
                
            })
            .error(function() {
                defer.reject('could not find someFile.json');
            });

  $http.get("https://crossorigin.me/http://www.scmtd.com/en/routes/system-map/systemschedule/20/20161")
        .success(function(data) {
               //console.log(data);
               var tmp = document.implementation.createHTMLDocument();
               tmp.body.innerHTML = data;
               //console.log(tmp.body.innerHTML);

               var bus_table = tmp.getElementById('schedule_table');
               //console.log(bus_table.innerHTML);
              var bus_20 = [];
               var bus_time = bus_table.getElementsByTagName("tr");
               

               for(var j = 2; j < bus_time.length; j++){
               var string = bus_time[j].getElementsByTagName("td");
               var bus_row = [];

               for(var i = 0; i < string.length; i++){
                var trimmed = string[i].innerHTML.trim();
              var replaced = trimmed.replace("<strong>","");
               replaced = trimmed.replace("</strong","");
               replaced = trimmed.replace("<strong>↵","")
                bus_row.push(replaced.replace(/<(?:.|\n)*?>/gm, '').replace(/ /g,'').replace("↵",""));
                //console.log(string[i].innerHTML.trim());
               }
                 //bus_16.push(bus_row)
                 BusService.set_bus_20(bus_row);

               }
               bus_20 = BusService.get_bus_20();
               console.log(bus_20);
               
                
               
               


               
                
                
            })
            .error(function() {
                defer.reject('could not find someFile.json');
            });

})
   .controller('feed_listCtrl', function($scope) {

})

.controller('mapCtrl', function($scope, $state ,$cordovaGeolocation) {
  console.log("test");
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
    console.log("Could not get location");
  });
});