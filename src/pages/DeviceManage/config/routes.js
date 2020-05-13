const routes = [
  {
    path: '/device-manage',
    name: 'device-manage',
    routes: [
      // 门禁设备
      {
        path: '/device-manage/access-device',
        name: 'access-device',
        routes: [
          {
            path: '/device-manage/access-device/gate',
            name: 'gate',
            component: 'DeviceManage/Gate',
          }
        ],
      },
    ],
  },
];



module.exports = routes;
