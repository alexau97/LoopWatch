angular.module('app.controllers', [])


  
.controller('loopCtrl', function($scope,loop_service, $ionicModal, $ionicLoading, $cordovaGeolocation, location_service) {
     $ionicModal.fromTemplateUrl('templates/location_modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
      $scope.modal_location = modal;
  });

   $scope.openModal = function() {
   console.log("lol");
     $scope.modal_location.show();
   }

    //close our modal
  $scope.closeModal = function() {
    $scope.modal.hide();
  };

  //Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modal_term.remove();
  });
  // Execute action on hide modal
  $scope.$on('modal.hidden', function() {

  });
  // Execute action on remove modal
  $scope.$on('modal.removed', function() {
    // Execute action
  });

	$scope.data;
	$scope.bus_lat = [];
	$scope.bus_lng = [];
	$scope.bus_attr = []; 
	$scope.bus_cnt = 0;
	$scope.inner_cnt = 0;
	$scope.outer_cnt =0;
	$scope.inner_min = String(0);
	var inner_id = document.getElementById( "inner_id" );
	inner_id.innerHTML = " X "

	var outer_id = document.getElementById("outer_id");
	outer_id.innerHTML = " Y "

	var inner_clnt = document.getElementById("inner_count");
	
	
	var outer_clnt = document.getElementById("outer_count");

	var in_min = 100;
	var out_min = 100;
	$scope.outer_min = String(0);
 var myDataPromise = loop_service.getData();
    myDataPromise.then(function(result) {  // this is only run after $http completes
       $scope.data = result;
       console.log("printing results")
       console.log($scope.data);
       for(var i = 0; i < $scope.data.markers.length; i++){
       		var bus_late = $scope.data.markers[i].latitude;
       		var bus_lnge = $scope.data.markers[i].longitude;
       		var bus_attre = $scope.data.markers[i].direction;
       		$scope.bus_cnt = $scope.data.count;
       		
       		
       		$scope.bus_lat.push(bus_late);
       		$scope.bus_lng.push(bus_lnge);
       		$scope.bus_attr.push(bus_attre);


       		
      

       }
       
       
    });
 
 
   var options = {timeout: 10000, enableHighAccuracy:true}
   var outer_LL = [ "OuterMcLaughlinScienceHill", 
  "OuterHellerKresgeCollege", 
  "OuterMcLaughlinCollegeNineTenHealthCenter", 
  "OuterMclaughlinCrownCollege", 
  "OuterHagarBookStoreStevensonCollege", 
  "OuterHagarFieldHouseEast", 
  "OuterHagarEastRemote", 
  "OuterHagarLowerQuarryRoad", 
  "OuterCoolidgeHagar", 
  "OuterCoolidgeMainEntrance", 
  "OuterHighWesternDrive", 
  "OuterEmpireGradeToscaTerrace", 
  "OuterEmpireGradeArboretum", 
  "OuterHellerOakesCollege", 
  "OuterHellerFamilyStudentHousing", 
  "OuterHellerCollegeEightPorter"]

