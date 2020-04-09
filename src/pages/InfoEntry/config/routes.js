const routes = [
  {
    path: '/info-entry',
    name: 'info-entry',
    routes: [
      // 人员特征
      {
        path: '/info-entry/personnel-feature',
        name: 'personnel-feature',
        routes: [
          {
            path: '/info-entry/personnel-feature/card',
            name: 'card',
            component: 'InfoEntry/CardManage',
          },
          {
            path: '/info-entry/personnel-feature/face',
            name: 'face',
            component: 'InfoEntry/FaceManage',
          },
        ],
      },
    ],
  }
];

module.exports = routes;
