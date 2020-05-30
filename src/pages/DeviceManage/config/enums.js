export default {

  // 弹窗操作枚举
  OperatorType: {
    view: "查看",
    edit: "修改",
    add: "新增",
    debug: "调试"
  },
  // 用户类型
  UserType: {
    student: {
      key: "student",
      value: "学生"
    },
    staff: {
      key: "staff",
      value: "职员"
    },
  },
  // 卡类型
  CardType: {
    ICCard: {
      key: "ICCard",
      value: "IC卡"
    }
  },
  // 设备状态
  DeviceStatus: {
    Processing: {
      key: "Processing",
      value: "运行中"
    },
    Warning: {
      key: "Warning",
      value: "警告"
    },
    Error: {
      key: "Error",
      value: "错误"
    }
  }
}
