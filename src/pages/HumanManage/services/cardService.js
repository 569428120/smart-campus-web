import request from "@/utils/request";
import config from "../config/config";

/**
 *  保存
 * @param values
 * @returns {Promise<void>}
 */
export async function saveCardData(values) {
  return request(config.cardApi.saveCardData, {
    method: 'POST',
    body: {
      ...values
    },
  });
}


/**
 *  删除
 * @param cardIds
 * @returns {Promise<void>}
 */
export async function deleteCardByIds(cardIds) {
  return request(config.cardApi.deleteCardByIds, {
    method: 'GET',
    params: {
      cardIds: (cardIds || []).join(",")
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
export async function getCardList(searchValue, current, pageSize) {
  return request(config.cardApi.getCardList, {
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
export async function validatorCardModel(rule, values, callback) {
  return request(config.cardApi.validatorCardModel, {
    method: 'POST',
    body: {
      ...values
    }
  }, true).then((msg) => callback(msg || undefined));
}
