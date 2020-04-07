import request from "@/utils/request";
import config from "../config/config";

/**
 *  查询
 * @param searchValue
 * @param current
 * @param pageSize
 * @returns {Promise<void>}
 */
export async function getPersonnelRecordList(searchValue, current, pageSize) {
  return request(config.personnelRecordApi.getPersonnelRecordList, {
    method: 'GET',
    params: {
      ...searchValue,
      current,
      pageSize
    }
  });
}

/**
 *  查询用户类型
 * @returns {Promise<void>}
 */
export async function getUserTypeList() {
  return request(config.personnelRecordApi.getUserTypeList, {
    method: 'GET',
    params: {}
  });
}

/**
 *   查询策略类型
 * @returns {Promise<void>}
 */
export async function getStrategyTypeList() {
  return request(config.personnelRecordApi.getStrategyTypeList, {
    method: 'GET',
    params: {}
  });
}

/**
 *   验证方式
 * @returns {Promise<void>}
 */
export async function getModeList() {
  return request(config.personnelRecordApi.getModeList, {
    method: 'GET',
    params: {}
  });
}

/**
 *   记录详情
 * @returns {Promise<void>}
 */
export async function getPersonnelRecordDetail(recordId) {
  return request(config.personnelRecordApi.getPersonnelRecordDetail, {
    method: 'GET',
    params: {
      recordId
    }
  });
}




