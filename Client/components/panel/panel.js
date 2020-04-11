function panelController($scope, $state, $http, $compile, $mdDialog) {
    // Выходим из акааунта
    $scope.out = () => {
        $state.go("login")
    }
    // Аргументы на добавление в html файле panel всё прописано
    $scope.add = (worker) => {
        if (worker.tovarName &&
            worker.opiName &&
            worker.midleName &&
            worker.date &&
            worker.time &&
            worker.reason
        ) {
            let date = {
                day: worker.date.getDate(),
                month: worker.date.getMonth(),
                year: worker.date.getFullYear()
            }
            let a = date.day + "-" + date.month + "-" + date.year;
            let o = {
                tovarName: worker.tovarName,
                opiName: worker.opiName,
                midleName: worker.midleName,
                date: a,
                time: worker.time,
                reason: worker.reason,
                comment: worker.comment
            }
            $http({
                method: 'POST',
                url: '/api/users',
                data: o
            }).then(function successCallback(response) {
                $scope.works.push(response.data);
            })
        }
    }
    // Удаление

    $scope.delete = (ev, e) => {
        $scope.works.forEach(element => {
            if (element._id === e) {
                $scope.element = element
                $scope._id = e
            }
        });
        $mdDialog.show({
            templateUrl: "./components/panel/delete.html",
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            scope: $scope,
            preserveScope: true,
        });
    }

    $scope.deletePost = () => {
        $scope.works.splice($scope._id, 1)
        $http({
            method: 'DELETE',
            url: '/api/users/' + $scope._id,
            data: $scope.element
        }).then(function successCallback(response) { })
        $mdDialog.cancel();
    }
    // Получение
    $http({
        method: 'GET',
        url: '/api/getUsers',
    }).then(function successCallback(response) {
        $scope.works = response.data;
    })
    // Диалоговое окно на изменение
    $scope.showDialogEdit = function (ev, e) {
        $scope.works.forEach(element => {
            if (element._id === e) {
                $scope.work = element;
            }
        });
        $mdDialog.show({
            templateUrl: "./components/panel/edit.html",
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            scope: $scope,
            preserveScope: true,
        });
    }
    //  Выход из диалогового окна
    $scope.cancel = () => {
        $mdDialog.cancel();
    };
    // Изменение
    $scope.edit = (editWork) => {
        console.log(editWork, "editWork")
        $http({
            method: 'PUT',
            url: '/api/users',
            data: editWork
        }).then(function successCallback(response) {
            console.log(response.data)
        })
        $mdDialog.cancel();
    }
}

angular.module("MyApp").component("panel", {
    controller: panelController,
    templateUrl: "./components/panel/panel.html"
});
