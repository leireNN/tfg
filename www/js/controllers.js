
angular.module('starter.controllers', ['ws', 'ionic-timepicker', 'ngCordova'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {
    isResponsable: false
  };

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/alarmDetail.html', {
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

.controller('Register',['$scope','$state', 'ws', '$q', '$ionicPopup',
  function($scope, $state, ws, $q, $ionicPopup) {
    console.log("Register controller");
    $scope.registerData = {};
    $scope.showTerms = function(){
      $state.go('app.terms');
    };

    //Registro
    $scope.register = function(){
      console.log("registering...");
      var pass = null;
      if($scope.registerData.password == $scope.registerData.password2){
       pass = $scope.registerData.password;
      }

      ws.register($scope.registerData).then(function (result){
        console.log("DATA: " + JSON.stringify(result));
        $state.go('app.login');
      }).catch(function(err) {
        console.log("Error en el registro del usuario.");
        showAlert();
      });

    };
    $scope.goLogin = function(){
      $state.go('app.login');
    };

    showAlert = function() {
     var alertPopup = $ionicPopup.alert({
       title: 'ERROR EN EL REGISTRO',
       template: 'Please check data.'
     });
   };
  }
])


.controller('Pills', function($scope) {
  console.log("Pills controller2");
  $scope.playlists = [
    { title: 'Nolotil', id: 1, time: '10:30' },
    { title: 'Primperan', id: 2, time: '10:00' },
    { title: 'Ibuprofeno', id: 3, time: '16:30' },
    { title: 'Doxazosina', id: 4, time: '22:00' },
    { title: 'Dalsy', id: 5, time: '22:30' },
    { title: 'Astorbastatina', id: 6, time: '16:00' }
  ];

})

.controller('Settings', function($scope) {
  console.log("Settings controller...");

})

.controller('Info', ['$scope', '$interval', '$state', 'ws', '$q', '$ionicPopup',
  function($scope, $interval, $state, ws, $q, $ionicPopup) {
  console.log("Info controller...");
  function getLastConversations(){
      var number = 2;
      console.log("Reading last " + number + " alarms...");
      ws.getLastConversations(localStorage.getItem("userId"), number).then(function (result){
        console.log("DATA: " + JSON.stringify(result));
        $scope.conversations = [];
        for(var conversation in result.data){
          console.log(conversation + "******" + JSON.stringify(result.data[conversation]));

          var time = result.data[conversation].time;
          time = time.replace("T", " ");
          time = time.substring(0,19);

          $scope.conversations.push({ userText: result.data[conversation].userText + conversation, id:result.data[conversation].userId , time: time, iaText: result.data[conversation].iaText });
        }
      }).catch(function(err) {
        console.log("Error en la petición de base de datos.");
      });
  };
  function readAlarms() {
      ws.getAlarms(localStorage.getItem("userId")).then(function (result){
        // console.log("DATA: " + JSON.stringify(result, null, 2));
        console.warn('hola', result, 23);
        // $scope.alarms = [];
        $scope.alarms = result.data.map(function (alarm) {
          alarm.time = alarm.time
            .replace("T", " ")
            .substring(0, 19);
          return alarm;
        });
        // for(var alarm in result.data){
        //
        //   var time = result.data[alarm].time;
        //   time = time.replace("T", " ");
        //   time = time.substring(0,19);
        //
        //   $scope.alarms.push({ title: result.data[alarm].userText, id:result.data[alarm].userId , time: time });
        // }
      }).catch(function(err) {
        console.log("Error en la petición de base de datos.");
      });


  }

  var DELAY = 3000;
  $interval(readAlarms, DELAY);
  $interval(getLastConversations, DELAY);
  readAlarms();
  getLastConversations();

  $scope.resize = function($event){
    console.log("Resizing...");
    // var element = document.getElementById("page_content");
    if($event) {
      element = $event.target;
      element.style.height = element.scrollHeight + "px";
    }
  };
}])

.controller('ResetPass', function($scope) {
  console.log("ResetPass controller");
  $scope.sendEmail = function(){
    console.log("Sending email to reset password...");
  };

})

.controller('Terms', function($scope) {
  console.log("Terms controller");

})


.controller('Historial', function($scope) {
  console.log("Historial controller...");

  $scope.historial = [
    { title: 'It hurt, i´m really feel bad.', id: 1, time: '10:30' },
    { title: 'I already took the pill , I do not feel very well, I have to rest', id: 2, time: '10:00' },
    { title: 'Its hot I feel suffocated', id: 6, time: '16:00' }
  ];

  $scope.resize = function(){
    console.log("Resizing...");
    var element = document.getElementById("page_content");
    element.style.height = element.scrollHeight + "px";
  };

})


.controller('PillDetail', function($scope, ionicTimePicker) {
  console.log("Pills detail controller");

  $scope.openTime = function(){
    console.log("openTime function");
    var ipObj1 = {
    callback: function (val) {      //Mandatory
      if (typeof (val) === 'undefined') {
        console.log('Time not selected');
      } else {
        var selectedTime = new Date(val * 1000);
        var time = selectedTime.getUTCHours() + ":" +
          selectedTime.getUTCMinutes() + "";
        console.log(time);
        $scope.timeValue = time;
      }
    },
      inputTime: 50400,   //Optional
      format: 24,         //Optional
      step: 15,           //Optional
      setLabel: 'Set2'    //Optional
    };

    ionicTimePicker.openTimePicker(ipObj1);
  }
})

.controller('Login', ['$scope','$state', 'ws', '$q', '$ionicPopup',
  function($scope, $state, ws, $q, $ionicPopup) {
    $scope.posts={};
  	getAllPatients = function(){
  		ws.getPatients().then(function (data){
  			console.log("DATA: " + data);
  		}).catch(function(err) {
        console.log("Error en la petición de base de datos.");
      });
  	};
    login = function(username, password){
      ws.login().then(function (result){
        console.log("DATA: " + result);
      }).catch(function(err) {
        console.log("Error en la petición de base de datos.");
      });
    };
    showAlert = function() {
     var alertPopup = $ionicPopup.alert({
       title: 'User or password incorrect!',
       template: 'Please check data.'
     });
   };

   $scope.doLogin = function(){
      //getAllPatients();
      if($scope.loginData.username === null ||
            $scope.loginData.password === null) {
          showAlert();
      } else {
        ws.login($scope.loginData.username, $scope.loginData.password)
          .then(function (result){
            console.log("DATA: " + JSON.stringify(result.data));
            if(result.data.result){
              localStorage.setItem("userId", result.data.userId);
              localStorage.setItem("username", $scope.loginData.username);
              //TO-DO Distinguir entre usuario dependiente y usuario responsable


              if($scope.loginData.isResponsable === true){
                $state.go('app.info');
              }else{
                $state.go('app.homeRecord');
              }
            } else {
              showAlert();
            }
          }
        ).catch(function(err) {
          showAlert();
          console.log("Error en la petición de base de datos." + JSON.stringify(err));
        });
      }
      // if($scope.loginData.username == "Leire" &&
      //   $scope.loginData.password == "1234") {
      //     console.log("Haciendo login...");
      //     $state.go('app.homeRecord');
      // }else{
      //   console.log("Error en el login!");
      // }
    };

    $scope.goToRegister = function(){
      $state.go('app.register');
    };

    $scope.resetPass = function(){
      $state.go('app.resetPass');
    };
  }
])

.controller('HomeRecordCtrl',['$scope','$state', 'ws', '$q', '$ionicPopup', '$rootScope', '$ionicPlatform', '$cordovaLocalNotification',
  function($scope, $state, ws, $q, $ionicPopup, $rootScope, $ionicPlatform, $cordovaLocalNotification) {
  //$scope.textTranslate = "Texto traducido";

  //Seteando las alarmas.

  $ionicPlatform.ready(function () {

    // ========== Scheduling

    $scope.add = function () {
      var now = new Date().getTime();
      var _10SecondsFromNow = new Date(now + 10 * 1000);

      $cordovaLocalNotification.schedule({
        id: 1,
        title: 'Title here',
        text: 'Text here',
        at: _10SecondsFromNow
      }).then(function (result) {
        console.log("OK");
      });
    };

    $scope.isScheduled = function() {
        $cordovaLocalNotification.isScheduled("1").then(function(isScheduled) {
            alert("Notification 1234 Scheduled: " + isScheduled);
        });
    }



  });

  $scope.record = function(){
    console.log("Reconocimiento de voz");

    recordSpeech();

    //Introducir voz y transformar en texto para envío
    //Pasar el texto al scope para que se vea en la pantalla
  };

  function recordSpeech(){
    if (window.cordova) {
      var maxMatches = 5;
      var promptString = "Speak now"; // optional
      var language = "es-ES";                     // optional
      window.plugins.speechrecognizer.startRecognize(function(result){
        $scope.textTranslate = result[0];
        $scope.$apply();
        console.log("Realizando petición con texto: " + result[0]);
        ws.sendSpeech(result[0]).then(function (result){
          console.log("DATA: " + JSON.stringify(result.data));
          $scope.textResponse = result.data;
          TTS
          .speak({
              text: result.data,
              locale: 'es-ES',
              rate: 0.75
          }, function () {
              //alert('success');
          }, function (reason) {
              alert(reason);
          });

          recordSpeech();
        }).catch(function(err) {
          console.log("Error en la petición de base de datos.");
        });
        if(result[0] == "hello")
        {
          TTS
          .speak({
              text: 'Hola soy mooi',
              locale: 'es-ES',
              rate: 0.75
          }, function () {
              //alert('success');
          }, function (reason) {
              alert(reason);
          });
          //alert(result);
        }else{

        }
      }, function(errorMessage){
          console.log("Error message: " + errorMessage);
      }, maxMatches, promptString, language);
    }
  };

  $scope.speech = function (){
    TTS
      .speak({
          text: 'hello, world!',
          locale: 'es-ES',
          rate: 0.75
      }, function () {
          alert('success');
      }, function (reason) {
          alert(reason);
      });
  };

  $scope.logout = function(){
    console.log("Logout...");
    $state.go('app.login');
  };
}]);