var inner_LL = ["InnerHellerKerrHall", 
  "InnerHellerKresgeCollege", 
  "InnerMcLaughlinScienceHill",
  "InnerMcLaughlinCollegeNineTenHealthCenter", 
  "InnerHagarBookstore", 
  "InnerHagarEastRemote", 
  "InnerHagarLowerQuarryRd", 
  "InnerCoolidgeHagar", 
  "InnerHighWesternDr", 
  "InnerHighBarnTheater",
  "InnerEmpireGradeArboretum", 
  "InnerHellerOakesCollege", 
  "InnerHellerCollegeEightPorter" ]
   $cordovaGeolocation.getCurrentPosition(options).then(function(position){

   	location_service.set_lat(position.coords.latitude);
   	location_service.set_lng(position.coords.longitude);
   	console.log("Complete setting the lat/lng...");
   	var user_tmp = $scope.get_loca(position.coords.latitude,position.coords.longitude);
   	console.log("Currently, the user is at: " + user_tmp);
   	console.log("Complete doing the coordinates...");
   	if($scope.bus_cnt != 0){

   	for(var i = 0; i < $scope.bus_lat.length; i++){
   		//this variable is going to hold our location string
   		console.log("-----------bus index: "+ i + "-----------")
   		var bus_tmp = $scope.get_loca($scope.bus_lat[i],$scope.bus_lng[i])

   		var get_index = 0;


   	if($scope.bus_attr[i] == "inner"){
   		$scope.inner_cnt++;
   		inner_clnt.innerHTML = $scope.inner_cnt
           //GETS THE INDEX
   			for(var j = 0; j < outer_LL.length; j++){
   				//console.log(bus_tmp)
   				if(bus_tmp.indexOf(outer_LL[j])!=-1){
   					//console.log("Bus tmp.... + " + bus_tmp);
   					//console.log("outer_LL.... + " + outer_LL[i]);
   					get_index = j; //we need to capture the index
   					j = outer_LL.length;
   				}
   			}

   			console.log("OUR INDEX IS " + get_index)

   			var found = false;
   			var count = 0;
   			while(found == false){
   			 	for(var k = get_index; k < outer_LL.length; k++){
   					//console.log(i)
					//console.log("user_tmp = " + user_tmp)
					//console.log("outer_LL["+k+"] =" +outer_LL[k])
   					if(user_tmp == outer_LL[k]){
   						//console.log("WE FOUND THIS BASTARD");
   						found = true;
   						k = 100;
   						
   					}else{
   						//console.log("Haven't found it")
   						count++;
   					}

   					if(k == outer_LL.length-1 && found!=true){
   						
   						k = -1;
   					}

   				}
   			}
   			if(count < in_min ){
   				in_min = count;
   				inner_id.innerHTML = String(in_min);
   			}
   			//console.log("THE BUS IS " + count + "AWAY FROM THIS BITCH")
   		} 

   		if($scope.bus_attr[i] == "outer"){
   			$scope.outer_cnt++;
   			
	outer_clnt.innerHTML = $scope.outer_cnt
           //GETS THE INDEX
   			for(var j = 0; j < outer_LL.length; j++){
   				//console.log(bus_tmp)
   				if(bus_tmp.indexOf(outer_LL[j])!=-1){
   					//console.log("Bus tmp.... + " + bus_tmp);
   					//console.log("outer_LL.... + " + outer_LL[i]);
   					get_index = j; //we need to capture the index
   					j = outer_LL.length;
   				}
   			}

   			console.log("OUR INDEX IS " + get_index)

   			var found = false;
   			var count = 0;
   			while(found == false){
   			 	for(var k = get_index; k >= 0; k--){
   					//console.log(i)
					//console.log("user_tmp = " + user_tmp)
					//console.log("outer_LL["+k+"] =" +outer_LL[k])
   					if(user_tmp == outer_LL[k]){
   						//console.log("WE FOUND THIS BASTARD");
   						found = true;
   						k = -10;
   						
   					}else{
   						//console.log("Haven't found it")
   						count++;
   					}

   					if(k == 0 && found!=true){
   						
   						k = outer_LL.length;
   					}

   				}
   			}
   			if(count < out_min){
   				out_min = count;

outer_id.innerHTML = String(out_min);
   			}
   			console.log("THE BUS IS " + count + "AWAY FROM THIS BITCH")
   		}



   	}
  }else{
  	console.log("there are no buses in service ]: ");
  }

   })

    var distance = [];
    var min = 1000;
    var min_index = 0;
     $scope.get_loca = function(x,y){



  
  
    for (i=0; i<28; i++)
   {

        //distance calcuation
        x_val =  Math.pow(x-(bus_stops[i])[0],2 )
        y_val =  Math.pow(y-(bus_stops[i])[1],2 )
        sum_val = Math.sqrt(x_val + y_val)
        
        distance.push(sum_val);
        if(sum_val <min){
          min = sum_val;
          min_index = i
        }
        //console.log(distance[i])
      
    }
    
   //console.log("The minimum distance is " + min)
   //console.log("..and the index of where it's at is " + min_index);
   //console.log("..which is bus stop " + bus_stops[min_index][4]);
   return bus_stops[min_index][4];
  }


