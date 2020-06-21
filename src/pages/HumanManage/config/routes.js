const routes = [
  {
    path: '/personnel-manage',
    name: 'personnel-manage',
    routes: [
      // 职工管理
      {
        path: '/personnel-manage/staff-manage',
        name: 'staff-manage',
        routes: [
          {
            path: '/personnel-manage/staff-manage/staff-group',
            name: 'staff-group',
            component: 'HumanManage/GroupToUser',
          },
          {
            path: '/personnel-manage/staff-manage/student-group',
            name: 'student-group',
            component: 'HumanManage/StudentGroup',
          },
        ],
      },
      // 特征录入
      {
        path: '/personnel-manage/personnel-feature',
        name: 'personnel-feature',
        routes: [
          {
            path: '/personnel-manage/personnel-feature/card',
            name: 'card',
            component: 'HumanManage/CardManage',
          },
          {
            path: '/personnel-manage/personnel-feature/face',
            name: 'face',
            component: 'HumanManage/FaceManage',
          },
        ],
      },
    ],
  }
];

module.exports = routes;
