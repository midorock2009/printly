var app = angular.module('printingStore', [
                                            'ngRoute',
                                            'ngMessages',
                                            'ngFileUpload',
                                            'vcRecaptcha'
                                          ]);

app.run(function($rootScope,$window,$timeout)
{
  $rootScope.GLOBAL = {};
  $rootScope.GLOBAL.request_inprogress = true;
  $window.onload = function()
  {
    $timeout(function()
    {
      $rootScope.GLOBAL.request_inprogress = false;
    },1000);
  };
});

app.config(function($interpolateProvider,$httpProvider)
{
  $interpolateProvider.startSymbol('[[');
  $interpolateProvider.endSymbol(']]');
  $httpProvider.interceptors.push('customHttpInterceptor');
});   

app.factory('customHttpInterceptor', function ($q, $window ,$rootScope) 
{
    return {
        // optional method
      'request': function(config) {
        /*console.log("Loading ... ");*/
        $rootScope.GLOBAL.request_inprogress = true;
        return config;
      },

      // optional method
     'requestError': function(rejection) {
        /*console.log("Loading ... ");*/
        $rootScope.GLOBAL.request_inprogress = true;
        return $q.reject(rejection);
      },

      // optional method
      'response': function(response) {
        /*console.log("Complete ");*/
        $rootScope.GLOBAL.request_inprogress = false;
        return response;
      },

      // optional method
     'responseError': function(rejection) {
        /*console.log("Complete ");*/
        $rootScope.GLOBAL.request_inprogress = false;
        return $q.reject(rejection);
      }
    };    
});


app.controller('PageCtrl', function ( $scope,$location) {    
    $scope.user = {};
    $scope.loginForm = {};
    $scope.pageClass = "";
});

/* modal start here*/
app.controller('MainCtrl', function ($scope) {
    $scope.showLogin = false;
    $scope.showSignup = false;
    $scope.showForgetPassword = false;
    
    $scope.toggleLogin = function() {  
        $scope.$broadcast("triggerReset",{loginForm:loginForm,signupForm:signupForm} );
        $scope.showSignup = false;
        $scope.showLogin = !$scope.showLogin;
    };
    
    $scope.toggleSignup = function(){
        $scope.$broadcast("triggerReset");
        $scope.showLogin = false;
        $scope.showSignup = !$scope.showSignup;
    };

    $scope.toggleForgetPassword = function(){
        $scope.showForgetPassword = false;
        $scope.showSignup = false;
         $scope.showLogin = false;
        $scope.showForgetPassword = !$scope.showForgetPassword;
    };

    $scope.hideLogin = function(){
        $scope.showLogin = false;
    }; 

    $scope.resetPopupModel=function(){
      window.location.href=$scope.site_url;
    };
    
    /*header menu script start here*/
  
  /*   $scope.openNav = function() {
           
           document.getElementById("mySidenav").style.width = "250px";
           $("body").css({
               "margin-left": "250px",
               "overflow-x": "hidden",
               "transition": "margin-left .5s",
               "position": "fixed"
           });
           $("#main").addClass("overlay");
       }
        $scope.closeNav = function() {
           document.getElementById("mySidenav").style.width = "0";
           $("body").css({
               "margin-left": "0px",
               "transition": "margin-left .5s",
               "position": "relative"
           });
           $("#main").removeClass("overlay");
       }*/
    /*header menu script end here*/
 
});

  


  app.controller("uploadImage", ['$scope', '$http', 'uploadService', function($scope, $http, uploadService) {
    $scope.$watch('file', function(newfile, oldfile) {
      if(angular.equals(newfile, oldfile) ){
        return;
      }

      uploadService.upload(newfile).then(function(res){
   
        /*console.log("result", res);*/
      })
    });
  }])


/* Common function for status message*/
function makeStatusMessageHtml(status, message)
{
    str = '<div class="alert alert-'+status+'">'+
    '<a aria-label="close" data-dismiss="alert" class="close" href="#">'+'×</a>'+message+
    '</div>';
    return str;
}





