import appConfig from "@/config/appConfig";

const api = `${appConfig.API}/human`;

export default {
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
