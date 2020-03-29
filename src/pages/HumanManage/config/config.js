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
  },
  // 职工管理
  staffUserApi: {
    // 分页查询
    getStaffUserList: `${api}/staff-user/gets/page`,
    // 保存基本信息
    saveStaffUserData: `${api}/staff-user/posts`,
    // 保存登录账户和密码
    saveLoginUser: `${api}/staff-user/login-user/posts`,
  }
}
