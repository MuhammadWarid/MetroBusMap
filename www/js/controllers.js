angular.module('controllers', [])

.controller('PlaceCtrl', function($scope, place){
  // $scope.place = place;
})
.controller('MapRouteCtrl', function($scope, $document,  $cordovaGeolocation, $ionicLoading){
  // Central Park location
      console.log(this);
      console.info("LOADED");
         
        // instantiate google map objects for directions
        var directionsDisplay = new google.maps.DirectionsRenderer();
        var directionsService = new google.maps.DirectionsService();
        var geocoder = new google.maps.Geocoder();
        

        $cordovaGeolocation.getCurrentPosition({
         timeout: 10000,
         enableHighAccuracy: true
         })

        .then(function(position){
            $scope.position1 = position;
             $ionicLoading.hide().then(function(){
              console.log(position);
             $scope.latitude = position.coords.latitude;
             $scope.longitude = position.coords.longitude;

             });
        });

        // marker object
        $scope.marker = {
          center: {
              latitude: $scope.latitude,
              longitude: $scope.longitude
          }
        }


      $scope.map = {
          control: {},
          center: {
              latitude: $scope.latitude,
              longitude: $scope.longitude
          },
          zoom: 14
      }


        // directions object -- with defaults
        $scope.directions = {
          origin:  $scope.position1,
          destination: "Maputo , Mozambique",
          showList: false
        }
        
        // get directions using google maps api
        $scope.getDirections = function () {
          var request = {
            origin: $scope.directions.origin,
            destination: $scope.directions.destination,
            travelMode: google.maps.DirectionsTravelMode.WALKING

          };
          directionsService.route(request, function (response, status) {
            if (status === google.maps.DirectionsStatus.OK) {
              directionsDisplay.setDirections(response);
              directionsDisplay.setMap($scope.map.control.getGMap());
              directionsDisplay.setPanel(document.getElementById('directionsList'));
              $scope.directions.showList = true;
            } else {
              alert('Google route unsuccesfull!');
            }
          });
        }


});
