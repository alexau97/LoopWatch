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
//29 buttons
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