/*
each array holds in its elements, 4 numbers representing these 4 properties
lat
lng
head
pitch
*/


var OuterMcLaughlinScienceHill = [
                    36.999935,
                    -122.062135,
                    296.89,
                    0,
                    "OuterMcLaughlinScienceHill"
                ]

var OuterHellerKresgeCollege = [
                    36.999241,
                    -122.064452,
                    270.54,
                    -10,
                    "OuterHellerKresgeCollege"
                ]

var OuterMcLaughlinCollegeNineTenHealthCenter = [
                    36.999856,
                    -122.058251,
                    339.05,
                    5,
                    "OuterMcLaughlinCollegeNineTenHealthCenter"
                ]

var OuterMclaughlinCrownCollege = [
                    36.998954,
                    -122.055286,
                    40.62,
                    -5,
                    "OuterMclaughlinCrownCollege"
                ]

var OuterHagarBookStoreStevensonCollege = [
                    36.997219,
                    -122.055263,
                    57.52,
                    5,
                    "OuterHagarBookStoreStevensonCollege"
                ]

var OuterHagarFieldHouseEast = [
                    36.994269,
                    -122.055624,
                    69.66,
                    -5,
                    "OuterHagarFieldHouseEast"
                ]

var OuterHagarEastRemote = [
                    36.991304,
                    -122.054784,
                    92.8,
                    -5,
                    "OuterHagarEastRemote"
                ]
 
var OuterHagarLowerQuarryRoad = [
                    36.985984,
                    -122.053706,
                    101.89,
                    0,
                    "OuterHagarLowerQuarryRoad"
                ]

var OuterCoolidgeHagar = [
                    36.981484,
                    -122.051999,
                    180.41,
                    -5,
                    "OuterCoolidgeHagar"
                ] 

var OuterCoolidgeMainEntrance = [
                    36.977468,
                    -122.053582,
                    28.03,
                    -5,
                    "OuterCoolidgeMainEntrance"
                ]

var OuterHighWesternDrive = [
                    36.978694,
                    -122.057741,
                    259.02,
                    -5,
                    "OuterHighWesternDrive"
                ]


var OuterEmpireGradeToscaTerrace = [
                    36.97984,
                    -122.059084,
                    209.46,
                    -5,
                    "OuterEmpireGradeToscaTerrace"
                ]

var OuterEmpireGradeArboretum = [
                    36.983755,
                    -122.064933,
                    181.41,
                    0,
                    "OuterEmpireGradeArboretum"
                ]

var OuterHellerOakesCollege = [
                    36.989899,
                    -122.067078,
                    282.16,
                    -5,
                    "OuterHellerOakesCollege"
                ]

var OuterHellerFamilyStudentHousing = [
                    36.991905,
                    -122.066699,
                    216.25,
                    5,
                    "OuterHellerFamilyStudentHousing"
                ]

var OuterHellerCollegeEightPorter = [
                    36.992896,
                    -122.065127,
                    349.44,
                    5,
                    "OuterHellerCollegeEightPorter"
                ]

var InnerHellerKerrHall = [
                    36.996805,
                    -122.063655,
                    40.17,
                    -5,
                    "InnerHellerKerrHall"
                ]
                
var InnerHellerKresgeCollege = [
                    36.99911,
                    -122.064476,
                    84.33,
                    -10,
                    "InnerHellerKresgeCollege"
                ]

var InnerMcLaughlinScienceHill = [
                    36.999935,
                    -122.062135,
                    142.31,
                    -10,
                    "InnerMcLaughlinScienceHill"
                ]

var InnerMcLaughlinCollegeNineTenHealthCenter = [
                    36.999845,
                    -122.05824,
                    181.55,
                    -5,
                    "InnerMcLaughlinCollegeNineTenHealthCenter"
                ]

var InnerHagarBookstore = [
                    36.996823,
                    -122.055366,
                    212.14,
                    -10,
                    "InnerHagarBookstore"
                ]
  
var InnerHagarEastRemote = [
                    36.991469,
                    -122.054875,
                    201.42,
                    -10,
                    "InnerHagarEastRemote"
                ]
  
