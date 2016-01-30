angular.module('app.controllers', [])
  
.controller('loopCtrl', function($scope,$ionicModal) {
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

  
})
   
.controller('feedCtrl', function($scope, $http) {


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
                 bus_16.push(bus_row)

               }

               for(var test = 0; test < bus_16.length; test++){
               	console.log(bus_16[test]);
               }
               
               	
               
               


               
                
                
            })
            .error(function() {
                defer.reject('could not find someFile.json');
            });
})
   
.controller('mapCtrl', function($scope) {

})
    