(function(){
    angular
        .module("Travelogue")
        .controller("DiaryController", diaryController);

    function diaryController($scope, DiaryService, $rootScope) {
        $scope.diaries = DiaryService.findAllDiariesForUser($rootScope.currentUser._id);

        $scope.message = null;
        $scope.error = null;

        $scope.addD = addD;
        $scope.updateD = updateD;
        $scope.deleteD = deleteD;
        $scope.selectD = selectD;

        var selectedDId = null;

        function addD(d) {
            if (typeof d !== "undefined" && d.title != "") {
                var newD = DiaryService.createDiaryForUser($rootScope.currentUser._id, d);
                $scope.diaries.push(newD);
            }
        }

        function updateD(d) {
            var newD = DiaryService.updateDiaryById(selectedDId, d);
            if (newD) {
                $scope.message = "Successfully updated Diary";
            } else {
                $scope.message = "Unable to update Diary. Try again.";
            }
        }

        function deleteD(index) {
            selectedDId = $scope.diaries[index]._id;
            DiaryService.deleteDiaryById(selectedDId);
            $scope.diaries.splice(index, 1);
        }

        function selectD(index) {
            selectedDId = $scope.diaries[index]._id;
            var d = DiaryService.findDiaryById(selectedDId);
            $scope.d = {
                _id: d._id,
                title: d.title,
                notes: d.notes,
                text: d.text,
                userId: d.userId
            };
        }
    }
})();