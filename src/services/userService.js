import request from "@/utils/request";
import config from "../config/appConfig";

/**
 *  用户列表
 * @param groupId
 * @param userType
 * @param searchValue
 * @param current
 * @param pageSize
 * @returns {Promise<void>}
 */
export async function getUserList(groupId, userType, searchValue, current, pageSize) {
  return request(config.userApi.getUserList, {
    method: 'GET',
    params: {
      ...{
        name: searchValue
      },
      groupId,
      userType,
      current,
      pageSize
    }
  });
}

/**
 *  获取用户分组
 * @param userType
 * @returns {Promise<void>}
 */
export async function getUserGroupList(userType) {
  return request(config.userApi.getUserGroupList, {
    method: 'GET',
    params: {
      userType
    }
  });
}
