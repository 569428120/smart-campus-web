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
            component: 'HumanManage/StaffGroup',
          },
          {
            path: '/personnel-manage/staff-manage/staff-user',
            name: 'staff-user',
            component: 'HumanManage/StaffUser',
          },
        ],
      },
      // 学生管理
      {
        path: '/personnel-manage/student-manage',
        name: 'student-manage',
        routes: [
          {
            path: '/personnel-manage/student-manage/student-group',
            name: 'student-group',
            component: 'HumanManage/StudentGroup',
          },
          {
            path: '/personnel-manage/student-manage/student',
            name: 'student',
            component: 'HumanManage/Student',
          },
        ],
      },
    ],
  }
];

module.exports = routes;
