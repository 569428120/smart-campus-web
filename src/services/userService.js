import request from "@/utils/request";
import config from "../config/appConfig";

/**
 *  学生分组
 * @returns {Promise<void>}
 */
export async function getStudentGroupList() {
  return request(config.userApi.getStudentGroupList, {
    method: 'GET',
    params: {}
  });
}

/**
 *  职员分组
 * @returns {Promise<void>}
 */
export async function getStaffGroupList() {
  return request(config.userApi.getStaffGroupList, {
    method: 'GET',
    params: {}
  });
}

/**
 *  学生
 * @returns {Promise<void>}
 */
export async function getStudentList(groupId) {
  return request(config.userApi.getStudentList, {
    method: 'GET',
    params: {groupId}
  });
}

/**
 *  职员
 * @returns {Promise<void>}
 */
export async function getStaffList(groupId) {
  return request(config.userApi.getStaffList, {
    method: 'GET',
    params: {groupId}
  });
}
