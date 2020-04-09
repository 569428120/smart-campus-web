import appConfig from "@/config/appConfig";
import * as personnelRecordService from '../services/personnelRecordService'

export default {
  namespace: 'personnelRecord',
  state: {
    text: 'personnelRecord',
    personnelRecordList: [],
    total: 0,
    current: 1,
    pageSize: appConfig.PAGE_SIZE,
    userTypeList: [],
    strategyTypeList: [],
    modeList: [],
    personnelRecordDetail: {},
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
     */* getPersonnelRecordList({payload: {searchValue, current, pageSize}}, {call, put}) {
      const {data: personnelRecordList, total} = yield call(personnelRecordService.getPersonnelRecordList, searchValue, current, pageSize);
      yield put({
        type: "setState",
        payload: {
          personnelRecordList,
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
      const userTypeList = yield call(personnelRecordService.getUserTypeList);
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
      const strategyTypeList = yield call(personnelRecordService.getStrategyTypeList);
      yield put({
        type: "setState",
        payload: {
          strategyTypeList
        }
      })
    },

    /**
     *  验证方式
     * @param call
     * @param put
     */* getModeList({payload: {}}, {call, put}) {
      const modeList = yield call(personnelRecordService.getModeList);
      yield put({
        type: "setState",
        payload: {
          modeList
        }
      })
    },

    /**
     *  记录详情
     * @param recordId
     * @param call
     * @param put
     */* getPersonnelRecordDetail({payload: {recordId}}, {call, put}) {
      const personnelRecordDetail = yield call(personnelRecordService.getPersonnelRecordDetail, recordId);
      yield put({
        type: "setState",
        payload: {
          personnelRecordDetail
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
