const routes = [
  {
    path: '/sys-manage',
    name: 'sys-manage',
    //   icon: 'dashboard',
    routes: [
      // 租户管理
      {
        path: '/sys-manage/tenant-manage',
        name: 'tenant-manage',
        routes: [
          {
            path: '/sys-manage/tenant-manage/region',
            name: 'region',
            component: 'SystemManage/Region',
          },
          {
            path: '/sys-manage/tenant-manage/school',
            name: 'school',
            component: 'SystemManage/School',
          },
        ],
      },
      // 权限管理
      {
        path: '/sys-manage/authority-manage',
        name: 'authority-manage',
        routes: [
          {
            path: '/sys-manage/authority-manage/pc-menu',
            name: 'pc-menu',
            component: 'SystemManage/PcMenu',
          },
          /*
          {
            path: '/sys-manage/authority-manage/app-menu',
            name: 'app-menu',
            component: './SystemManage/AppMenu',
          },
          */
          {
            path: '/sys-manage/authority-manage/authority-group',
            name: 'authority-group',
            component: 'SystemManage/AuthorityGroup',
          },
        ],
      },
    ],
  }
];

module.exports = routes;
