const routes = [
  {
    path: '/work',
    name: 'work',
    routes: [
      // 出入记录
      {
        path: '/work/flow',
        name: 'flow',
        routes: [
          {
            path: '/work/flow/record',
            name: 'record',
            component: 'WorkOA/FlowRecord',
          },
        ],
      },
    ],
  }
];

module.exports = routes;
