import appConfig from "@/config/appConfig";
import * as carGateService from '../services/carGateService'
import mock from "../config/mock"

export default {
  namespace: 'carGate',
  state: {
    carGateList: [],// 学校列表
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
      // const testLog = yield call(carGateService.startTest, deviceId);
      const testLog = mock.startTest(deviceId);
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
      //const testLog = yield call(carGateService.getTestLogByDeviceId, deviceId);
      const testLog = mock.getTestLogByDeviceId(deviceId);
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
      //const manufacturerList = yield call(carGateService.getManufacturerList);
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
     */* getCarGateList({payload: {searchValue, current, pageSize}}, {call, put}) {
      //const {data: carGateList, total, totalPage} = yield call(carGateService.getCarGateList, searchValue, current, pageSize);
      const {data: carGateList, total, totalPage} = mock.getCarGateList(searchValue, current, pageSize);
      yield put({
        type: "setState",
        payload: {
          total,
          current,
          pageSize,
          carGateList
        }
      })
    },

    /**
     *  删除
     * @param carGateIds
     * @param call
     * @param put
     */* deleteCarGateByIds({payload: {carGateIds}}, {call, put}) {
      yield call(carGateService.deleteCarGateByIds, carGateIds);
    },

    /**
     *  保存
     * @param carGateIds
     * @param call
     * @param put
     */* saveCarGateData({payload: {values}}, {call, put}) {
      yield call(carGateService.saveCarGateData, values);
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
