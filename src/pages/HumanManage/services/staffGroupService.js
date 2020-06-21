import request from "@/utils/request";
import config from "../config/config";

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
 *  复制分组
 * @param sourceIds
 * @param targetIds
 * @returns {Promise<void>}
 */
export async function copyGroupToGroup(sourceIds, targetIds) {
  return request(config.staffGroupApi.copyGroupToGroup, {
    method: 'POST',
    params: {
      sourceIds: (sourceIds || []).join(","),
      targetIds: (targetIds || []).join(","),
    }
  });
}

/**
 *  移动分组
 * @param sourceIds
 * @param targetId
 * @returns {Promise<void>}
 */
export async function moveGroupToGroup(sourceIds, targetId) {
  return request(config.staffGroupApi.moveGroupToGroup, {
    method: 'POST',
    params: {
      sourceIds: (sourceIds || []).join(","),
      targetId,
    }
  });
}

/**
 *  移动用户
 * @param userIds
 * @param targetId
 * @returns {Promise<void>}
 */
export async function moveUserToGroup(userIds, targetId) {
  return request(config.staffGroupApi.moveUserToGroup, {
    method: 'POST',
    params: {
      userIds: (userIds || []).join(","),
      targetId,
    }
  });
}

/**
 *  根据id获取分组信息
 * @param groupId
 * @returns {Promise<void>}
 */
export async function getUserGroupById(groupId) {
  return request(config.staffGroupApi.getUserGroupById, {
    method: 'GET',
    params: {
      groupId
    }
  });
}
