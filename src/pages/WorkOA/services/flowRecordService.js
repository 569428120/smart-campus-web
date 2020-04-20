import request from "@/utils/request";
import config from "../config/config";

/**
 *  查询
 * @param searchValue
 * @param current
 * @param pageSize
 * @returns {Promise<void>}
 */
export async function getTodoFlowRecordList(searchValue, current, pageSize) {
  return request(config.flowRecordApi.getTodoFlowRecordList, {
    method: 'GET',
    params: {
      searchValue,
      current,
      pageSize
    }
  });
}

/**
 *  查询
 * @param searchValue
 * @param current
 * @param pageSize
 * @returns {Promise<void>}
 */
export async function getAlreadyFlowRecordList(searchValue, current, pageSize) {
  return request(config.flowRecordApi.getAlreadyFlowRecordList, {
    method: 'GET',
    params: {
      searchValue,
      current,
      pageSize
    }
  });
}

/**
 *  查询
 * @param searchValue
 * @param current
 * @param pageSize
 * @returns {Promise<void>}
 */
export async function getMyCreateFlowRecordList(searchValue, current, pageSize) {
  return request(config.flowRecordApi.getMyCreateFlowRecordList, {
    method: 'GET',
    params: {
      searchValue,
      current,
      pageSize
    }
  });
}
