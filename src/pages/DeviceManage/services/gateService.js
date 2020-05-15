import request from "@/utils/request";
import config from "../config/config";


/**
 *  查询厂商
 * @returns {Promise<void>}
 */
export async function getManufacturerList() {
  return request(config.manufacturerApi.getGateManufacturerList, {
    method: 'GET',
    params: {},
  });
}

/**
 *  保存
 * @param values
 * @returns {Promise<void>}
 */
export async function saveGateData(values) {
  return request(config.gateApi.saveGateData, {
    method: 'POST',
    body: {
      ...values
    },
  });
}


/**
 *  删除
 * @param gateIds
 * @returns {Promise<void>}
 */
export async function deleteGateByIds(gateIds) {
  return request(config.gateApi.deleteGateByIds, {
    method: 'GET',
    params: {
      regionIds: (gateIds || []).join(",")
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
export async function getGateList(searchValue, current, pageSize) {
  return request(config.gateApi.getGateList, {
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
export function validatorGate(values) {
  return request(config.gateApi.validatorGate, {
    method: 'POST',
    body: {
      ...values
    },
  });
}
