// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ngCordova'])
  .controller('MapController', function($scope, $cordovaGeolocation, $ionicLoading) {
    ionic.Platform.ready(function() {
      $ionicLoading.show({
        template: '<ion-spinner icon="bubbles"></ion-spinner><br/>Acquiring location!'
      })

      var posOptions = {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 0
      }

      $cordovaGeolocation.getCurrentPosition(posOptions)
        .then(function(position) {
          var lat = position.coords.latitude
          var long = position.coords.longitude

          var myLatlng = new google.maps.LatLng(lat, long)

          var mapOptions = {
            center: myLatlng,
            zoom: 16,
            mapTypeId: google.maps.MapTypeId.ROADMAP
          }
          var map = new google.maps.Map(document.getElementById("map"), mapOptions)
          $scope.map = map
          $ionicLoading.hide()

          var marker = new google.maps.Marker({
            position: myLatlng,
            map: map,
            title: 'u here',
            draggable: true,
            animation: google.maps.Animation.DROP
          })

          marker.addListener('click', toggleBounce)

          function toggleBounce() {
            if (marker.getAnimation() !== null) {
              marker.setAnimation(null)
            } else {
              marker.setAnimation(google.maps.Animation.BOUNCE)
            }
          }
        }, function(err) {
          $ionicLoading.hide()
          console.log(err)
        })
    })
  })
  .run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      if(window.cordova && window.cordova.plugins.Keyboard) {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true)

        // Don't remove this line unless you know what you are doing. It stops the viewport
        // from snapping when text inputs are focused. Ionic handles this internally for
        // a much nicer keyboard experience.
        cordova.plugins.Keyboard.disableScroll(true)
      }
      if(window.StatusBar) {
        StatusBar.styleDefault()
      }
    })
  })
