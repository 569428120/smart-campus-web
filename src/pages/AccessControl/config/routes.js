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
            redirect: "/personnel-manage/staff-manage/staff-group",
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
          {
            path: '/access-control/access-record/statistics',
            name: 'statistics',
            component: 'AccessControl/AccessStatistics',
          },
        ],
      },
    ],
  }
];

module.exports = routes;
