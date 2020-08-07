//后台服务路径
const API = '/api';
// 默认的也容量
const PAGE_SIZE = 15;

export default {
  API,
  PAGE_SIZE,
  serviceApi: {
    login: `${API}/auth/user/login`,
  },
  userApi: {
    // 用户列表
    getUserList: `${API}/human/select-user/gets/page`,
    // 用户分组
    getUserGroupList: `${API}/human/select-user/group/gets/tree`,
  },
}
