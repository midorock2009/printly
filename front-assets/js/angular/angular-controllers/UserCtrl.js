angular.module('printingStore')
		.controller('UserCtrl',UserCtrl);
		
function UserCtrl($scope, $http, $timeout , Upload , $window) {
	$scope.passwords = {};
	$scope.user      = {};
	$scope.updatePassword = updatePassword;
	$scope.updateProfile  = updateProfile;
	$scope.getCountries   = getCountries;
	$scope.getCities   	  = getCities;
	$scope.loadUserProfile= loadUserProfile;
	$scope.arr_countries  = [];
	$scope.arr_cities     = [];

	function updatePassword() {

		var msg1 = $scope.passwords.msg1;
		$.alert.open('confirm',msg1, function(button) {

	        if (button == 'yes')
	        {
	        	
	        	/*alert("YES");*/
	        	$http({
					 	method: 'POST',
					 	url: $scope.module_url+'/update_password',
					  	data: $scope.passwords,
					  	dataType : 'json',
					  	headers: {
						   			'Content-Type': 'application/json'
								}
					}).then(function successCallback(response) 
					{	
						$scope.changePasswordForm.$setPristine();
						$scope.changePasswordForm.$setUntouched();
						$scope.passwords = {};
						if(response.data.status == "success") 
						{
							var str_html = makeStatusMessageHtml('success',response.data.msg);
						    angular.element('#password_status_msg').html(str_html);
			      		} else {
			      			var str_html = makeStatusMessageHtml('danger',response.data.msg);
						    angular.element('#password_status_msg').html(str_html);
			      		}

						$timeout(function() {
							angular.element('#password_status_msg').html("");
						},10000);

					});
	        }
	        else if (button == 'no')
	        {
	        	/*alert("NO");*/
	        	return false;
	        }
	    });
	}	


	function updateProfile() {
		/*alert('JAY');
		return;*/
		var file = {};
		file.upload = Upload.upload(
			  		{
				      url: $scope.module_url+'/update_profile' ,
				      data: $scope.user,
				    });

	    file.upload.then(function (response) 
	    {	
	    	$window.scrollTo(0, 0);
	    	if(response.data.status == "success") {
	    		if(response.data.profile_url_path != "") {
	    			angular.element('#header_profile_img').attr('src', response.data.profile_url_path);
	    		}
				var str_html = makeStatusMessageHtml('success',response.data.msg);
			    angular.element('#profile_status_msg').html(str_html);
      		} else {
      			var str_html = makeStatusMessageHtml('danger',response.data.msg);
			    angular.element('#profile_status_msg').html(str_html);
      		}
	    }, function (response) {
	      if (response.status > 0)
	        $scope.errorMsg = response.status + ': ' + response.data;
	    }, function (evt) {
	      // Math.min is to fix IE which reports 200% sometimes
	      file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
	    });
	}	

	function getCities() {
		var country_id = $scope.user.country;
		$http({
		 	method: 'GET',
		 	url: $scope.module_url+'/get_cities?country_id='+country_id,
		}).then(function successCallback(response) 
		{	
			$scope.arr_cities = response.data.arr_cities;
		});	
	}

	function getCountries() {
		$http({
		 	method: 'GET',
		 	url: $scope.module_url+'/get_countries',
		}).then(function successCallback(response) 
		{	
			$scope.arr_countries = response.data.arr_countries;
			loadUserProfile();	
		});	
	}

	function loadUserProfile() {

		$http({
		 	method: 'GET',
		 	url: $scope.module_url+'/get_user_profile',
		}).then(function successCallback(response) 
		{	
			$scope.user = response.data.arr_user;
			getCities();
			$scope.filepreview = response.data.arr_user.profile_url_path;
		});		
	}
}