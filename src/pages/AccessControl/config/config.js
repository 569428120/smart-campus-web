import appConfig from "@/config/appConfig";

const api = `${appConfig.API}/accessControl`;

export default {
  // 策略api
  accessStrategyApi: {
    // 分页查询
    getAccessStrategyList: `${api}/access-strategy/gets/page`,
    // 查询时间段
    getStrategyToTimeQuantumList: `${api}/strategy-time-quantum/gets/gets-by-strategyid`,
    // 删除
    deleteAccessStrategyByIds: `${api}/access-strategy/deletes/deletes-by-id`,
    // 保存
    saveAccessStrategy: `${api}/access-strategy/posts`,
    // 更新状态
    updateAccessStrategyStatus: `${api}/access-strategy/status/posts`,
  },
  // 策略分配
  accessDistributionApi: {
    // 根据类型不同查询学生和职工分组
    getAccessDistributionList: `${api}/access-distribution/gets/all`,
    // 保存策略分配关系, 类型字段不需要设置
    saveGroupToStrategyId: `${api}/access-distribution/posts`,
    // 查询策略
    getAccessStrategyList: `${api}/access-strategy/gets/all`,
    // 根据策略查询时间段
    getTimeQuantumListByStrategyId: `${api}/strategy-time-quantum/gets/gets-by-strategyId`,
  },

  //////////////////////////////////////////////TODO 下面的没用
  // 职工组
  staffGroupApi: {
    // 查询用户组
    getStaffGroupList: `${api}/staff-group/gets/all`,
    // 删除
    deleteStaffGroupByIds: `${api}/staff-group/deletes/deletes-by-ids`,
    // 保存
    saveStaffGroupData: `${api}/staff-group/posts`,
    // 查询  分组下的员工信息
    getGroupToStaffUserList: `${api}/group-to-staff-user/posts`,
  },
  // 职工管理
  staffUserApi: {
    // 分页查询
    getStaffUserList: `${api}/staff-user/gets/page`,
    // 保存基本信息
    saveStaffUserData: `${api}/staff-user/posts`,
    // 保存登录账户和密码
    saveLoginUser: `${api}/staff-user/login-user/posts`,
  },
  // 班级管理
  studentGroupApi: {
    // 查询学生分组：输入：搜索条件 返回：分组列表
    getStudentGroupList: `${api}/student-group/gets/all`,
    // 删除， 输入：id逗号分隔   返回：无
    deleteStudentGroupByIds: `${api}/student-group/deletes/deletes-by-ids`,
    // 保存，输入：字段信息，如带id则更新，无id则新增 返回：数据对象
    saveStudentGroupData: `${api}/student-group/posts`,
    // 查询 分组下的学生  输入：分组id  返回：学生列表
    getGroupToStudentList: `${api}/group-to-student/gets/gets-by-studentid`,
  }
}
