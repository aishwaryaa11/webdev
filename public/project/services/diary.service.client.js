(function() {
    angular
        .module("Travelogue")
        .factory("DiaryService", diaryService);

    function diaryService() {

        var diaries = [
            {"_id": "000", "title": "Contacts", "notes": "Spring Break, PR", "text": "LOL", "userId": 123},
            {"_id": "010", "title": "ToDo",  "text": "Went to Rebeccas today...",   "userId": 121},
            {"_id": "020", "title": "CDs", "notes": "christmassssssss, #cray",  "userId": 234}
        ];


        var service = {
            createDiaryForUser: createDiaryForUser,
            findAllDiariesForUser: findAllDiariesForUser,
            findDiaryById: findDiaryById,
            findAllDiaries: findAllDiaries,
            deleteDiaryById: deleteDiaryById,
            updateDiaryById: updateDiaryById
        };

        return service;

        function createDiaryForUser(userId, diary, callback) {
            var newD = {
                _id: (new Date).getTime(),
                title: diary.title,
                notes: diary.notes,
                text: diary.text,
                userId: userId
            };

            diaries.push(newD);
            return newD;
        }

        function findAllDiariesForUser(userId, callback) {
            var res = [];
            for (var f in diaries) {
                if (diaries[f].userId == userId) {
                    res.push(diaries[f]);
                }
            }

            return res;
        }

        function findDiaryById(DId, callback) {
            for (var f in diaries) {
                if (diaries[f]._id == DId) {
                    return diaries[f];
                }
            }

            return null;
        }

        function findAllDiaries(callback) {
            return diaries;
        }

        function deleteDiaryById(DId, callback) {
            var diary = findDiaryById(DId);
            if (diary != null) {
                diaries.splice(diaries.indexOf(diary), 1);
            } else {
                return null;
            }
        }

        function updateDiaryById(DId, newD, callback) {
            var dTemp = findDiaryById(DId);
            if (dTemp != null) {
                dTemp.title = newD.title;
                dTemp.notes = newD.notes;
                dTemp.text = newD.text;
                dTemp.userId = newD.userId;
                return dTemp;
            } else {
                return null;
            }
        }
    }
})();