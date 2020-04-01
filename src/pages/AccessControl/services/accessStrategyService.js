import request from "@/utils/request";
import config from "../config/config";

/**
 *  查询
 * @param searchValue
 * @param current
 * @param pageSize
 * @returns {Promise<void>}
 */
export async function getAccessStrategyList(searchValue, current, pageSize) {
  return request(config.staffGroupApi.getGroupToStaffUserList, {
    method: 'GET',
    params: {
      ...searchValue,
      current,
      pageSize
    }
  });
}

/**
 *  删除
 * @param groupIds
 * @returns {Promise<void>}
 */
export async function deleteStaffGroupByIds(groupIds) {
  return request(config.staffGroupApi.deleteStaffGroupByIds, {
    method: 'GET',
    params: {
      groupIds: (groupIds || []).join(",")
    }
  });
}


/**
 *  查询组下的权限列表
 * @param groupId
 * @returns {Promise<void>}
 */
export async function getMenuListByGroupId(groupId) {
  return request(config.staffGroupApi.getMenuListByGroupId, {
    method: 'GET',
    params: {
      groupId
    }
  });
}

/**
 *  保存
 * @param values
 * @returns {Promise<void>}
 */
export async function saveStaffGroupData(values) {
  return request(config.staffGroupApi.saveStaffGroupData, {
    method: 'POST',
    body: {
      ...values
    }
  });
}



