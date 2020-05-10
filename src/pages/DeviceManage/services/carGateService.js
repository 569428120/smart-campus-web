import request from "@/utils/request";
import config from "../config/config";

/**
 *  保存
 * @param values
 * @returns {Promise<void>}
 */
export async function saveCarGateData(values) {
  return request(config.carGateApi.saveCarGateData, {
    method: 'POST',
    body: {
      ...values
    },
  });
}


/**
 *  删除
 * @param carGateIds
 * @returns {Promise<void>}
 */
export async function deleteCarGateByIds(carGateIds) {
  return request(config.carGateApi.deleteCarGateByIds, {
    method: 'GET',
    params: {
      regionIds: (carGateIds || []).join(",")
    }
  });
}


/**
 *  分页查询
 * @param searchValue
 * @param current
 * @param pageSize
 * @returns {Promise<void>}
 */
export async function getCarGateList(searchValue, current, pageSize) {
  return request(config.carGateApi.getCarGateList, {
    method: 'GET',
    params: {
      ...searchValue,
      current,
      pageSize
    }
  });
}

/**
 *  校验
 * @param values
 * @returns {Promise<void>}
 */
export function validatorCarGate(values) {
  return request(config.carGateApi.validatorCarGate, {
    method: 'POST',
    body: {
      ...values
    },
  });
}
