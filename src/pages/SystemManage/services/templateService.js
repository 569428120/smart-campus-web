import request from "@/utils/request";
import config from "@/pages/SystemManage/config/config";

/**
 *  获取权限列表
 * @returns {Promise<void>}
 */
export async function getAuthorityTemplateList() {
  return request(config.authorityGroupApi.getAuthorityGroupList, {
    method: 'GET',
    params: {
      current: 1,
      pageSize: 1000
    }
  });
}
