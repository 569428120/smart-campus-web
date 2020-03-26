import request from "@/utils/request";
import config from "@/pages/SystemManage/config/config";

/**
 *  搜索查询
 * @param searchValue
 * @param current
 * @param pageSize
 * @returns {Promise<void>}
 */
export async function getAuthorityGroupList(searchValue, current, pageSize) {
  return request(config.authorityGroupApi.getAuthorityGroupList, {
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
export async function deleteAuthorityGroupByIds(groupIds) {
  return request(config.authorityGroupApi.deleteAuthorityGroupByIds, {
    method: 'GET',
    params: {
      groupIds: (groupIds || []).join(",")
    }
  });
}


/**
 *  查询菜单列表
 * @returns {Promise<void>}
 */
export async function getAllMenuList() {
  return request(config.pcMenuApi.getMenuList, {
    method: 'GET',
    params: {}
  });
}

/**
 *  查询组下的权限列表
 * @param groupId
 * @returns {Promise<void>}
 */
export async function getMenuListByGroupId(groupId) {
  return request(config.authorityGroupApi.getMenuListByGroupId, {
    method: 'GET',
    params: {
      groupId
    }
  });
}

/**
 *  保存权限组
 * @param values
 * @returns {Promise<void>}
 */
export async function saveAuthorityGroup(values) {
  return request(config.authorityGroupApi.saveAuthorityGroup, {
    method: 'POST',
    body: {
      ...values
    }
  });
}

/**
 *   保存关联的菜单
 * @param groupId
 * @param menuIds
 * @returns {Promise<void>}
 */
export async function saveGroupIdToMenuList(groupId, menuIds) {
  return request(config.authorityGroupApi.saveGroupIdToMenuList, {
    method: 'POST',
    params: {
      groupId,
      menuIds
    }
  });
}
