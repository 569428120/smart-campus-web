import request from "@/utils/request";
import config from "@/pages/HumanManage/config/config";


/**
 *  查询
 * @returns {Promise<*>}
 */
export async function getStudentList(searchValue, current, pageSize) {
  return request(config.studentApi.getStudentList, {
    method: 'GET',
    params: {
      ...searchValue,
      current,
      pageSize
    }
  });
}

/**
 *  保存教育局的数据
 * @param values
 * @returns {Promise<void>}
 */
export async function saveRegionData(values) {
  return request(config.regionApi.saveRegionData, {
    method: 'POST',
    body: {
      ...values
    },
    params: {}
  });
}

