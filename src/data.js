(function() {
	'use strict';

	angular.module('mcq')
		.factory('mcqData', data);

	data.$inject = ['$http'];

	function data($http) {

		var loadedData = [];

		function load(fqFilename) {
			return $http.get(fqFilename)
				.then(function(response) {
					if (response && angular.isArray(response.data)) {
						loadedData.concat(response.data);
					}
				});
		}

		return {
			load: load,
			data: loadedData
		};
	}
})();