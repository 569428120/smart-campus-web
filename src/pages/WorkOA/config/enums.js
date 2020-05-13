export default {
  // 弹窗操作枚举
  OperatorType: {
    view: "查看",
    edit: "修改",
    add: "新增"
  },
  FlowPoolStatus: {
    unSubmit: {
      key: 'unSubmit',
      value: '待提交'
    },
    toReviewed: {
      key: 'toReviewed',
      value: '待审核',
    }
  },
  FlowStatus: {
    todo: {
      key: "TODO",
      value: "待办"
    },
    already: {
      key: "ALREADY",
      value: "已办理"
    },
    create: {
      key: "create",
      value: "创建"
    }
  },
  FlowType: {
    access: {
      key: "access",
      value: "门禁审批"
    }
  }
}
