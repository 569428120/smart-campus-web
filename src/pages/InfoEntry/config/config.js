import appConfig from "@/config/appConfig";

const api = `${appConfig.API}/info-entry`;

export default {
  cardApi: {
    // 保存
    saveCardData: `${api}/card/posts`,
    // 删除
    deleteCardByIds: `${api}/card/deletes/deletes-by-ids`,
    // 分页查询
    getCardList: `${api}/card/gets/page`,
  },
  userApi: {
    // 学生组
    getStudentGroupList: `${appConfig.API}/human/student-group/gets/all`,
    // 职员组
    getStaffGroupList: `${appConfig.API}/human/staff-group/gets/all`,
    // 查询 分组下的学生  输入：分组id  返回：学生列表
    getStudentList: `${appConfig.API}/human/group-to-student/gets/gets-by-groupid`,
    // 查询  分组下的员工信息
    getStaffList: `${appConfig.API}/human/group-to-staff-user/gets/gets-by-groupid`,
  },
  faceApi: {
    // 保存
    saveFaceData: `${api}/face/posts`,
    // 删除
    deleteFaceByIds: `${api}/face/deletes/deletes-by-ids`,
    // 分页查询
    getFaceList: `${api}/face/gets/page`,
  }
};
