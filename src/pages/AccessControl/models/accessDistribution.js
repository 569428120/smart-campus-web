import appConfig from "@/config/appConfig";
import * as accessDistributionService from '../services/accessDistributionService'

export default {
  namespace: 'accessDistribution',
  state: {
    text: 'accessDistribution',
    accessDistributionList: [],
    accessStrategyList: [],
  },
  effects: {

    /**
     *   查询
     * @param searchValue
     * @param call
     * @param put
     */* getAccessDistributionList({payload: {searchValue}}, {call, put}) {
      const accessDistributionList = yield call(accessDistributionService.getAccessDistributionList, searchValue);
      yield put({
        type: "setState",
        payload: {
          accessDistributionList,
        }
      })
    },

    /**
     *  保存
     * @param groupIds
     * @param strategyId
     * @param call
     * @param put
     */* saveGroupToStrategyId({payload: {groupIds, strategyId}}, {call, put}) {
      yield call(accessDistributionService.saveGroupToStrategyId, groupIds, strategyId);

    },

    /**
     *  获得策略列表
     * @param call
     * @param put
     */* getAccessStrategyList({payload: {}}, {call, put}) {
      const accessStrategyList = yield call(accessDistributionService.getAccessStrategyList);
      yield put({
        type: "setState",
        payload: {
          accessStrategyList,
        }
      })
    },

    /**
     * 查询
     * @param strategyId
     * @param call
     * @param put
     */* getTimeQuantumListByStrategyId({payload: {strategyId}}, {call, put}) {
      if (strategyId) {
        const timeQuantumList = yield call(accessDistributionService.getTimeQuantumListByStrategyId, strategyId);
        yield put({
          type: "setState",
          payload: {
            timeQuantumList,
          }
        })
      }
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
