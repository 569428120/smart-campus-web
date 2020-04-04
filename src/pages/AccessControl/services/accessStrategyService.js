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
  return request(config.accessStrategyApi.getAccessStrategyList, {
    method: 'GET',
    params: {
      ...searchValue,
      current,
      pageSize
    }
  });
}

/**
 *  查询策略的时间段
 * @param strategyId
 * @returns {Promise<void>}
 */
export async function getStrategyToTimeQuantumList(strategyId) {
  return request(config.accessStrategyApi.getStrategyToTimeQuantumList, {
    method: 'GET',
    params: {
      strategyId
    }
  });
}

/**
 *  删除
 * @param strategyIds
 * @returns {Promise<void>}
 */
export async function deleteAccessStrategyByIds(strategyIds) {
  return request(config.accessStrategyApi.deleteAccessStrategyByIds, {
    method: 'GET',
    params: {
      strategyIds: (strategyIds || []).join(",")
    }
  });
}


/**
 *  保存
 * @param values
 * @returns {Promise<void>}
 */
export async function saveAccessStrategy(values) {
  return request(config.accessStrategyApi.saveAccessStrategy, {
    method: 'POST',
    body: {
      ...values
    }
  });
}

/**
 *  更新状态
 * @returns {Promise<void>}
 */
export async function updateAccessStrategyStatus(strategyId, status) {
  return request(config.accessStrategyApi.updateAccessStrategyStatus, {
    method: 'POST',
    params: {
      strategyId,
      status
    }
  });
}


