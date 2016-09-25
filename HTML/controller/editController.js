StepAppStore.edit.controller("StepAppStore.edit.controller", ['$scope', '$http', function ($scope, $http) {
    var parseQueryString = function (qs) {
        var result = {};
        var pairs = qs.split('&');
        pairs.forEach(function (pair) {
            pair = pair.split('=');
            var key = pair[0];
            result[key] = decodeURIComponent(pair[1] || '');
        });

        return JSON.parse(JSON.stringify(result));
    };
    $.get("/personalDetails", function (data) {
        $scope.isLoggedIn = data.isLoggedIn;
        $scope.username = data.username;
    });
    $('body').prepend('<div id="overlay"><div></div></div>');
    $('#overlay').stop().show()
    var qs = $(location).attr("search").slice(1);
    var uuid = parseQueryString(qs).uuid;
    $scope.$watch(function () {
        return angular.element("#uploadForm").is(':visible');
    }, function () {
        $("#uploadForm").attr("action", "/submit/project/" + uuid);
    });
    $.get("/project/" + uuid).then(function (data) {
        data = data[0];
        $("#projectName").val(data.projectname);
        $("#briefDescription").val(data.briefdescription);
        $("#sourceLink").val(data.sourcelink);
        $("#siteLink").val(data.websitelink);
        $("#usedLanguages").val(data.usedlanguages);
        $("#usedFrameworks").val(data.usedframeworks);
        $("#developedBy").val(data.developedby);
        $("#logo").val(data.projectlogo);
    });

}]);


//
//var edit = function (uuid) {
//  $("body").append("<div ng-include=\"'uploadForm.html'\"></div>")
//};