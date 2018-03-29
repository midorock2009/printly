angular.module('printingStore')
		.controller('CMSCtrl',CMSCtrl);

function CMSCtrl($scope, $http , vcRecaptchaService) 
{
	
	/* scope for contact enquiery*/
	$scope.enquiry = {};
	$scope.storeContactEnquiry = storeContactEnquiry;
   
    /* scope for help enquiery*/
    $scope.help={};
    $scope.storeHelpEnquiry =  storeHelpEnquiry;

   
	function storeContactEnquiry()
	{
		$http({
		 	method: 'POST',
		 	url: $scope.module_url,
		  	data: $scope.enquiry,
		  	dataType : 'json',
		  	headers: {
			   			'Content-Type': 'application/json'
					}
		}).then(function successCallback(response) 
		{	
			if(response.data.status == "success") {	
				var str_html = makeStatusMessageHtml('success',response.data.msg);
			    angular.element('#status_msg').html(str_html);
				resetForm();
      		} else {
      			var str_html = makeStatusMessageHtml('danger',response.data.msg);
			    angular.element('#status_msg').html(str_html);
      		}
		});
	}

	function resetForm() {
	    $scope.enquiry = {};
	    $scope.contactUsForm.$setPristine();
	    $scope.contactUsForm.$setUntouched();
	}

	function storeHelpEnquiry()
	{
		$http({
	        method: 'POST',
	 	    url: $scope.module_url,
		  	data: $scope.help,
		  	dataType : 'json',
		  	headers: {
			   			'Content-Type': 'application/json'
					}
			}).then(function successCallback(response)
		{
				if(response.data.status == "success") {	
					var str_html = makeStatusMessageHtml('success',response.data.msg);
				    angular.element('#status_msg').html(str_html);
					

					$scope.help = {};
				    $scope.helpPageForm.$setPristine();
				    $scope.helpPageForm.$setUntouched();
				    grecaptcha.reset();


	      		} else {
	      			var str_html = makeStatusMessageHtml('danger',response.data.msg);
				    angular.element('#status_msg').html(str_html);
	      		}
		});
	}	

	$scope.response = null;	
	$scope.widgetId = null;

	$scope.model = {
						key: '6LeCphsUAAAAAOsLqY83beg0RIeero-vC8uxR4-G'
					};

	$scope.setResponse = function (response) {
		console.info('Response available');
		$scope.response = response;
	};

	$scope.setWidgetId = function (widgetId) {
		console.info('Created widget ID: %s', widgetId);
		$scope.widgetId = widgetId;
	};

	$scope.cbExpiration = function() {
		console.info('Captcha expired. Resetting response object');
		vcRecaptchaService.reload($scope.widgetId);
		$scope.response = null;
	};

}