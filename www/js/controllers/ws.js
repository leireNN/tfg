
angular.module('ws', [])//Declaramos el modulo
	.factory('ws', function($http, $q) { //declaramos la factory
		var path = "http://localhost:3000";//API path
		return {
			//Login
      getPatients : function(){ //Retornara la lista de posts


        var defered = $q.defer();
        var promise = defered.promise;

        $http.get(path).success(function(data) {
                defered.resolve(data);
            })
            .error(function(err) {
                defered.reject(err)
            });

        return promise;
			},

			getPatient : function(id){ //retornara el post por el id
				global = $http.get(path+'posts/'+id);
				return global;
			}
		}
	});
