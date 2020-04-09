import request from "@/utils/request";
import config from "../config/config";

/**
 *  查询
 * @param searchValue
 * @param current
 * @param pageSize
 * @returns {Promise<void>}
 */
export async function getCarRecordList(searchValue, current, pageSize) {
  return request(config.carRecordApi.getCarRecordList, {
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
  return request(config.carRecordApi.getUserTypeList, {
    method: 'GET',
    params: {}
  });
}

/**
 *   查询策略类型
 * @returns {Promise<void>}
 */
export async function getStrategyTypeList() {
  return request(config.carRecordApi.getStrategyTypeList, {
    method: 'GET',
    params: {}
  });
}


/**
 *   记录详情
 * @returns {Promise<void>}
 */
export async function getCarRecordDetail(recordId) {
  return request(config.carRecordApi.getCarRecordDetail, {
    method: 'GET',
    params: {
      recordId
    }
  });
}


