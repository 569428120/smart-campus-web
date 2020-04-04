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
    strategyToTimeQuantumList: [],
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

    /**
     *   查询策略的时间段
     * @param strategyId
     * @param call
     * @param put
     */* getStrategyToTimeQuantumList({payload: {strategyId}}, {call, put}) {
      if (strategyId) {
        const strategyToTimeQuantumList = yield call(accessStrategyService.getStrategyToTimeQuantumList, strategyId);
        yield put({
          type: "setState",
          payload: {
            strategyToTimeQuantumList
          }
        })
      }
    },

    /**
     *  删除
     * @param strategyIds
     * @param call
     * @param put
     */* deleteAccessStrategyByIds({payload: {strategyIds}}, {call, put}) {
      yield call(accessStrategyService.deleteAccessStrategyByIds, strategyIds);
    },

    /**
     *  保存数据
     * @param values
     * @param call
     * @param put
     */* saveAccessStrategy({payload: {values}}, {call, put}) {
      yield call(accessStrategyService.saveAccessStrategy, values);
    },

    /**
     *  更新策略的启用状态
     * @param strategyId
     * @param status
     * @param call
     * @param put
     */* updateAccessStrategyStatus({payload: {strategyId, status}}, {call, put}) {
      yield call(accessStrategyService.updateAccessStrategyStatus, strategyId, status);
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
