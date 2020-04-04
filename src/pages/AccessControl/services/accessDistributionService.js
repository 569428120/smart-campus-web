import request from "@/utils/request";
import config from "../config/config";

/**
 *  搜索查询
 * @param searchValue
 * @returns {Promise<void>}
 */
export async function getAccessDistributionList(searchValue) {
  return request(config.accessDistributionApi.getAccessDistributionList, {
    method: 'GET',
    params: {
      ...searchValue
    }
  });
}


/**
 *  保存
 * @param groupIds
 * @param strategyId
 * @returns {Promise<void>}
 */
export async function saveGroupToStrategyId(groupIds, strategyId) {
  return request(config.accessDistributionApi.saveGroupToStrategyId, {
    method: 'POST',
    body: {
      groupIds,
      strategyId
    }
  });
}


/**
 *  查询
 * @returns {Promise<void>}
 */
export async function getAccessStrategyList() {
  return request(config.accessDistributionApi.getAccessStrategyList, {
    method: 'GET',
    params: {}
  });
}

/**
 *  查询
 * @returns {Promise<void>}
 */
export async function getTimeQuantumListByStrategyId(strategyId) {
  return request(config.accessDistributionApi.getTimeQuantumListByStrategyId, {
    method: 'GET',
    params: {
      strategyId
    }
  });
}
