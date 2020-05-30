import request from "@/utils/request";
import config from "@/pages/HumanManage/config/config";

/**
 *  保存
 * @param values
 * @returns {Promise<void>}
 */
export async function saveStaffUserData(values) {
  return request(config.staffUserApi.saveStaffUserData, {
    method: 'POST',
    body: {
      ...values
    },
    params: {}
  });
}

/**
 *  删除
 * @param userIds
 * @returns {Promise<void>}
 */
export async function deleteStaffUserByIds(userIds) {
  return request(config.staffUserApi.deleteStaffUserByIds, {
    method: 'GET',
    params: {
      userIds: (userIds || []).join(",")
    }
  });
}

/**
 *  分页查询
 * @param searchValue
 * @param current
 * @param pageSize
 * @returns {Promise<void>}
 */
export async function getStaffUserList(searchValue, current, pageSize) {
  return request(config.staffUserApi.getStaffUserList, {
    method: 'GET',
    params: {
      ...searchValue,
      current,
      pageSize
    }
  });
}
