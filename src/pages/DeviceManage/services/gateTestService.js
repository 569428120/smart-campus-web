import request from "@/utils/request";
import config from "../config/config";

/**
 *  启动测试
 * @param deviceId
 * @returns {Promise<void>}
 */
export async function startTest(deviceId) {
  return request(config.gateTestApi.startTest, {
    method: 'POST',
    params: {
      deviceId
    }
  });
}

/**
 *  查询测试日志
 * @param deviceId
 * @returns {Promise<void>}
 */
export async function getTestLogByDeviceId(deviceId) {
  return request(config.gateTestApi.getTestLogByDeviceId, {
    method: 'GET',
    params: {
      deviceId
    }
  });
}
