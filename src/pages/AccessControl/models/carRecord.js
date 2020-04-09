import appConfig from "@/config/appConfig";
import * as carRecordService from '../services/carRecordService'

export default {
  namespace: 'carRecord',
  state: {
    carRecordList: [],
    total: 0,
    current: 1,
    pageSize: appConfig.PAGE_SIZE,
    userTypeList: [],
    strategyTypeList: [],
    modeList: [],
    carRecordDetail: {},
  },
  effects: {

    /**
     *  搜索
     * @param searchValue
     * @param current
     * @param pageSize
     * @param call
     * @param put
     * @returns {Generator<*, void, ?>}
     */* getCarRecordList({payload: {searchValue, current, pageSize}}, {call, put}) {
      const {data: carRecordList, total} = yield call(carRecordService.getCarRecordList, searchValue, current, pageSize);
      yield put({
        type: "setState",
        payload: {
          carRecordList,
          current,
          pageSize,
          total
        }
      })
    },

    /**
     *  用户类型
     * @param call
     * @param put
     */* getUserTypeList({payload: {}}, {call, put}) {
      const userTypeList = yield call(carRecordService.getUserTypeList);
      yield put({
        type: "setState",
        payload: {
          userTypeList
        }
      })
    },

    /**
     *  策略类型
     * @param call
     * @param put
     */* getStrategyTypeList({payload: {}}, {call, put}) {
      const strategyTypeList = yield call(carRecordService.getStrategyTypeList);
      yield put({
        type: "setState",
        payload: {
          strategyTypeList
        }
      })
    },

    /**
     *  记录详情
     * @param recordId
     * @param call
     * @param put
     */* getCarRecordDetail({payload: {recordId}}, {call, put}) {
      const carRecordDetail = yield call(carRecordService.getCarRecordDetail, recordId);
      yield put({
        type: "setState",
        payload: {
          carRecordDetail
        }
      })
    }

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
