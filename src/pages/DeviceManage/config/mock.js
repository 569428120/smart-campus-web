import appConfig from "@/config/appConfig";
import moment from "moment";

let carGateList = [];
let current = 1;
let pageSize = appConfig.PAGE_SIZE;
let total = 0;
let manufacturerList = [];
let testLog = {};

let count = 0;


const startTest = (deviceId) => {
  testLog = {
    id: '11',
    deviceId,
    status: 'normal',
    logDesc: '等待刷新数据',
    percent: 1,
    logList: [
      {
        id: moment().format('YYYY-MM-DD HH:mm:ss'),
        createTime: moment().format('YYYY-MM-DD HH:mm:ss'),
        logText: "log数据...."
      }
    ]
  };
  count = 0;
  return testLog;
};

const getTestLogByDeviceId = (deviceId) => {
  const logList = (testLog.logList || []);
  if (count < 10) {
    logList.push({
      id: moment().format('YYYY-MM-DD HH:mm:ss'),
      createTime: moment().format('YYYY-MM-DD HH:mm:ss'),
      logText: "log数据...." + moment().format('YYYY-MM-DD HH:mm:ss'),
    });
    testLog.logList = logList;
    testLog.percent = (count * 10)+1;
    count++;
  } else {
    testLog.percent = 100;
    testLog.status = '';
  }
  return testLog
};

const getGateList = (searchValue, current1, pageSize1) => {
  current = current1;
  pageSize = pageSize1;
  if (carGateList.length <= 0) {
    carGateList.push(...[
      {
        id: '1',
        deviceId: 'd-1',
        manufacturerName: '海普天',
        manufacturerType: '人脸一体机',
        netAddress: '10.0.0.1:8000',
        status: 'processing',
        description: '测试数据'
      },
      {
        id: '2',
        deviceId: 'd-2',
        manufacturerName: '海普天1',
        manufacturerType: '人脸一体机1',
        netAddress: '10.0.0.1:8001',
        status: 'warning',
        description: '测试数据'
      }
    ]);
  }
  return {
    data: carGateList,
    current,
    pageSize,
    total
  }
};

const getManufacturerList = () => {
  if (manufacturerList.length <= 0) {
    manufacturerList.push(...[
      {
        id: 'm1',
        name: "海普天",
        deviceTypeList: [
          {
            id: "d0",
            name: "人脸一体机",
            version: "(体温版本)"
          }
        ]
      },
      {
        id: 'm2',
        name: "海普天1",
        deviceTypeList: [
          {
            id: "d3",
            name: "人脸一体机1",
            version: "(体温版本)1"
          }
        ]
      }
    ]);
  }
  return manufacturerList;
};

//测试数据
export default {
  startTest,
  getTestLogByDeviceId,
  getGateList,
  getManufacturerList,
}
