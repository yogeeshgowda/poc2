var myApp = angular.module('myApp', []);
     myApp.directive('fileModel', ['$parse', function ($parse) {
        return {
           restrict: 'A',
           link: function(scope, element, attrs) {
              var model = $parse(attrs.fileModel);
              var modelSetter = model.assign;
              element.bind('change', function(){
                 scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                 });
              });
           }
        };
     }]);
     myApp.service('fileUpload', ['$resource', function ($resource) {
        this.uploadFileToUrl = function(file, uploadUrl){
           var fd = new FormData();
           fd.append('file', file);
           $resource.post(uploadUrl, fd, {
              transformRequest: angular.identity,
              headers: {'Content-Type': undefined}
           })
           .success(function(){
           })
           .error(function(){
           });
        }
     }]);
     myApp.controller('myCtrl', ['$scope', 'fileUpload', function($scope, fileUpload){
        $scope.uploadFile = function(){
           var file = $scope.myFile;
           var uploadUrl = "/Users/a965993/Desktop/Profiles";
           fileUpload.uploadFileToUrl(file, uploadUrl);
        };
     }]);
