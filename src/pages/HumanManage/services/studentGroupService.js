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
      menuIds: (groupIds || []).join(",")
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
 *  查询
 * @param groupId
 * @param current
 * @param pageSize
 * @returns {Promise<void>}
 */
export async function getGroupToStudentList(groupId, current, pageSize) {
  return request(config.studentGroupApi.getGroupToStudentList, {
    method: 'GET',
    params: {
      groupId,
      current,
      pageSize
    }
  });
}
