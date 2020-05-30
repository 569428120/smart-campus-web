import appConfig from "@/config/appConfig";
import * as gateService from '../services/gateService';
import * as  testService from '../services/gateTestService';
import mock from "../config/mock"

export default {
  namespace: 'gate',
  state: {
    gateList: [],// 学校列表
    current: 1,// 当前页
    pageSize: appConfig.PAGE_SIZE, //每页显示的大小
    total: 0,// 总数
    manufacturerList: [],
    testLog: {},
  },
  effects: {

    /**
     *  设备测试
     * @param deviceId
     * @param call
     * @param put
     */* startTest({payload: {deviceId}}, {call, put}) {
      const testLog = yield call(testService.startTest, deviceId);
      //const testLog = mock.startTest(deviceId);
      yield put({
        type: "setState",
        payload: {
          testLog
        }
      })
    },

    /**
     *  刷新测试log数据
     * @param deviceId
     * @param call
     * @param put
     */* getTestLogByDeviceId({payload: {deviceId}}, {call, put}) {
      const testLog = yield call(testService.getTestLogByDeviceId, deviceId);
      //const testLog = mock.getTestLogByDeviceId(deviceId);
      yield put({
        type: "setState",
        payload: {
          testLog
        }
      })
    },

    /**
     *  获取厂商数据
     * @param call
     * @param put
     */* getManufacturerList({payload: {}}, {call, put}) {
      //const manufacturerList = yield call(gateService.getManufacturerList);
      const manufacturerList = mock.getManufacturerList();
      yield put({
        type: "setState",
        payload: {
          manufacturerList
        }
      })
    },

    /**
     * 查询
     * @param searchValue
     * @param current
     * @param pageSize
     * @param call
     * @param put
     */* getGateList({payload: {searchValue, current, pageSize}}, {call, put}) {
      const {data: gateList, total, totalPage} = yield call(gateService.getGateList, searchValue, current, pageSize);
      //const {data: gateList, total, totalPage} = mock.getGateList(searchValue, current, pageSize);
      yield put({
        type: "setState",
        payload: {
          total,
          current,
          pageSize,
          gateList
        }
      })
    },

    /**
     *  删除
     * @param gateIds
     * @param call
     * @param put
     */* deleteGateByIds({payload: {gateIds}}, {call, put}) {
      yield call(gateService.deleteGateByIds, gateIds);
    },

    /**
     *  保存
     * @param values
     * @param call
     * @param put
     */* saveGateData({payload: {values}}, {call, put}) {
      yield call(gateService.saveGateData, values);
    },
  },

  reducers: {
    setState(state, {payload}) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
