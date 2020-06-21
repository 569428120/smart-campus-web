export default {
  // 年级枚举
  GradeLevel: {
    1: "一年级",
    2: "二年级",
    3: "三年级",
    4: "四年级",
    5: "五年级",
    6: "六年级",
    7: "初一",
    8: "初二",
    9: "初三",
    10: "高一",
    11: "高二",
    12: "高三",
  },
  StudentGroupTypeFunc: (pid, pType) => {
    if (!pid) {
      return 'grade';
    }
    if (pType === 'grade') {
      return 'class';
    }
    return 'group';
  },
  // 学生分组枚举
  StudentGroupType: {
    grade: "年级",
    class: "班级",
    group: "分组",
  },
  // 用户类型枚举
  UserTypes: {
    Teacher: "教师",
    Staff: "职员"
  },
  // 用户类型
  UserType: {
    Student: {
      key: "Student",
      value: "学生"
    },
    Staff: {
      key: "Staff",
      value: "职员"
    },
    Teacher: {
      key: "Teacher",
      value: "教师",
    }
  },
  // 弹窗操作枚举
  OperatorType: {
    view: "查看",
    edit: "修改",
    add: "新增"
  },
  // 监护人关系类型
  FamilyType: {
    parent: {
      key: "parent",
      value: "父母"
    },
    grandparents: {
      key: "grandparents",
      value: "祖父母"
    },
    relatives: {
      key: "relatives",
      value: "亲属"
    },
    other: {
      key: "other",
      value: "其他"
    }
  },
  // 卡类型
  CardType: {
    ICCard: {
      key: "ICCard",
      value: "IC卡"
    }
  }
}