/*-------------------------------------------------------------------------
|                            Services Start
---------------------------------------------------------------------------*/
  app.service("uploadService", function($http, $q) {

    return ({
      upload: upload
    });

    function upload(file) {
      var upl = $http({
        method: 'POST',
        url: 'http://jsonplaceholder.typicode.com/posts', 
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        data: {
          upload: file
        },
        transformRequest: function(data, headersGetter) {
          var formData = new FormData();
          angular.forEach(data, function(value, key) {
            formData.append(key, value);
          });

          var headers = headersGetter();
          delete headers['Content-Type'];

          return formData;
        }
      });
      return upl.then(handleSuccess, handleError);

    }

/*-------------------------------------------------------------------------
|                            Services Ends
---------------------------------------------------------------------------*/
   
  function handleError(response, data) {
      if (!angular.isObject(response.data) ||!response.data.message) {
        return ($q.reject("An unknown error occurred."));
      }

      return ($q.reject(response.data.message));
      }

    function handleSuccess(response) {
      return (response);
    }
  });


/*-------------------------------------------------------------------------
|                            Directives Start
---------------------------------------------------------------------------*/

  /* modal Starts here*/
  app.directive('modal', function () {
    return {
      template: '<div class="modal fade login-popup">' + 
          '<div class="modal-dialog">' + 
            '<div class="modal-content">' + 
              '<div class="modal-body" ng-transclude></div>' + 
            '</div>' + 
          '</div>' + 
        '</div>',
      restrict: 'E',
      transclude: true,
      replace:true,
      scope:true,
      link: function postLink(scope, element, attrs) {
        scope.title = attrs.title;
        
        scope.$watch(attrs.visible, function(value){
          if(value == true)
            $(element).modal('show');
          else
            $(element).modal('hide');
        });

        $(element).on('shown.bs.modal', function(){
          scope.$apply(function(){
            scope.$parent[attrs.visible] = true;
          });
        });

        $(element).on('hidden.bs.modal', function(){
          scope.$apply(function(){
            scope.$parent[attrs.visible] = false;
          });
        });
      }
    };
  });
  /* modal end here*/



  /* image drop zone start here */
  app.directive('dropZone', function() {
    return function(scope, element, attrs) {
      element.dropzone({ 
        url: "/upload",
        maxFilesize: 100,
        paramName: "uploadfile",
        maxThumbnailFilesize: 5,
        init: function() {
          scope.files.push({file: 'added'}); // here works
          this.on('success', function(file, json) {
          });
          
          this.on('addedfile', function(file) {
            scope.$apply(function(){
              alert(file);
              scope.files.push({file: 'added'});
            });
          });
          
          this.on('drop', function(file) {
            alert('file');
          }); 
        }
      });
    }
  });


  /* image drop zone end here */
  app.directive("fileinput", [function() {
    return {
      scope: {
        fileinput: "=",
        filepreview: "="
      },
      link: function(scope, element, attributes) {
        element.bind("change", function(changeEvent) {
          scope.fileinput = changeEvent.target.files[0];
          var reader = new FileReader();
          reader.onload = function(loadEvent) {
            scope.$apply(function() {
              scope.filepreview = loadEvent.target.result;
            });
          }
          reader.readAsDataURL(scope.fileinput);
        });
      }
    }
  }]);


  /*To check numbers only on keyup*/
  app.directive('numbersOnly', function () {
      return {
          require: 'ngModel',
          link: function (scope, element, attr, ngModelCtrl) {
              function fromUser(text) {
                  if (text) {
                      var transformedInput = text.replace(/[^0-9]/g, '');

                      if (transformedInput !== text) {
                          ngModelCtrl.$setViewValue(transformedInput);
                          ngModelCtrl.$render();
                      }
                      return transformedInput;
                  }
                  return undefined;
              }            
              ngModelCtrl.$parsers.push(fromUser);
          }
      };
  });


  /*To check password & confirm password*/
  app.directive('pwCheck', [function () {
      return {
          require: 'ngModel',
          link: function (scope, elem, attrs, ctrl) {
              var firstPassword = '#' + attrs.pwCheck;
              elem.add(firstPassword).on('keyup', function () {
                  scope.$apply(function () {
                        var pass_check_val = elem.val() === $(firstPassword).val();
                        if(elem.val() == "") {
                          pass_check_val = true;
                        }
                        ctrl.$setValidity('pwmatch',pass_check_val);
                  });
              });
          }
      }
  }]);


app.directive('attachFileInput', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function (scope, element, attributes) {
            element.bind('change', function () {
                $parse(attributes.attachFileInput).assign(scope,element[0].files)
                scope.$apply()
            });
        }
    };
}]);


/*-------------------------------------------------------------------------
|                            Directives Ends
---------------------------------------------------------------------------*/
