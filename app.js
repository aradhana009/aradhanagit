
var app = angular.module("courseApp", []);

app.controller("courseController", function($scope, $http) {

    $scope.courses = [];
    $scope.form = {};
    $scope.isEditing = false;
    $scope.message = "";

    // GET - Display all courses
    $scope.getCourses = function() {

        $http.get("/api/courses")
        .then(function(response) {
            $scope.courses = response.data;
        });

    };

    // POST - Add course or PUT - Update course
    $scope.saveCourse = function() {

        if ($scope.isEditing) {

            // PUT - Update course
            var courseId = $scope.form.courseId;

            $http.put("/api/courses/" + courseId, {
                credits: $scope.form.credits,
                capacity: $scope.form.capacity
            })
            .then(function(response) {
                $scope.message = response.data.message;
                $scope.resetForm();
                $scope.getCourses();
            });

        } else {

            // POST - Add course
            $http.post("/api/courses", $scope.form)
            .then(function(response) {
                $scope.message = response.data.message;
                $scope.resetForm();
                $scope.getCourses();
            });

        }

    };

    // Edit course
    $scope.editCourse = function(course) {

        $scope.form = angular.copy(course);
        $scope.isEditing = true;

    };

    // Cancel editing
    $scope.cancelEdit = function() {
        $scope.resetForm();
    };

    // Reset form
    $scope.resetForm = function() {

        $scope.form = {};
        $scope.isEditing = false;

    };

    // Load courses when page opens
    $scope.getCourses();

});
