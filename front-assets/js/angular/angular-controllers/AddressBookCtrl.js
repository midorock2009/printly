angular.module('printingStore')
		.controller('AddressBookCtrl',AddressBookCtrl);


function AddressBookCtrl($scope, $http, $timeout , $window) {
	$scope.address                 = {};
	$scope.storeAddress            = storeAddress;
	$scope.loadAddresses           = loadAddresses;
	$scope.getCountries            = getCountries;
	$scope.getCities   	           = getCities;
	$scope.getAddressDetails       = getAddressDetails;
	$scope.CancelEditMode          = CancelEditMode;
	$scope.deleteAddress           = deleteAddress;
	$scope.address.edit_address_id = "";
	$scope.arr_countries           = [];
	$scope.arr_cities              = [];
	$scope.arr_addresses           = [];
	$scope.addressLimitReached     = false;
	$scope.address.country         = '186';
	$scope.EditMode = false;

	function storeAddress() {
		$http({
		 	method: 'POST',
		 	url: $scope.module_url+'/save_address',
		  	data: $scope.address,
		  	dataType : 'json',
		  	headers: {
			   			'Content-Type': 'application/json'
					}
		}).then(function successCallback(response) 
		{		
			if(response.data.status == "success") {	
				var str_html = makeStatusMessageHtml('success',response.data.msg);
			    angular.element('#status_msg').html(str_html);
				loadAddresses();
      		} else {
      			var str_html = makeStatusMessageHtml('danger',response.data.msg);
			    angular.element('#status_msg').html(str_html);
      		}

      		$window.scrollTo(0, 0);

      		$scope.addressForm.$setPristine();
			$scope.addressForm.$setUntouched();
			if($scope.EditMode == false) {
				$scope.address = {};
			}

			$timeout(function() {
				angular.element('#status_msg').html("");
			},10000);

		});
	}	
	
	function getCities() {
		var country_id = $scope.address.country;
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
		});	
	}

	function loadAddresses() {
		$http({
		 	method: 'GET',
		 	url: $scope.module_url+'/get_addresses',
		}).then(function successCallback(response) 
		{	

			
			$scope.arr_addresses = response.data.arr_addresses;


			if(response.data.arr_addresses.length == 6 && $scope.EditMode == false) {  /*only 6 address books can be added*/

				$scope.addressLimitReached = true;
				
			} else {
				$scope.addressLimitReached = false;
			}
			$("#parent-address-book").show();
		});		
	}
	
	function getAddressDetails(address_id) {
		$http({
		 	method: 'GET',
		 	url: $scope.module_url+'/get_address_details?address_id='+address_id,
		}).then(function successCallback(response) 
		{	
			if(response.data.status == 'success' ) {
				$scope.addressLimitReached = false; // to show edit info.
				$scope.EditMode = true;
				$scope.address  = response.data.arr_address;
				$scope.address.city = String(response.data.arr_address.city);
				getCities();
				$scope.address.edit_address_id = response.data.arr_address.address_id != undefined ? response.data.arr_address.address_id : "";
			} else {
				var str_html = makeStatusMessageHtml('danger',response.data.msg);
			    angular.element('#status_msg').html(str_html);
				
				$timeout(function() {
				angular.element('#status_msg').html("");
				},10000);
			}
		});
	}
	
	function CancelEditMode() {
	 	$scope.EditMode = false;
	 	$scope.address                 = {};
	 	$scope.address.edit_address_id = "";
	 	loadAddresses();
	}

	function deleteAddress(address_id) {

		$.alert.open('confirm', $window.are_you_sure_you_want_to_delete_address, function(button) {
			if (button == 'yes') {
				$http({
				 	method: 'GET',
				 	url: $scope.module_url+'/delete_address?address_id='+address_id,
				}).then(function successCallback(response) 
				{	
					if(response.data.status == 'success' ) {
						loadAddresses();
						var str_html = makeStatusMessageHtml('success',response.data.msg);
					    angular.element('#status_msg').html(str_html);				
					} else {
						var str_html = makeStatusMessageHtml('danger',response.data.msg);
					    angular.element('#status_msg').html(str_html);				
					}

					CancelEditMode();

					$timeout(function() {
					angular.element('#status_msg').html("");
					},10000);
				});
			} else if (button == 'no') {
				return false;
			} else {
				return false;
			}
		});		
	}

	$(document).ready(function(){
	getCities();
	});

}