import appConfig from "@/config/appConfig";
import * as flowRecordService from "../services/flowRecordService";

export default {
  namespace: 'myCreateFlowRecord',
  state: {
    flowRecordList: [],
    total: 0,
    current: 1,
    pageSize: 15,
  },
  effects: {

    /**
     *  搜索查询
     * @param searchValue
     * @param current
     * @param pageSize
     * @param call
     * @param put
     */* getFlowRecordList({payload: {searchValue, current, pageSize}}, {call, put}) {
      const {data: flowRecordList, total, totalPage} = yield call(flowRecordService.getMyCreateFlowRecordList, searchValue, current, pageSize);
      yield put({
        type: "setState",
        payload: {
          total,
          current,
          pageSize,
          flowRecordList
        }
      })
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