var InnerHagarLowerQuarryRd = [
                    36.985671,
                    -122.053489,
                    203.61,
                    -5,
                    "InnerHagarLowerQuarryRd"
                ]

var InnerCoolidgeHagar = [
                    36.981457,
                    -122.052044,
                    334.96,
                    5,
                    "InnerCoolidgeHagar"
                ]

var InnerHighWesternDr = [
                    36.978641,
                    -122.057663,
                    5.51,
                    -5,
                    "InnerHighWesternDr"
                ]

var InnerHighBarnTheater = [
                    36.977237,
                    -122.054173,
                    321.62,
                    -5,
                    "InnerHighBarnTheater"
                ]

var InnerEmpireGradeArboretum = [
                    36.982496,
                    -122.062425,
                    351.79,
                    -5,
                    "InnerEmpireGradeArboretum"
                ]

var InnerHellerOakesCollege = [
                    36.99052,
                    -122.066254,
                    78.52,
                    5,
                    "InnerHellerOakesCollege"
                ]

var InnerHellerCollegeEightPorter = [
                    36.992894,
                    -122.064712,
                    217.81,
                    -5,
                    "InnerHellerCollegeEightPorter"
                ]


var bus_stops = [

  OuterMcLaughlinScienceHill, 
  OuterHellerKresgeCollege, 
  OuterMcLaughlinCollegeNineTenHealthCenter, 
  OuterMclaughlinCrownCollege, 
  OuterHagarBookStoreStevensonCollege, 
  OuterHagarFieldHouseEast, 
  OuterHagarEastRemote, 
  OuterHagarLowerQuarryRoad, 
  OuterCoolidgeHagar, 
  OuterCoolidgeMainEntrance, 
  OuterHighWesternDrive, 
  OuterEmpireGradeToscaTerrace, 
  OuterEmpireGradeArboretum, 
  OuterHellerOakesCollege, 
  OuterHellerFamilyStudentHousing, 
  OuterHellerCollegeEightPorter, 

  InnerHellerKerrHall, 
  InnerHellerKresgeCollege, 
  InnerMcLaughlinScienceHill,
  InnerMcLaughlinCollegeNineTenHealthCenter, 
  InnerHagarBookstore, 
  InnerHagarEastRemote, 
  InnerHagarLowerQuarryRd, 
  InnerCoolidgeHagar, 
  InnerHighWesternDr, 
  InnerHighBarnTheater,
  InnerEmpireGradeArboretum, 
  InnerHellerOakesCollege, 
  InnerHellerCollegeEightPorter 

  ]



})
   
