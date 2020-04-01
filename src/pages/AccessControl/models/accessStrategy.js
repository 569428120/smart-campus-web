import appConfig from "@/config/appConfig";
import * as accessStrategyService from '../services/accessStrategyService'

export default {
  namespace: 'accessStrategy',
  state: {
    text: 'accessStrategy',
    accessStrategyList: [],
    total: 0,
    current: 1,
    pageSize: 15,
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
     */* getAccessStrategyList({payload: {searchValue, current, pageSize}}, {call, put}) {
      const {data: accessStrategyList, total} = yield call(accessStrategyService.getAccessStrategyList, searchValue, current, pageSize);
      yield put({
        type: "setState",
        payload: {
          accessStrategyList,
          current,
          pageSize,
          total
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
