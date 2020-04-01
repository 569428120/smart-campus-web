import request from "@/utils/request";
import config from "@/pages/HumanManage/config/config";

/**
 *  搜索查询
 * @param searchValue
 * @returns {Promise<void>}
 */
export async function getStaffGroupList(searchValue) {
  return request(config.staffGroupApi.getStaffGroupList, {
    method: 'GET',
    params: {
      ...searchValue
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


/**
 *  查询
 * @param groupId
 * @param current
 * @param pageSize
 * @returns {Promise<void>}
 */
export async function getGroupToStaffUserList(groupId, current, pageSize) {
  return request(config.staffGroupApi.getGroupToStaffUserList, {
    method: 'GET',
    params: {
      groupId,
      current,
      pageSize
    }
  });
}
