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
  }
}
