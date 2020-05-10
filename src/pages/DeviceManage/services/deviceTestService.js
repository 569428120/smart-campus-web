import config from "../config/config";

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
