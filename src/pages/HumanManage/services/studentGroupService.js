import request from "@/utils/request";
import config from "@/pages/HumanManage/config/config";

/**
 *  保存
 * @returns {Promise<void>}
 */
export async function saveStudentGroupData(values) {
  return request(config.studentGroupApi.saveStudentGroupData, {
    method: 'POST',
    body: {
      ...values
    }
  });
}


/**
 *   删除
 * @param groupIds
 * @returns {Promise<void>}
 */
export async function deleteStudentGroupByIds(groupIds) {
  return request(config.studentGroupApi.deleteStudentGroupByIds, {
    method: 'GET',
    params: {
      groupIds: (groupIds || []).join(",")
    }
  });
}


/**
 *  查询
 * @param searchValue
 * @returns {Promise<*>}
 */
export async function getStudentGroupList(searchValue) {
  return request(config.studentGroupApi.getStudentGroupList, {
    method: 'GET',
    params: {
      ...searchValue
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
  return request(config.studentGroupApi.copyGroupToGroup, {
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
  return request(config.studentGroupApi.moveGroupToGroup, {
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
  return request(config.studentGroupApi.moveUserToGroup, {
    method: 'POST',
    params: {
      userIds: (userIds || []).join(","),
      targetId,
    }
  });
}


/**
 *  根据id查询
 * @param groupId
 * @returns {Promise<void>}
 */
export async function getStudentGroupById(groupId) {
  return request(config.studentGroupApi.getStudentGroupById, {
    method: 'GET',
    params: {
      groupId,
    }
  });
}
