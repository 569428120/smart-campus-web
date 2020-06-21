import request from "@/utils/request";
import config from "../config/config";


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
 *  保存数据
 * @param values
 * @returns {Promise<void>}
 */
export async function saveStudentData(values) {
  return request(config.studentApi.saveStudentData, {
    method: 'POST',
    body: {
      ...values
    }
  });
}

export async function saveStudentContact(contactList, studentId) {
  return request(config.studentApi.saveStudentContact, {
    method: 'POST',
    body: {
      contactList,
      studentId
    }
  });
}

/**
 *  删除学生
 * @param studentIds
 * @returns {Promise<void>}
 */
export async function deleteStudentByIds(studentIds) {
  return request(config.studentApi.deleteStudentByIds, {
    method: 'GET',
    params: {
      studentIds: (studentIds || []).join(",")
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
export async function validatorStudentModel(rule, values, callback) {
  return request(config.studentApi.validatorStudentModel, {
    method: 'POST',
    body: {
      ...values
    }
  }, true).then((msg) => callback(msg || undefined));
}
