angular.module('printingStore')
		.controller('LoginCtrl',LoginCtrl);

function LoginCtrl($scope, $http, $timeout ) 
{
	/* reset form */
	$scope.resetForm       = resetForm;
	$scope.resetSignupForm = resetSignupForm;
	$scope.module_url      = "";

	/* login form */
	$scope.user                  = {};
	$scope.storeLogin            = storeLogin;
	/*$scope.signupuser.usertype = 'consumer';*/

    /* signup form */
	$scope.signupuser            = {};
	$scope.storeSignup           = storeSignup;

	/* forget password form*/
	$scope.forgetuser            = {};
	$scope.storeForgetPassword   = storeForgetPassword;

	$scope.resetpassword         = {};
	$scope.storeResetPassword    = storeResetPassword;

	

	/* check user email duplication */
	$scope.arr_countries = {};
	$scope.getCountries=getCountries;
	
	$scope.arr_university = {};
	$scope.getUniversity=getUniversity;


	$scope.checkEmailExist=checkEmailExist;

	/* check user mobile number duplication */
	$scope.checkMobileExist=checkMobileExist;

	/*On chnage user type add the updated labels*/
	$scope.showEmailLabel        = true;
	$scope.showCompanyEmailLabel = false;
	$scope.showCompanyName       = false;

	$scope.$watch('signupuser.usertype',function (new_val) {
		if(new_val == 'corporate') {

			$scope.showEmailLabel             = false;
			$scope.showCompanyEmailLabel      = true;
			$scope.showCompanyName            = true;
			$scope.signupuser.password        = null;
			$scope.signupuser.confirmpassword = null;

			$scope.signupuser.password1        = null;
			$scope.signupuser.confirmpassword1 = null;

			

		} else {
			$scope.showEmailLabel             = true;
			$scope.showCompanyEmailLabel      = false;
			$scope.showCompanyName            = false;
			$scope.signupuser.password        = null;
			$scope.signupuser.confirmpassword = null;
			
		}
	});

	/* check email duplicate*/
	function checkEmailExist()
	{
		var email=$scope.signupuser.email;
		var re = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/igm;
		if (re.test(email))
		{
			$http({
					method:'GET',
					url: $scope.module_url+'/user/check_email?email='+email,
				    dataType : 'json',
				  	headers: {
					   			'Content-Type': 'application/json'
							}
			}).then(function successCallback(response)
			{
				if(response.data.status == "error") 
				{
					angular.element('#err_email').html(response.data.msg);
					return false;
				}
				else
				{
					angular.element('#err_email').html("");	
					return false;
				}

				$timeout(function () {
					angular.element('#err_email').html("");		
				}, 10000);

			});
		}
		else
		{
			return false;
		}
	}

	function getCountries(){
		$http({
				method:'GET',
				url: $scope.module_url+'/user/get_all_countries',
			    dataType : 'json',
			  	headers: {
				   			'Content-Type': 'application/json'
						}
		}).then(function successCallback(response)
		{
			if(response.data.status == "success") 
			{
				$scope.arr_countries = response.data.arr_countries;
				$scope.signupuser.country_id = '186';
				getUniversity(186);
			}
		});
	}

	function getUniversity(country_id){
		$scope.arr_university = {};
		if(country_id!=undefined){

			$http({
				method:'GET',
				url: $scope.module_url+'/user/get_all_university?country_id='+country_id,
			    dataType : 'json',
			  	headers: {
				   			'Content-Type': 'application/json'
						}
			}).then(function successCallback(response)
			{
				if(response.data.status == "success") 
				{
					$scope.arr_university = response.data.arr_university;
				}
			});
		}
	}
	/* check email duplicate*/
	
	function checkMobileExist()
	{
		var mobile=$scope.signupuser.phone;
		if(mobile == undefined)
		{
			return false;
		}
		else{
			$http({
					method:'GET',
					url: $scope.module_url+'/user/check_mobile?mobile='+mobile,
				    dataType : 'json',
				  	headers: {
					   			'Content-Type': 'application/json'
							}
			}).then(function successCallback(response)
			{	
				if(response.data.status == "error") 
				{
					angular.element('#err_mobile').html(response.data.msg);
				}
				else
				{
					angular.element('#err_mobile').html("");
				}

				$timeout(function () {
					angular.element('#err_mobile').html("");		
				}, 10000); 

			});
		}
	}

	/* login form sumbit */
	function storeLogin() 
	{  
		var password = $scope.user.password;
		var encPwd   = CryptoJS.MD5(password).toString();
		$scope.user.password = encPwd;
		$http({
		 	method: 'POST',
		 	url: $scope.module_url,
		  	data: $scope.user,
		  	dataType : 'json',
		  	headers: {
			   			'Content-Type': 'application/json'
					}
		}).then(function successCallback(response) 
		{	
			if(response.data.status == "success") 
			{
				window.location.href = response.data.redirectTo;
				return;
      		} else {
      			var str_html = makeStatusMessageHtml('danger',response.data.msg);
			    angular.element('#login_status_msg').html(str_html);
			    angular.element('#login_status_msg1').html(str_html);
			    $scope.user.password = "";
      		}
      		
      		$scope.loginForm.$setPristine();
	    	$scope.loginForm.$setUntouched();
	    	$scope.user = {};

      		$timeout(function () {
				angular.element('#login_status_msg').html("");	
				angular.element('#login_status_msg1').html("");	
			}, 5000);

		});
	}

	/* Reset login form*/ 
	$scope.$on("triggerReset", function (event, args) {
       	if($scope.loginForm != undefined) {
       		$scope.user             = {};
       		$scope.signupuser       = {};
        	$scope.signupuser.phone = "";
       	}
    });

	function resetForm() 
	{
	    $scope.loginForm.$setPristine();
	    $scope.loginForm.$setUntouched();
	    $scope.user = {};
	    angular.element('#login_status_msg').html("");		
	}

	$scope.signupuser = {};

	/* reset signup form*/
	function resetSignupForm()
	{
	    $scope.signupForm.$setPristine();
	    $scope.signupForm.$setUntouched();
		$scope.signupuser = {};
		angular.element('#signup_status_msg').html("");		
	}

	/* signup form submit*/

	function storeSignup()
	{
		/*checkEmailExist();*/
		var encPwd ='';
		var encCwd ='';

		$http({
			method:'POST',
			url:$scope.module_url+'/register',
			data:$scope.signupuser,
			dataType:'json',
			headers: {
			   			'Content-Type': 'application/json'
					}
		}).then(function successCallback(response)
		{  
			
			if(response.data.status == "success") 
			{

				var str_html = makeStatusMessageHtml('success',response.data.msg);
			    angular.element('#signup_status_msg').html(str_html);
			    angular.element('#signup_status_msg1').html(str_html);
      		}
      		else 
      		{
      			var str_html = makeStatusMessageHtml('danger',response.data.msg);
			    angular.element('#signup_status_msg').html(str_html);
			    angular.element('#signup_status_msg1').html(str_html);
      		}



      		$scope.signupForm.$setPristine();
		    $scope.signupForm.$setUntouched();
			$scope.signupuser = {};

      		$timeout(function () {
				angular.element('#signup_status_msg').html("");		
				angular.element('#signup_status_msg1').html("");		
			}, 5000);

      		//resetSignupForm();
		});
	}

	/* forget password form */

	function storeForgetPassword()
	{
		var email=$scope.forgetuser.forgetemail;
		$http({
				method:'GET',
				url: $scope.module_url+'/user/forget_password?email='+email,
			    dataType : 'json',
			  	headers: {
				   			'Content-Type': 'application/json'
						}
		}).then(function successCallback(response)
		{
			if(response.data.status == "success") 
			{
				var str_html = makeStatusMessageHtml('success',response.data.msg);
			    angular.element('#forget_status_msg').html(str_html);
      		}
      		else 
      		{
      			var str_html = makeStatusMessageHtml('danger',response.data.msg);
			    angular.element('#forget_status_msg').html(str_html);
      		}

      		$scope.forgetuser.forgetemail = "";

  			$scope.forgetPasswordForm.$setPristine();
            $scope.forgetPasswordForm.$setUntouched();


      		$timeout(function () {
				angular.element('#forget_status_msg').html("");		
			}, 5000);

		});
	}

	/* reset password*/

	function storeResetPassword()
	{		

		var password =angular.element('input[name="new_password"]').val();
		//var enc_password=CryptoJS.MD5(password).toString();

		var confirm_password =angular.element('input[name="confirm_password"]').val();
		//var enc_confirm_password=CryptoJS.MD5(confirm_password).toString();

		var enc_id =$scope.enc_id;
		
		/*$scope.resetpassword.new_password     = enc_password;
		$scope.resetpassword.confirm_password = enc_confirm_password;*/
		$scope.resetpassword.new_password     = password;
		$scope.resetpassword.confirm_password = confirm_password;
		
		$scope.resetpassword.encId            = enc_id;

		$http({
			method:"POST",
			url:$scope.module_url+'/process_resetpassword',
			dataType:'json',
			data:$scope.resetpassword,
			headers:{
				'Content-Type':'application/json'
			}
		}).then(function successCallback(response)
		{
			if(response.data.status=="success")
			{
				window.location.href = response.data.redirectTo;
				return;
			}
			else
			{
				var str_html=makeStatusMessageHtml('danger',response.data.msg);
				angular.element("#status_msg").html(str_html);
				$scope.resetPasswordForm.$setPristine();
	            $scope.resetPasswordForm.$setUntouched();

				$scope.resetpassword.new_password = "";
			    $scope.resetpassword.confirm_password = "";
			}

			$timeout(function () {
				angular.element('#status_msg').html("");		
			}, 5000);

		});

	}

	
}