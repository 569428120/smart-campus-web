import request from "@/utils/request";
import config from "../config/config";

/**
 *  保存
 * @param values
 * @returns {Promise<void>}
 */
export async function saveFaceData(values) {
  return request(config.faceApi.saveFaceData, {
    method: 'POST',
    body: {
      ...values
    },
  });
}


/**
 *  删除
 * @param faceIds
 * @returns {Promise<void>}
 */
export async function deleteFaceByIds(faceIds) {
  return request(config.faceApi.deleteFaceByIds, {
    method: 'GET',
    params: {
      faceIds: (faceIds || []).join(",")
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
export async function getFaceList(searchValue, current, pageSize) {
  return request(config.faceApi.getFaceList, {
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
 * @param rule
 * @param values
 * @param callback
 * @returns {Promise<void>}
 */
export async function validatorFaceModel(rule, values, callback) {
  return request(config.faceApi.validatorFaceModel, {
    method: 'POST',
    body: {
      ...values
    }
  }, true).then((msg) => callback(msg || undefined));
}
