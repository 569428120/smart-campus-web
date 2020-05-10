//后台服务路径
const API = 'http://localhost:9999';
// 默认的也容量
const PAGE_SIZE = 15;

export default {
  API,
  PAGE_SIZE,
  serviceApi: {
    login: `${API}/auth/user/login`,
  },
  userApi: {
    // 学生组
    getStudentGroupList: `${API}/human/student-group/gets/all`,
    // 职员组
    getStaffGroupList: `${API}/human/staff-group/gets/all`,
    // 查询 分组下的学生  输入：分组id  返回：学生列表
    getStudentList: `${API}/human/group-to-student/gets/gets-by-groupid`,
    // 查询  分组下的员工信息
    getStaffList: `${API}/human/group-to-staff-user/gets/gets-by-groupid`,
  },
}
