
angular.module('ws', [])//Declaramos el modulo
	.factory('ws', function($http, $q) { //declaramos la factory
		var path = "http://localhost:3000/";//API path

		function getPath() {
			// return $routeScope.url || path;
			return path;
		}

		return {
			//Login
      getPatients : function(){ //Retornara la lista de posts
        var defered = $q.defer();
        var promise = defered.promise;

        $http.get(getPath())
					.success(function(data) {
            defered.resolve(data);
          })
        	.error(function(err) {
            defered.reject(err)
          });

        return promise;
				// return $http.get(getPath());
			},

			getPatient : function(id){ //retornara el post por el id
				global = $http.get(getPath()+'posts/'+id);
				return global;
			},

			login : function(username, password){
				var defered = $q.defer();
        var promise = defered.promise;
				var data = {
					username: username,
					password: password
				};
				$http.defaults.headers.post["Content-Type"] = "application/json";
				$http({
	        url: getPath() + 'users/login',
	        method: "POST",
	        data: data
			  }).then(function(response) {
			            // success
					defered.resolve(response);
			  },
			  function(response) { // optional
			            // failed
					defered.reject(response);
			  });
				return promise;
			},

			register : function(userData){
				var defered = $q.defer();
        var promise = defered.promise;
				console.log("User Data: " +  JSON.stringify(userData));
				$http.defaults.headers.post["Content-Type"] = "application/json";
				$http({
	        url: getPath() + 'users/register',
	        method: "POST",
	        data: userData
			  }).then(function(response) {
			            // success
					defered.resolve(response);
			  },
			  function(response) { // optional
			            // failed
					//TO-DO hacer pop-up de error
					defered.reject(response);
			  });
				return promise;
			},

			sendSpeech : function(text){
				var defered = $q.defer();
        var promise = defered.promise;
				var data = {
					userText: text,
					userId: localStorage.getItem("userId")
				};
				console.log("Envío de texto con : " + text + "Y ruta : " + getPath());
				$http.defaults.headers.post["Content-Type"] = "application/json";
				$http({
	        url: getPath() + 'text',
	        method: "POST",
	        data: data
			  }).then(function(response) {
			            // success
					defered.resolve(response);
			  },
			  function(response) { // optional
			            // failed
					defered.reject(response);
			  });
				return promise;
			},

			getAlarms : function(userId){
				var defered = $q.defer();
        var promise = defered.promise;
				var data = {
					userId: userId
				};
				$http.defaults.headers.post["Content-Type"] = "application/json";
				$http({
	        url: getPath() + 'users/alarms',
	        method: "POST",
	        data: data
			  }).then(function(response) {
			            // success
					defered.resolve(response);
			  },
			  function(response) { // optional
			            // failed
					defered.reject(response);
			  });
				return promise;
			},

			getNotifications : function(username){
				var defered = $q.defer();
        var promise = defered.promise;
				var data = {
					username: username
				};
				$http.defaults.headers.post["Content-Type"] = "application/json";
				$http({
	        url: getPath() + 'users/getNotifications',
	        method: "POST",
	        data: data
			  }).then(function(response) {
			            // success
					defered.resolve(response);
			  },
			  function(response) { // optional
			            // failed
					defered.reject(response);
			  });
				return promise;
			},

			getLastConversations: function(userId, number){
				var defered = $q.defer();
				var promise = defered.promise;
				var data = {
					userId: userId,
					number: number
				};
				$http.defaults.headers.post["Content-Type"] = "application/json";
				$http({
	        url: getPath() + 'users/getLastConversations',
	        method: "POST",
	        data: data
			  }).then(function(response) {
			            // success
					defered.resolve(response);
			  },
			  function(response) { // optional
			            // failed
					defered.reject(response);
			  });
				return promise;
			},

			updateAlarms : function(username, time, description){
				var defered = $q.defer();
        var promise = defered.promise;
				var data = {
					username: username,
					time: time,
					description: description
				};
				$http.defaults.headers.post["Content-Type"] = "application/json";
				$http({
	        url: getPath() + 'users/updateAlarms',
	        method: "POST",
	        data: data
			  }).then(function(response) {
			            // success
					defered.resolve(response);
			  },
			  function(response) { // optional
			            // failed
					defered.reject(response);
			  });
				return promise;
			},

			setPath : function(newPath) {
				path = newPath;
			},

			getPath : getPath

		}
	});
