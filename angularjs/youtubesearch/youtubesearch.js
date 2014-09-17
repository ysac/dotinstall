var mainCtrl = function($scope, $http) {
	$scope.doSearch = function() {
		var url = 'https://gdata.youtube.com/feeds/api/videos?'
			+ [
				'q=' + encodeURIComponent($scope.query),
				'alt=json',
				'max-results=10',
				'v=2',
				'callback=JSON_CALLBACK'
			].join('&');
		$http.jsonp(url).success(function(data) {
			console.dir(data);
			$scope.results = data.feed.entry;
		});
	}

}