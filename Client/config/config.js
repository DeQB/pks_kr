MyApp.config(function($stateProvider, $urlRouterProvider) {
    let loginState = {
      name: "login",
      url: "/login",
      component: "login",
    };

      let panelState = {
      name: "panel",
      url: "/panel",
      component: "panel"
    };

    $stateProvider.state(loginState);
    $stateProvider.state(panelState);

    $urlRouterProvider.otherwise("/login");
  });