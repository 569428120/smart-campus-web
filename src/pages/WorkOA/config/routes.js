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
            component: 'AccessControl/Strategy',
          },
          {
            path: '/access-control/access-authority/control',
            name: 'control',
            component: 'AccessControl/Distribution',
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
            component: './Dashboard/Analysis',
          },
          {
            path: '/access-control/access-record/car',
            name: 'car',
            component: './Dashboard/Monitor',
          },
          {
            path: '/access-control/access-record/statistics',
            name: 'statistics',
            component: './Dashboard/Monitor',
          },
        ],
      },
    ],
  }
];

module.exports = routes;