.controller('feedCtrl', function($scope,$ionicModal,$ionicLoading, $state, $http, BusService, innerOrOuter, whichMetroBus) {
	   $ionicModal.fromTemplateUrl('templates/location_modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
      $scope.modal_location = modal;
  });

   $scope.openModal = function() {
   console.log("lol");
     $scope.modal_location.show();
   }

    //close our modal
  $scope.closeModal = function() {
    $scope.modal.hide();
  };

  //Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modal_term.remove();
  });
  // Execute action on hide modal
  $scope.$on('modal.hidden', function() {

  });
  // Execute action on remove modal
  $scope.$on('modal.removed', function() {
    // Execute action
  });


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

  $ionicLoading.show({
	template: "Getting bus information.."
  });

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
               $ionicLoading.hide();

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
    $scope.title = "Metro Bus 15";
    $scope.master_list = [];
    $scope.master_stops = [];
    var tmp_list = [];
    var tmp_stops = [];

    if(whichMetroBus.get_var() == 0){
      
      $scope.title = "Metro Bus 15";
      tmp_list = BusService.get_bus_15();
      tmp_stops = BusService.get_stops_15();
    }else if(whichMetroBus.get_var() == 1){
      $scope.title = "Metro Bus 16";
      tmp_list = BusService.get_bus_16();
      tmp_stops = BusService.get_stops_16();
    }else if(whichMetroBus.get_var() == 2){
      $scope.title = "Metro Bus 10";
      tmp_list = BusService.get_bus_10();
      tmp_stops = BusService.get_stops_10();
    }else if(whichMetroBus.get_var() == 3){
      $scope.title = "Metro Bus 19";
      tmp_list = BusService.get_bus_19();
      tmp_stops= BusService.get_stops_19();
    }else{
      $scope.title = "Metro Bus 20";
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
.controller('locationCtrl', function($scope) {
$scope.o_mclaughlin = function(){
  console.log("clicked on outer mclaughlin");
 }
$scope.o_kresge = function(){
  console.log("clicked on outer kresge");
 }
$scope.nine_ten = function(){
  console.log("clicked on 9/10");
 }
$scope.crown = function(){
  console.log("clicked on crown");
 }
$scope.bookstore = function(){
  console.log("clicked on bookstore");
 }
$scope.f_east = function(){
  console.log("clicked on field house east");
 }
$scope.e_remote = function(){
  console.log("clicked on east remote");
 }
$scope.l_quarry = function(){
  console.log("clicked on lower quarry");
 }
$scope.o_coolidge = function(){
  console.log("clicked on outer coolidge");
 }
$scope.o_coolidgemain = function(){
  console.log("clicked on outer coolidge main");
 }
$scope.o_highW = function(){
  console.log("clicked on outer high west");
 }
$scope.o_empire = function(){
  console.log("clicked on outer empire grade");
 }
$scope.o_emAr = function(){
  console.log("clicked on outer empire and arboretem");
 }
$scope.l_quarry = function(){
  console.log("clicked on lower quarry");
 }
$scope.o_hellerOakes = function(){
  console.log("clicked on outer heller and oakes");
 }
$scope.o_hellerFam = function(){
  console.log("clicked on outer heller and family student housing");
 }
$scope.o_hellerEight = function(){
  console.log("clicked on outer heller and college 8");
 }
$scope.i_hellerKerr = function(){
  console.log("clicked on inner heller and kerr hall");
 }
$scope.i_hellerKresge = function(){
  console.log("clicked on inner heller and Kresge");
 }
$scope.i_mcHill = function(){
  console.log("clicked on inner mclaughlin and science hill");
 }
$scope.i_McNine = function(){
  console.log("clicked on inner mclaughlin and college 9/10");
 }
$scope.i_hagarBook = function(){
  console.log("clicked on inner hagar and bookstore");
 }
$scope.i_hagarEast = function(){
  console.log("clicked on inner hagar and east remote");
 }
$scope.i_hagarQ = function(){
  console.log("clicked on inner hagar and quarry");
 }
$scope.i_coolidgeH = function(){
  console.log("clicked on inner hagar and coolidge");
 }
$scope.i_highW = function(){
  console.log("clicked on inner hagar and western");
 }
$scope.i_highBarn = function(){
  console.log("clicked on inner high and barn theater");
 }
$scope.i_empireAr = function(){
  console.log("clicked on inner empire grade and arboreteum");
 }
$scope.i_hellerOakes = function(){
  console.log("clicked on inner heller and oakes");
 }
$scope.i_hellerEight = function(){
  console.log("clicked on inner heller and eight");
 }
})


.controller('mapCtrl', function($scope, $state ,$cordovaGeolocation,$ionicLoading) {
//  console.log("test");
   var options = {timeout: 10000, enableHighAccuracy: true};


  $cordovaGeolocation.getCurrentPosition(options).then(function(position){
    var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    

    var mapOptions = {
      center: latLng,
      zoom: 16,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);

    //Wait until the map is loaded
    google.maps.event.addListenerOnce($scope.map, 'idle', function(){
     

      var image = { 
        url: 'js/OuterBusStop.png',
      };

      var image1 = {
        url: 'js/InnerBusStop.png'
      }

      //OuterMcLaughlin & Science Hill 1

      var marker1 = new google.maps.Marker({
          position: {lat: 36.999935, lng: -122.062135},
          map:$scope.map,
          icon: image
      });      

      //OuterHeller & Kresge College 2

      var marker2 = new google.maps.Marker({
          position: {lat: 36.999241, lng: -122.064452},
          map:$scope.map,
          icon: image
      });     

      //OuterMcLaughlin College Nine Ten Health Center 3

      var marker3 = new google.maps.Marker({
          position: {lat: 36.999856, lng: -122.058251},
          map:$scope.map,
          icon: image
      });     


      //Outer McLaughlin Crown College 4

      var marker4 = new google.maps.Marker({
          position: {lat: 36.998954, lng: -122.055286},
          map:$scope.map,
          icon: image
      });    

      //Outer Hager BookStore Stevenson College  5

      var marker5 = new google.maps.Marker({
          position: {lat: 36.997219, lng: -122.055263},
          map:$scope.map,
          icon: image
      });    

      //Outer Hagar Field House East 6

      var marker6 = new google.maps.Marker({
          position: {lat: 36.994269, lng: -122.055624},
          map:$scope.map,
          icon: image
      });

      //Outer Hager East Remote 7

      var marker7 = new google.maps.Marker({
          position: {lat: 36.991304, lng: -122.054784},
          map:$scope.map,
          icon: image
      });   

      //Outer Hagar Lower Quarry Road 8

      var marker8 = new google.maps.Marker({
          position: {lat: 36.985984, lng: -122.053706},
          map:$scope.map,
          icon: image
      });

      //Outer Coolidge Hager 9

      var marker9 = new google.maps.Marker({
          position: {lat: 36.981484, lng: -122.051999},
          map:$scope.map,
          icon: image
      });

      //Outer Coolidge Main Entrance 10

      var marker10 = new google.maps.Marker({
          position: {lat: 36.977468, lng: -122.053582},
          map:$scope.map,
          icon: image
      });

      //Outer High Western Drive 11

      var marker11 = new google.maps.Marker({
          position: {lat: 36.978694, lng: -122.057741},
          map:$scope.map,
          icon: image
      });

      // Outer Empire Grade Tosca Terrace 12

      var marker12 = new google.maps.Marker({
          position: {lat: 36.97984, lng: -122.057741},
          map:$scope.map,
          icon: image
      });

      // Outer Empire Grade Arboretum 13

      var marker13 = new google.maps.Marker({
          position: {lat: 36.983755, lng: -122.064933},
          map:$scope.map,
          icon: image
      });

      // Outer Heller Oakes College 14

      var marker14 = new google.maps.Marker({
          position: {lat: 36.989899, lng: -122.067078},
          map:$scope.map,
          icon: image
      });

      //Outer Heller Family Student Housing 15

      var marker15 = new google.maps.Marker({
          position: {lat: 36.991905, lng: -122.066699},
          map:$scope.map,
          icon: image
      });

      //Outer Heller College Eight Porter 16

      var marker16 = new google.maps.Marker({
          position: {lat: 36.992896, lng: -122.065127},
          map:$scope.map,
          icon: image
      });


      //InnerHellerKerrHall 1

      var marker17 = new google.maps.Marker({
          position: {lat: 36.996805, lng: -122.063655},
          map:$scope.map,
          icon: image1
      });      

      //InnerHellerKresge College 2

      var marker18 = new google.maps.Marker({
          position: {lat: 36.99911, lng: -122.064476},
          map:$scope.map,
          icon: image1
      });     

      //InnerMcLaughlinScienceHill 3
      //Changed lattitude
      var marker19 = new google.maps.Marker({
          position: {lat: 36.999770, lng: -122.062135},
          map:$scope.map,
          icon: image1
      });     


      //InnerMcLaughlinCollegeNineTenHealthCenter 4
      //adjusted lattitude
      var marker20 = new google.maps.Marker({
          position: {lat: 36.999745, lng: -122.05824},
          map:$scope.map,
          icon: image1
      });    

      //InnerHagarBookStore  5


      var marker21 = new google.maps.Marker({
          position: {lat: 36.996823, lng: -122.055366},
          map:$scope.map,
          icon: image1
      });    

      //InnerHagarEastRemote 6

      var marker22 = new google.maps.Marker({
          position: {lat: 36.991469, lng: -122.054875},
          map:$scope.map,
          icon: image1

      });

      //InnerHagarLowerQuarryRd 7

      var marker23 = new google.maps.Marker({
          position: {lat: 36.985671, lng: -122.053489},
          map:$scope.map,
          icon: image1
      });   

      //InnerCoolidgeHagar 8

      var marker24 = new google.maps.Marker({
          position: {lat: 36.981457, lng: -122.052044},
          map:$scope.map,
          icon: image1
      });

      //InnerHighWesternDr 9

      var marker25 = new google.maps.Marker({
          position: {lat: 36.975641, lng: -122.057663},
          map:$scope.map,
          icon: image1
      });

      //InnerHighBarnTheater 10

      var marker26 = new google.maps.Marker({
          position: {lat: 36.977237, lng: -122.054173},
          map:$scope.map,
          icon: image1
      });

      //InnerEmpireGradeArboretum 11

      var marker27 = new google.maps.Marker({
          position: {lat: 36.982496, lng: -122.057741},
          map:$scope.map,
          icon: image1
      });

      //InnerHellerOakesCollege 12

      var marker28 = new google.maps.Marker({
          position: {lat: 36.99052, lng: -122.066254},
          map:$scope.map,
          icon: image1
      });

      //InnerHellerCollegeEightPorter 13

      var marker29 = new google.maps.Marker({
          position: {lat: 36.992894, lng: -122.064712},
          map:$scope.map,
          icon: image1
      });

/*
      for (i=1; i<15; i++)
      {
        var marker = new google.maps.Marker({
          position: {lat: (bus_stops[i])[0], lng: (bus_stops[i])[1]},
          map:$scope.map,
          icon: image
         }); 
        

      }
  */    

      var infoWindow1 = new google.maps.InfoWindow({
          content: "Outer McLaughlin & Science Hill"
      });

      google.maps.event.addListener(marker1, 'click', function () {
          infoWindow1.open($scope.map, marker1);
      });

      var infoWindow2 = new google.maps.InfoWindow({
          content: "Outer Heller & Kresge College"
      });

      google.maps.event.addListener(marker2, 'click', function () {
          infoWindow2.open($scope.map, marker2);
      });

      var infoWindow3 = new google.maps.InfoWindow({
          content: "Outer McLaughlin & College 9 & 10 - Health Center"
      });

      google.maps.event.addListener(marker3, 'click', function () {
          infoWindow3.open($scope.map, marker3);
      });

      var infoWindow4 = new google.maps.InfoWindow({
          content: "Outer McLaughlin & Crown College"
      });

      google.maps.event.addListener(marker4, 'click', function () {
          infoWindow4.open($scope.map, marker4);
      });


      var infoWindow5 = new google.maps.InfoWindow({
          content: "Outer Hager & Bookstore & Stevenson College"
      });

      google.maps.event.addListener(marker5, 'click', function () {
          infoWindow5.open($scope.map, marker5);
      });

      var infoWindow6 = new google.maps.InfoWindow({
          content: "Outer Hager & Field House East"
      });

      google.maps.event.addListener(marker6, 'click', function () {
          infoWindow6.open($scope.map, marker6);
      });

      var infoWindow7 = new google.maps.InfoWindow({
          content: "Outer Hager & East Remote"
      });

      google.maps.event.addListener(marker7, 'click', function () {
          infoWindow7.open($scope.map, marker7);
      });

      var infoWindow8 = new google.maps.InfoWindow({
          content: "Outer Hager & Lower Quarry Road"
      });

      google.maps.event.addListener(marker8, 'click', function () {
          infoWindow8.open($scope.map, marker8);
      });

      var infoWindow9 = new google.maps.InfoWindow({
          content: "Outer Coolidge & Hagar"
      });

      google.maps.event.addListener(marker9, 'click', function () {
          infoWindow9.open($scope.map, marker9);
      });

      var infoWindow10 = new google.maps.InfoWindow({
          content: "Outer Coolidge & Main Entrance"
      });

      google.maps.event.addListener(marker10, 'click', function () {
          infoWindow10.open($scope.map, marker10);
      });
    });


  }, function(error){
  //  console.log("Could not get location");
  });
});