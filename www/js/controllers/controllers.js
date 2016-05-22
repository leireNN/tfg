
angular.module('starter.controllers', ['ws'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})
.controller('Login', ['$scope','$state', 'ws', '$q', function($scope, $state, ws, $q) {
  $scope.posts={};
	getAllPosts = function(){

		ws.getPatients().then(function (data){
			console.log("DATA: " + data);
		}).catch(function(err) {
      console.log("Error en la petición de base de datos.");
    });

	}

  $scope.doLogin = function(){
    getAllPosts();
    if($scope.loginData.username == "Leire" && $scope.loginData.password == "1234"){
      console.log("Haciendo login...");
      $state.go('app.homeRecord');
    }else{
      console.log("Error en el login!");
    }

  };
}])

.controller('HomeRecordCtrl', function($scope) {
  //$scope.textTranslate = "Texto traducido";
  $scope.record = function(){
    console.log("Reconocimiento de voz");
    if (window.cordova) {
      var maxMatches = 5;
      var promptString = "Speak now"; // optional
      var language = "en-US";                     // optional
      window.plugins.speechrecognizer.startRecognize(function(result){
        $scope.textTranslate = result[0];
        $scope.$apply();
        if(result[0] == "hello")
        {
          TTS
          .speak({
              text: 'hello, i´m Moi!',
              locale: 'en-US',
              rate: 0.75
          }, function () {
              //alert('success');
          }, function (reason) {
              alert(reason);
          });
          //alert(result);
        }
      }, function(errorMessage){
          console.log("Error message: " + errorMessage);
      }, maxMatches, promptString, language);
    }
    //Introducir voz y transformar en texto para envío
    //Pasar el texto al scope para que se vea en la pantalla
  };

  $scope.speech = function (){
    TTS
      .speak({
          text: 'hello, world!',
          locale: 'en-GB',
          rate: 0.75
      }, function () {
          alert('success');
      }, function (reason) {
          alert(reason);
      });
  };
});
