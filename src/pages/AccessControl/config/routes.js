const routes = [
  {
    path: '/access-control',
    name: 'access-control',
    routes: [
      // 门禁权限
      {
        path: '/access-control/access-authority',
        name: 'access-authority',
        routes: [
          {
            path: '/access-control/access-authority/strategy',
            name: 'strategy',
            component: 'AccessControl/AccessStrategy',
          },
          {
            path: '/access-control/access-authority/control',
            name: 'control',
            component: 'AccessControl/AccessDistribution',
          },
        ],
      },
      // 出入记录
      {
        path: '/access-control/access-record',
        name: 'access-record',
        routes: [
          {
            path: '/access-control/access-record/personnel',
            name: 'personnel',
            component: 'AccessControl/PersonnelRecord',
          },
          {
            path: '/access-control/access-record/car',
            name: 'car',
            component: 'AccessControl/CarRecord',
          },
        ],
      },
    ],
  }
];

module.exports = routes;