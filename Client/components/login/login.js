function loginController($scope, $state, $mdDialog, $http) {
    // авторизация
    $scope.login = (user) => {
        if (
            user.login &&
            user.password
        ) {
            $http({
                method: "POST",
                url: '/api/reg',
                data: user
            }).then(function successCallback(response) {
                if (response.data) {
                    if (response.data.login === user.login,
                        response.data.password === user.password) {
                        $state.go("panel")
                    } else {
                        alert("Неверный логин или пароль!")
                    }
                }
                else {
                    alert("Неверный логин или пароль!")
                }
            })
        }
    }

    //  Выход из диалогового окна
    $scope.cancel = () => {
        $mdDialog.cancel();
    };

    // Диалоговое окно на регистрацю
    $scope.showDialogReg = function (e) {
        $mdDialog.show({
            templateUrl: "./components/login/registration.html",
            parent: angular.element(document.body),
            targetEvent: e,
            clickOutsideToClose: true,
            scope: $scope,
            preserveScope: true,
            controller: function DialogController($scope, $mdDialog) {
                $scope.closeDialogReg = function () {
                    $mdDialog.hide();
                };
            }
        });
    }

    $scope.add = (user) => {
        if (
            user.login &&
            user.password
        ) {
            $http({
                method: 'POST',
                url: '/api/reg',
                data: user
            }).then(function successCallback(response) {
                if (response.data) {
                    if (response.data.login === user.login) {
                        alert("Аккаунт существует!")
                    }
                }
                else {
                    alert("Аккаунт зарегестрирован!")
                }
            })
        }
        $mdDialog.cancel();
    }

}
// Объявление компонентов
angular.module("MyApp").component("login", {
    controller: loginController,
    templateUrl: "./components/login/login.html"
});
