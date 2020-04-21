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
          {
            path: '/work/flow/entry',
            name: 'entry',
            hideChildrenInMenu: true,
            routes: [
              {
                path: '/work/flow/record/guard',
                name: 'guard',
                component: 'WorkOA/GuardFlowEntry',
              }
            ]

          },
        ],
      },
    ],
  }
];

module.exports = routes;
